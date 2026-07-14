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
    await expect(page.locator("h1")).toContainText("Data systems");
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator('a[href="./resume/saurabh-shubham-data-engineer.pdf"]')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBeTruthy();
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
});

test("reduced motion is honoured", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(await page.locator("html").evaluate(element => getComputedStyle(element).scrollBehavior)).toBe("auto");
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
