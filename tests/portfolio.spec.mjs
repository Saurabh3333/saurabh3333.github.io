import { expect, test } from "@playwright/test";

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

for (const viewport of viewports) {
  test(`${viewport.name} portfolio`, async ({ page }) => {
    const errors = [];
    page.on("console", message => message.type() === "error" && errors.push(message.text()));
    page.on("pageerror", error => errors.push(error.message));
    page.on("requestfailed", request => errors.push(`${request.method()} ${request.url()}`));
    await page.setViewportSize(viewport);
    const response = await page.goto("/", { waitUntil: "networkidle" });
    expect(response.ok()).toBeTruthy();
    await expect(page.locator("h1")).toContainText("AI agents");
    await expect(page.locator(".saurabh-mark")).toContainText("Saurabh");
    await expect(page.locator(".home-hero .saurabh-signals")).toBeVisible();
    await expect(page.locator("#ai")).toContainText("Pasin");
    await expect(page.locator("main")).toBeVisible();
    await expect(page.getByRole("link", { name: "View resume" })).toHaveAttribute("href", "./resume/");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBeTruthy();
    if (viewport.name === "desktop") {
      const [status, signal] = await Promise.all([
        page.locator(".status").boundingBox(),
        page.locator(".signal-flow").boundingBox(),
      ]);
      expect(status.y).toBeGreaterThan(viewport.height * 0.55);
      expect(status.y + status.height).toBeLessThan(viewport.height);
      expect(signal.y + signal.height).toBeLessThan(status.y);
    }
    expect(errors).toEqual([]);
  });
}

test("keyboard navigation and resume route", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.locator(".skip-link")).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  const resume = await page.request.get("/resume/saurabh-shubham-data-engineer.pdf");
  expect(resume.ok()).toBeTruthy();
  expect(resume.headers()["content-type"]).toContain("application/pdf");
  await page.goto("/resume/");
  await expect(page.locator("h1")).toHaveText("Saurabh Shubham");
  await expect(page.locator(".saurabh-mark")).toContainText("Saurabh");
  await expect(page.locator(".resume-signal")).toBeVisible();
  expect(await page.locator(".resume-sheet").evaluate(element => getComputedStyle(element).animationName)).toBe("document-float");
});

test("reduced motion is honoured", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(await page.locator("html").evaluate(element => getComputedStyle(element).scrollBehavior)).toBe("auto");
  expect(await page.locator(".hero-content > *").first().evaluate(element => getComputedStyle(element).opacity)).toBe("1");
});

test("cards reveal and respond to hover", async ({ page }) => {
  await page.goto("/");
  const card = page.locator(".case").first();
  await card.scrollIntoViewIfNeeded();
  await expect(card).toHaveClass(/is-visible/);
  await card.hover();
  await expect.poll(() => card.evaluate(element => getComputedStyle(element).transform)).not.toBe("none");
});

test("hero assembles and scroll motion tracks progress", async ({ page }) => {
  await page.goto("/");
  const words = page.locator(".intro-piece");
  const resumeMotion = page.locator(".resume-button-motion i");
  expect(await words.count()).toBeGreaterThan(5);
  expect(await words.first().evaluate(element => getComputedStyle(element).animationName)).toContain("intro-assemble");
  await expect(resumeMotion).toBeVisible();
  expect(await resumeMotion.evaluate(element => getComputedStyle(element).animationName)).toBe("resume-orbit");
  await page.locator(".timeline").scrollIntoViewIfNeeded();
  await expect.poll(() => page.locator("html").evaluate(element =>
    Number.parseFloat(element.style.getPropertyValue("--scroll-progress"))
  )).toBeGreaterThan(.2);
  await expect.poll(() => page.locator(".timeline").evaluate(element =>
    Number.parseFloat(element.style.getPropertyValue("--timeline-progress"))
  )).toBeGreaterThan(0);
});

test("final signature reveal stays crisp", async ({ page }) => {
  await page.goto("/");
  const signature = page.locator(".signature-cta");
  await signature.scrollIntoViewIfNeeded();
  await expect(signature).toHaveClass(/is-visible/);
  expect(await signature.evaluate(element => getComputedStyle(element).animationName)).toBe("none");
  await expect.poll(() => signature.evaluate(element => getComputedStyle(element).transform)).toBe("none");
});

test("@performance static page budget", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });
  const metrics = await page.evaluate(() => {
    const navigation = performance.getEntriesByType("navigation")[0];
    return {
      transfer: navigation.transferSize,
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.startTime,
      resources: performance.getEntriesByType("resource").length,
    };
  });
  expect(metrics.resources).toBeLessThanOrEqual(2);
  expect(metrics.transfer).toBeLessThan(100_000);
  expect(metrics.domContentLoaded).toBeLessThan(1_500);
});
