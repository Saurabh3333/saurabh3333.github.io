import { expect, test } from "@playwright/test";

const viewports = [
  { name: "wide desktop", width: 1440, height: 900 },
  { name: "laptop", width: 1024, height: 768 },
  { name: "large mobile", width: 430, height: 932 },
  { name: "mobile", width: 390, height: 844 },
  { name: "medium mobile", width: 375, height: 667 },
  { name: "compact mobile", width: 360, height: 640 },
  { name: "small mobile", width: 320, height: 568 },
];

function collectRuntimeErrors(page) {
  const errors = [];
  page.on("console", message => message.type() === "error" && errors.push(message.text()));
  page.on("pageerror", error => errors.push(error.message));
  page.on("requestfailed", request => errors.push(`${request.method()} ${request.url()}`));
  return errors;
}

for (const viewport of viewports) {
  test(`${viewport.name}: responsive timeline and resume`, async ({ page }) => {
    const errors = collectRuntimeErrors(page);
    await page.setViewportSize(viewport);
    const response = await page.goto("/", { waitUntil: "networkidle" });
    expect(response.ok()).toBeTruthy();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Saurabh Shubham");
    await expect(page.locator(".timeline > li")).toHaveCount(15);
    await expect(page.getByRole("link", { name: "regulation check", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "resume", exact: true })).toBeVisible();
    const layout = await page.evaluate(() => {
      const main = document.querySelector("main").getBoundingClientRect();
      const rows = [...document.querySelectorAll(".timeline li")].map(el => el.getBoundingClientRect());
      return {
        width: document.documentElement.scrollWidth,
        viewport: document.documentElement.clientWidth,
        mainLeft: main.left,
        mainWidth: main.width,
        clipped: [...document.querySelectorAll("main a, main p, .year")].filter(el => {
          const rect = el.getBoundingClientRect();
          return rect.left < 0 || rect.right > innerWidth + .5;
        }).length,
        overlaps: rows.slice(1).some((row, i) => row.top < rows[i].bottom),
      };
    });
    expect(layout.width).toBeLessThanOrEqual(layout.viewport);
    expect(layout.mainWidth).toBeLessThanOrEqual(580);
    expect(layout.mainLeft).toBeCloseTo((viewport.width - layout.mainWidth) / 2, 1);
    expect(layout.clipped).toBe(0);
    expect(layout.overlaps).toBe(false);
    await page.goto("/resume/", { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Saurabh Shubham");
    await expect(page.locator("body")).toHaveCSS("background-color", "rgb(255, 255, 255)");
    await expect(page.locator("body")).toHaveCSS("font-family", "Inter, Arial, sans-serif");
    await expect(page.locator("object, iframe")).toHaveCount(0);
    await expect(page.getByRole("link", { name: "open full PDF", exact: true })).toHaveAttribute("target", "_blank");
    const resumeLayout = await page.evaluate(() => {
      const groups = [".resume-formats > *", ".resume-section", ".resume-entry", ".resume-entry > *", ".resume-skills > *"];
      const overlaps = groups.flatMap(selector => {
        const elements = [...document.querySelectorAll(selector)];
        return elements.flatMap((element, index) => elements.slice(index + 1).filter(other => {
          const a = element.getBoundingClientRect(), b = other.getBoundingClientRect();
          return Math.min(a.right, b.right) - Math.max(a.left, b.left) > 1 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 1;
        }).map(() => selector));
      });
      const main = document.querySelector("main").getBoundingClientRect();
      const clipped = [...document.querySelectorAll("main *")].filter(element => {
        const rect = element.getBoundingClientRect();
        return rect.width > 0 && (rect.left < -0.5 || rect.right > innerWidth + 0.5);
      }).map(element => `${element.tagName}.${element.className}`);
      return { documentWidth: document.documentElement.scrollWidth, viewportWidth: innerWidth, overlaps, clipped, mainWidth: main.width, mainLeft: main.left };
    });
    expect(resumeLayout.documentWidth).toBeLessThanOrEqual(resumeLayout.viewportWidth);
    expect(resumeLayout.overlaps).toEqual([]);
    expect(resumeLayout.clipped).toEqual([]);
    expect(resumeLayout.mainWidth).toBeLessThanOrEqual(580);
    expect(resumeLayout.mainLeft).toBeCloseTo((viewport.width - resumeLayout.mainWidth) / 2, 1);
    await page.getByRole("heading", { name: "recognition", exact: true }).scrollIntoViewIfNeeded();
    await expect(page.getByRole("heading", { name: "recognition", exact: true })).toBeInViewport();
    await expect(page.locator("#recognition + ul")).toContainText("Facebook PyTorch Scholar (2018)");
    expect(errors).toEqual([]);
  });
}

test("search and social metadata are complete and canonical", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Saurabh Shubham | Senior Data Engineer in Berlin");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /Senior Data Engineer.*7\+ years.*manufacturing data platforms.*backend services.*production observability/i);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /max-image-preview:large/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://saurabh3333.github.io/");
  await expect(page.locator('link[rel="alternate"][type="text/markdown"]')).toHaveAttribute("href", "https://saurabh3333.github.io/index.md");
  await expect(page.locator('link[rel="describedby"]')).toHaveAttribute("href", "https://saurabh3333.github.io/llms.txt");
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", "https://saurabh3333.github.io/public/images/saurabh-shubham-og.png");
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");

  const schema = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
  expect(schema["@graph"].map(node => node["@type"])).toEqual(["Person", "ProfilePage", "WebSite"]);

  for (const path of ["/robots.txt", "/sitemap.xml", "/llms.txt", "/index.md", "/resume/index.md", "/public/images/saurabh-shubham-og.png"]) {
    expect((await page.request.get(path)).ok()).toBeTruthy();
  }

  const robots = await (await page.request.get("/robots.txt")).text();
  expect(robots).toContain("User-agent: *");
  expect(robots).toContain("Allow: /");
  const llms = await (await page.request.get("/llms.txt")).text();
  expect(llms).toContain("# Saurabh Shubham");
  expect(llms).toContain("https://saurabh3333.github.io/index.md");
});

test("desktop layout matches reference measurements", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const main = await page.locator("main").boundingBox();
  const name = await page.locator("h1").boundingBox();
  const timeline = await page.locator(".timeline").boundingBox();
  expect(main.x).toBe(430);
  expect(main.width).toBe(580);
  expect(name.y).toBe(162);
  expect(timeline.y).toBe(250);
  await expect(page.locator("body")).toHaveCSS("font-family", 'Inter, Arial, sans-serif');
  await expect(page.locator("body")).toHaveCSS("font-size", "14px");
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(255, 255, 255)");
  await expect(page.locator(".timeline a").first()).toHaveCSS("color", "rgb(0, 0, 255)");
});

test("timeline uses verified personal history and working contact links", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".occupation")).toHaveText("senior data engineer");
  await expect(page.locator(".timeline")).toContainText(/2022.*data engineering at gropyus.*2021.*software development at sigmoid.*2019.*software engineering at amdocs.*2019.*graduated from bit mesra.*2019.*software development internship at finnov.*2018.*facebook pytorch challenge scholarship.*2017.*product development internship at hasura.*2017.*kharagpur winter of code.*2016.*web development internship at schooglink.*2015.*started computer science/is);
  await expect(page.locator("[data-preview=acm]").locator("..")).toHaveText("vice president at acm");
  await expect(page.locator("[data-preview=ieee]").locator("..")).toHaveText("tech head at ieee");
  await expect(page.locator("[data-preview=schooglink]").locator("..")).toHaveText("web development internship at schooglink");
  await expect(page.getByRole("link", { name: "saurabh.friday@gmail.com" })).toHaveAttribute("href", "mailto:saurabh.friday@gmail.com");
  await expect(page.getByRole("link", { name: "on linkedin" })).toHaveAttribute("href", "https://www.linkedin.com/in/saurabh-shubham/");
  await expect(page.getByRole("link", { name: "resume", exact: true })).toHaveAttribute("href", "./resume/");
});

test("keyboard navigation and accessible structure", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.locator(".skip-link")).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.locator(".avatar")).toBeFocused();
  expect(await page.locator(":focus").evaluate(el => getComputedStyle(el).outlineStyle)).toBe("solid");
  const audit = await page.evaluate(() => ({
    duplicateIds: [...document.querySelectorAll("[id]")].map(el => el.id).filter((id, i, ids) => ids.indexOf(id) !== i),
    unnamedButtons: [...document.querySelectorAll("button")].filter(el => !el.textContent.trim() && !el.getAttribute("aria-label")).length,
    emptyLinks: [...document.querySelectorAll("a")].filter(el => !el.textContent.trim() || !el.getAttribute("href")).length,
    unsafeExternal: [...document.querySelectorAll('a[target="_blank"]')].filter(el => !el.rel.includes("noopener") || !el.rel.includes("noreferrer")).length,
  }));
  expect(audit).toEqual({ duplicateIds: [], unnamedButtons: 0, emptyLinks: 0, unsafeExternal: 0 });
});

test("avatar follows pointer and resets after repeated reactions", async ({ page }) => {
  await page.goto("/");
  await page.mouse.move(100, 90);
  await expect(page.locator(".avatar-sprite")).toHaveCSS("background-position", "0px 0px");
  await page.mouse.move(1000, 90);
  await expect(page.locator(".avatar-sprite")).toHaveCSS("background-position", "-144px 0px");
  const avatar = page.getByRole("button", { name: "Make Saurabh look surprised" });
  await avatar.click();
  await avatar.click();
  await expect(page.locator(".avatar-sprite")).toHaveCSS("background-position", "-144px -108px");
  await expect(page.locator(".avatar-sprite")).toHaveCSS("background-position", "-72px 0px", { timeout: 3000 });
});

test("work previews support hover, keyboard, dismissal, and viewport bounds", async ({ page }) => {
  await page.goto("/");
  const link = page.getByRole("link", { name: "regulation check", exact: true });
  const preview = page.locator(".project-preview");
  await link.hover();
  await expect(preview).toHaveClass(/is-visible/);
  await expect(preview).toContainText("EU AI Act readiness");
  await page.keyboard.press("Escape");
  await expect(preview).not.toHaveClass(/is-visible/);
  await page.mouse.move(0, 0);
  await page.keyboard.press("Tab");
  await link.focus();
  await expect(preview).toHaveClass(/is-visible/);
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    await link.focus();
    const bounds = await preview.boundingBox();
    expect(bounds.x).toBeGreaterThanOrEqual(16);
    expect(bounds.x + bounds.width).toBeLessThanOrEqual(width - 16 + .5);
    expect(bounds.y).toBeGreaterThanOrEqual(16);
    expect(bounds.y + bounds.height).toBeLessThanOrEqual(844 - 16 + .5);
  }
  await page.mouse.wheel(0, 100);
  await expect(preview).not.toHaveClass(/is-visible/);
});

test("touch links work without opening hover previews", async ({ browser }) => {
  const context = await browser.newContext({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/");
  const link = page.getByRole("link", { name: "regulation check", exact: true });
  await link.dispatchEvent('pointerenter', { pointerType: 'touch' });
  await expect(page.locator(".project-preview")).not.toHaveClass(/is-visible/);
  await page.getByRole("link", { name: "resume", exact: true }).tap();
  await expect(page).toHaveURL(/\/resume\/$/);
  await context.close();
});

test("every work and place preview loads its local artwork", async ({ page }) => {
  const errors = collectRuntimeErrors(page);
  const missingAssets = [];
  page.on("response", response => {
    if (response.url().includes("/public/images/") && !response.ok()) missingAssets.push(response.url());
  });
  await page.goto("/");
  const triggers = page.locator("[data-preview]");
  for (let i = 0; i < await triggers.count(); i++) {
    const trigger = triggers.nth(i);
    // Scrolling intentionally dismisses previews; hover after the row is in view.
    await trigger.scrollIntoViewIfNeeded();
    await page.mouse.move(0, 0);
    await trigger.hover();
    const preview = page.locator(".project-preview");
    await expect(preview).toHaveClass(/is-visible/);
    const key = await trigger.getAttribute("data-preview");
    await expect(preview.locator(".preview-cover")).toHaveClass(new RegExp(`preview-${key}`));
    const images = preview.locator("img");
    expect(await images.count()).toBeGreaterThan(0);
    await expect.poll(() => images.evaluateAll(elements => elements.every(image => image.complete && image.naturalWidth > 0))).toBe(true);
    for (const image of await images.all()) {
      await expect(image).toHaveAttribute("src", /^\.\/public\/images\//);
    }
    const artwork = await preview.locator(".preview-scene").boundingBox();
    const copy = await preview.locator(".preview-copy").boundingBox();
    expect(artwork.y + artwork.height).toBeLessThanOrEqual(copy.y + .5);
  }
  expect(missingAssets).toEqual([]);
  expect(errors).toEqual([]);
});

test("all details expand on touch, load logos, and keep one card open", async ({ browser }) => {
  const context = await browser.newContext({ hasTouch: true, isMobile: true, viewport: { width: 320, height: 568 } });
  const page = await context.newPage();
  const errors = collectRuntimeErrors(page);
  await page.goto("http://127.0.0.1:4173/");
  await expect(page.locator(".detail-toggle")).toHaveCount(0);
  const buttons = page.locator("[data-preview]");
  await expect(buttons).toHaveCount(17);
  for (let i = 0; i < await buttons.count(); i++) {
    const button = buttons.nth(i);
    await button.tap();
    await expect(button).toHaveAttribute("aria-expanded", "true");
    const panel = page.locator(`#${await button.getAttribute("aria-controls")}`);
    await expect(panel).toBeVisible();
    await expect(page.locator(".expanded-details:visible")).toHaveCount(1);
    await expect(panel.locator(".details-story")).not.toBeEmpty();
    if (await button.evaluate(el => el.tagName === "A")) {
      await expect(panel.getByRole("link", { name: "visit website", exact: true })).toHaveAttribute("href", await button.getAttribute("href"));
      await expect(panel.getByRole("link", { name: "visit website", exact: true })).toHaveAttribute("target", "_blank");
    }
    await expect.poll(() => panel.locator("img").evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0))).toBe(true);
    const geometry = await panel.evaluate(el => {
      const bounds = el.getBoundingClientRect();
      const cover = el.querySelector(".preview-cover").getBoundingClientRect();
      const scene = el.querySelector(".preview-scene").getBoundingClientRect();
      const copy = el.querySelector(".preview-copy").getBoundingClientRect();
      const story = el.querySelector(".details-story").getBoundingClientRect();
      const contents = [...el.querySelectorAll(".preview-caption, .preview-copy, .preview-logo, .details-story, .city-route, .details-website")];
      const clipped = contents.some(content => {
        const box = content.getBoundingClientRect();
        return box.left < bounds.left - .5 || box.right > bounds.right + .5 || box.top < bounds.top - .5 || box.bottom > bounds.bottom + .5;
      });
      return { width: document.documentElement.scrollWidth, viewport: innerWidth, overlaps: scene.bottom > copy.top + .5, clipped, storyBelowCover: story.top >= cover.bottom - .5, sceneHeight: scene.height };
    });
    expect(geometry.width).toBeLessThanOrEqual(geometry.viewport);
    expect(geometry.overlaps).toBe(false);
    expect(geometry.clipped).toBe(false);
    expect(geometry.storyBelowCover).toBe(true);
    expect(geometry.sceneHeight).toBeGreaterThan(30);
    await expect(page.locator(".project-preview")).not.toHaveClass(/is-visible/);
  }
  const last = buttons.last();
  await last.tap();
  await expect(last).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator(".expanded-details:visible")).toHaveCount(0);
  expect(errors).toEqual([]);
  await context.close();
});

test("city journey and internship details support keyboard dismissal", async ({ page }) => {
  await page.goto("/");
  const berlin = page.getByRole("button", { name: "Show berlin details", exact: true });
  await berlin.focus();
  await page.keyboard.press("Enter");
  await expect(berlin).toHaveAttribute("aria-expanded", "true");
  const journey = page.getByRole("list", { name: "Work journey" });
  await expect(journey).toContainText(/2019.*Pune.*2021.*Bengaluru.*2022.*Berlin/s);
  await page.keyboard.press("Escape");
  await expect(berlin).toBeFocused();
  await expect(berlin).toHaveAttribute("aria-expanded", "false");
  await expect(journey).toBeHidden();
  const hasura = page.getByRole("link", { name: "hasura", exact: true });
  await hasura.focus();
  await page.keyboard.press("Enter");
  const panel = page.locator(`#${await hasura.getAttribute("aria-controls")}`);
  await expect(panel).toContainText("dec 2017 — feb 2018");
  await expect(panel).toContainText("Alexa skill");
  await expect(page.locator(".timeline")).not.toContainText("google tech intern connect");
});

test("local routes, resume assets, and external project link", async ({ page }) => {
  const localFailures = [];
  page.on("response", response => {
    if (new URL(response.url()).origin === "http://127.0.0.1:4173" && response.status() >= 400) {
      localFailures.push(`${response.status()} ${response.url()}`);
    }
  });
  await page.goto("/");
  await expect(page.getByRole("link", { name: /regulation check/i })).toHaveAttribute("href", "https://regulationcheck.com/");
  await page.goto("/resume/");
  await expect(page.locator("h1")).toHaveText("Saurabh Shubham");
  await expect(page).toHaveTitle("Senior Data Engineer Resume — Saurabh Shubham");
  await expect(page.locator(".occupation")).toHaveText("senior data engineer · berlin, germany");
  await expect(page.locator("body")).toHaveClass("resume-page");
  await expect(page.locator(".resume-section")).toHaveCount(6);
  await expect(page.locator(".resume-entry")).toHaveCount(5);
  await expect(page.getByRole("heading", { name: "experience", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "download PDF", exact: true })).toHaveAttribute("download", "");

  const [pdf, text] = await Promise.all([
    page.request.get("/resume/saurabh-shubham-data-engineer.pdf"),
    page.request.get("/resume/saurabh-shubham-data-engineer.txt"),
  ]);
  expect(pdf.ok()).toBeTruthy();
  expect(pdf.headers()["content-type"]).toContain("application/pdf");
  expect(text.ok()).toBeTruthy();
  const ats = (await text.text()).replace(/\s+/g, " ");
  expect(ats.indexOf("Experience")).toBeLessThan(ats.indexOf("Selected Project"));
  expect(ats).toContain("Senior Data Engineer");
  expect(ats).toMatch(/GROPYUS.*Senior Data Engineer.*Sigmoid/s);
  expect(ats).toContain("Prometheus");
  expect(ats).toContain("Grafana");
  expect(ats).toContain("Kubernetes");
  expect(ats).toContain("Unleash feature flags");
  expect(ats).toContain("Oracle databases");
  expect(ats).toContain("Recognition");
  for (const excluded of ["Retail Demand MLOps Demo", "MLflow", "Vercel AI Gateway", "Model Context Protocol", "Claude Code", "AWS", "MongoDB"]) {
    expect(ats).not.toContain(excluded);
  }
  expect(localFailures).toEqual([]);
});

test("complete resume opens from homepage and works without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4173/");
  await page.getByRole("link", { name: "resume", exact: true }).click();
  await expect(page).toHaveURL(/\/resume\/$/);
  await expect(page.locator("h2")).toHaveText(["summary", "experience", "selected project", "technical skills", "education", "recognition"]);
  await expect(page.locator("main")).toContainText("Senior Data Engineer with 7+ years");
  await expect(page.locator("main")).toContainText("Birla Institute of Technology Mesra");
  await expect(page.locator("main")).toContainText("Facebook PyTorch Scholar (2018)");
  await page.getByRole("link", { name: "back to portfolio", exact: true }).click();
  await expect(page).toHaveURL("http://127.0.0.1:4173/");
  await context.close();
});

test("reduced motion disables tracking and animation while preserving reactions", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "dark" });
  await page.goto("/");
  await page.mouse.move(1000, 90);
  await expect(page.locator(".avatar-sprite")).toHaveCSS("background-position", "-72px 0px");
  await page.locator(".avatar").click();
  await expect(page.locator(".avatar-sprite")).toHaveCSS("background-position", "-144px -108px");
  expect(await page.locator(".avatar-sprite").evaluate(el => el.getAnimations().length)).toBe(0);
  await expect(page.locator(".project-preview")).toHaveCSS("transition-duration", "0s");
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(255, 255, 255)");
});

test("@performance local static page budget", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });
  const metrics = await page.evaluate(() => {
    const navigation = performance.getEntriesByType("navigation")[0];
    const resources = performance.getEntriesByType("resource");
    return {
      transfer: navigation.transferSize + resources.reduce((sum, resource) => sum + resource.transferSize, 0),
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.startTime,
      resources: resources.length,
      external: resources.filter(resource => new URL(resource.name).origin !== location.origin).length,
    };
  });
  expect(metrics.resources).toBeLessThanOrEqual(5);
  expect(metrics.transfer).toBeLessThan(500_000);
  expect(metrics.domContentLoaded).toBeLessThan(1_500);
  expect(metrics.external).toBe(0);
});
