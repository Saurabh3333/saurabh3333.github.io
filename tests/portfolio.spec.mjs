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
  test(`${viewport.name}: complete responsive portfolio`, async ({ page }) => {
    const errors = collectRuntimeErrors(page);
    await page.setViewportSize(viewport);
    const response = await page.goto("/", { waitUntil: "networkidle" });

    expect(response.ok()).toBeTruthy();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Data platforms.*built for.*production/is);
    await expect(page.getByRole("heading", { name: "Regulation Check", exact: true })).toBeVisible();
    await expect(page.locator("#work")).toContainText("Regulation Check");
    await expect(page.locator("#experience .timeline > li")).toHaveCount(3);
    await expect(page.locator("#toolkit .skill-groups > div:not(.stack-core)")).toHaveCount(5);
    await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeVisible();

    const layout = await page.evaluate(() => ({
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: document.documentElement.clientWidth,
      shellLeft: document.querySelector(".page-shell").getBoundingClientRect().left,
      shellRight: document.querySelector(".page-shell").getBoundingClientRect().right,
      shellWidth: document.querySelector(".page-shell").getBoundingClientRect().width,
      clipped: [...document.querySelectorAll("body *")].filter(element => {
        const style = getComputedStyle(element), rect = element.getBoundingClientRect();
        return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0
          && !element.closest('[aria-hidden="true"]') && (rect.left < -0.5 || rect.right > document.documentElement.clientWidth + 0.5);
      }).map(element => `${element.tagName}.${element.className}`),
      overlaps: [
        ".site-header nav > *", ".system-deck > article", ".quick-facts > p", ".principle-grid > article",
        ".project-card > *", ".timeline > li", ".skill-groups > div", ".human-section > *",
        ".education-row > *", ".recognition-list > li", ".contact-actions > *", ".social-links > *",
      ].flatMap(selector => {
        const elements = [...document.querySelectorAll(selector)].filter(element => element.getBoundingClientRect().width > 0);
        return elements.flatMap((element, index) => elements.slice(index + 1).filter(other => {
          const a = element.getBoundingClientRect(), b = other.getBoundingClientRect();
          return Math.min(a.right, b.right) - Math.max(a.left, b.left) > 1 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 1;
        }).map(() => selector));
      }),
    }));
    expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth);
    expect(layout.shellRight).toBeLessThanOrEqual(layout.viewportWidth + 0.5);
    expect(Math.abs(layout.shellLeft - (layout.viewportWidth - layout.shellWidth) / 2)).toBeLessThanOrEqual(0.5);
    expect(layout.shellWidth).toBeLessThanOrEqual(Math.min(viewport.width, 1536));
    expect(layout.clipped).toEqual([]);
    expect(layout.overlaps).toEqual([]);

    await page.locator("#contact").scrollIntoViewIfNeeded();
    await expect(page.locator("#contact")).toHaveClass(/is-visible/);
    await expect(page.getByRole("link", { name: /Email me/ })).toBeVisible();

    await page.goto("/resume/", { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Saurabh Shubham");
    await expect(page.getByRole("button", { name: /Switch to (dark|light) theme/ })).toBeVisible();
    const resumeLayout = await page.evaluate(() => {
      const groups = [".site-header nav > *", ".resume-hero > *", ".resume-intro > *", ".status > div", ".actions > *", ".resume-preview > *"];
      const overlaps = groups.flatMap(selector => {
        const elements = [...document.querySelectorAll(selector)];
        return elements.flatMap((element, index) => elements.slice(index + 1).filter(other => {
          const a = element.getBoundingClientRect(), b = other.getBoundingClientRect();
          return Math.min(a.right, b.right) - Math.max(a.left, b.left) > 1 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 1;
        }).map(() => selector));
      });
      const preview = document.querySelector(".resume-preview object").getBoundingClientRect();
      const clipped = [...document.querySelectorAll("body *")].filter(element => {
        const style = getComputedStyle(element), rect = element.getBoundingClientRect();
        return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0
          && !element.closest('[aria-hidden="true"]') && (rect.left < -0.5 || rect.right > document.documentElement.clientWidth + 0.5);
      }).map(element => `${element.tagName}.${element.className}`);
      const undersizedTargets = [...document.querySelectorAll("a, button")].filter(element => {
        const rect = element.getBoundingClientRect(), style = getComputedStyle(element);
        return style.display !== "none" && (rect.width < 43.5 || rect.height < 43.5);
      }).map(element => `${element.tagName}.${element.className}`);
      return { documentWidth: document.documentElement.scrollWidth, viewportWidth: document.documentElement.clientWidth, overlaps, clipped, undersizedTargets, previewRatio: preview.width / preview.height };
    });
    expect(resumeLayout.documentWidth).toBeLessThanOrEqual(resumeLayout.viewportWidth);
    expect(resumeLayout.overlaps).toEqual([]);
    expect(resumeLayout.clipped).toEqual([]);
    expect(resumeLayout.undersizedTargets).toEqual([]);
    expect(resumeLayout.previewRatio).toBeCloseTo(210 / 297, 2);
    expect(errors).toEqual([]);
  });
}

test("semantic structure and accessible controls", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("main")).toHaveCount(1);
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeVisible();

  const audit = await page.evaluate(() => {
    const duplicateIds = [...document.querySelectorAll("[id]")]
      .map(element => element.id)
      .filter((id, index, ids) => ids.indexOf(id) !== index);
    const unnamedButtons = [...document.querySelectorAll("button")]
      .filter(button => !(button.textContent.trim() || button.getAttribute("aria-label"))).length;
    const emptyLinks = [...document.querySelectorAll("a")]
      .filter(link => !link.getAttribute("href") || !(link.textContent.trim() || link.getAttribute("aria-label"))).length;
    const unlabelledSections = [...document.querySelectorAll("main section")]
      .filter(section => !section.getAttribute("aria-labelledby")).length;
    const undersizedTargets = [...document.querySelectorAll(".site-header nav a, .site-header nav button, .button, .social-links a, .social-links button")]
      .filter(element => element.getBoundingClientRect().height < 43.5).length;
    return { duplicateIds, unnamedButtons, emptyLinks, unlabelledSections, undersizedTargets };
  });

  expect(audit).toEqual({ duplicateIds: [], unnamedButtons: 0, emptyLinks: 0, unlabelledSections: 0, undersizedTargets: 0 });
});

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

test("senior data engineer recruiter scan matches the production resume", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".intro")).toContainText("7+ years");
  await expect(page.locator(".intro")).toContainText(/Senior Data Engineer.*Data Platforms.*7\+ years.*manufacturing data platforms.*Python.*SQL.*ETL\/ELT.*production observability/is);
  await expect(page.locator(".principle-grid article")).toHaveCount(3);
  await expect(page.locator(".principle-grid")).toContainText(/Data platforms.*Production observability.*Backend systems/is);
  await expect(page.locator(".project-card")).toHaveCount(1);
  await expect(page.locator(".timeline > li")).toHaveCount(3);
  await expect(page.locator(".focus-card")).toHaveCount(3);
  await expect(page.locator(".signal-strip")).toBeVisible();
  await expect(page.locator(".stack-core")).toContainText(/production.*data.*platform/is);
  await expect(page.locator(".project-facts > div")).toHaveCount(4);
  await expect(page.locator(".regulation-card")).toContainText(/EU AI Act readiness.*FastAPI.*PostgreSQL.*Docker.*GitHub Actions/is);
  await expect(page.locator("#experience")).toContainText(/production planning.*CDC.*Azure CI\/CD.*Prometheus.*Grafana.*Kubernetes.*Unleash/is);
  await expect(page.locator("#experience")).toContainText(/consumer-goods sales data.*Google Cloud.*MySQL.*Java.*Spring.*Oracle/is);
  await expect(page.locator(".recognition-list")).toContainText(/Facebook PyTorch Scholar.*HackWithInfy.*Google Tech Intern Connect/is);

  const copy = await page.locator("main").innerText();
  for (const genericPhrase of ["Retail Demand MLOps Demo", "MLflow", "model registry", "model serving", "model drift", "agentic AI", "Claude Code", "Looper", "Pasin", "agent orchestration", "AWS", "MongoDB", "JavaScript", "C++"]) {
    expect(copy.toLowerCase()).not.toContain(genericPhrase);
  }
});

test("keyboard navigation, skip link, and visible focus", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.locator(".skip-link")).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();

  await page.keyboard.press("Tab");
  const focused = page.locator(":focus");
  await expect(focused).toBeVisible();
  expect(await focused.evaluate(element => getComputedStyle(element).outlineStyle)).not.toBe("none");
});

test("primary navigation reaches work and contact", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "Work" }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect(page.locator("#work")).toBeInViewport();

  await page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "Contact" }).click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.locator("#contact")).toBeInViewport();
});

test("theme control toggles and persists", async ({ page }) => {
  await page.goto("/");
  const toggle = page.locator(".theme-toggle");
  await expect(toggle).toHaveAttribute("aria-label", "Switch to dark theme");
  await toggle.click();
  await expect(page.locator("body")).toHaveAttribute("data-theme", "dark");
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  await expect(toggle).toHaveAttribute("aria-label", "Switch to light theme");
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute("content", "#0d0d0f");

  await page.reload();
  await expect(page.locator("body")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(page.locator("body")).toHaveAttribute("data-theme", "light");

  await page.goto("/resume/");
  await expect(page.getByRole("button", { name: "Switch to dark theme" })).toBeVisible();
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(page.locator("body")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute("content", "#0d0d0f");

  await page.goto("/");
  await expect(page.locator("body")).toHaveAttribute("data-theme", "dark");
});

test("copy-email interaction gives live feedback", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  await page.getByRole("button", { name: "Copy email" }).click();
  await expect(page.getByRole("status")).toHaveText("Email copied.");
  await expect(page.getByRole("button", { name: "Copied" })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("saurabh.friday@gmail.com");
});

test("local routes, resume assets, and external project link", async ({ page }) => {
  const localFailures = [];
  page.on("response", response => {
    if (new URL(response.url()).origin === "http://127.0.0.1:4173" && response.status() >= 400) {
      localFailures.push(`${response.status()} ${response.url()}`);
    }
  });
  await page.goto("/");
  await expect(page.getByRole("link", { name: /Regulation Check/ })).toHaveAttribute("href", "https://regulationcheck.com/");
  await page.goto("/resume/");
  await expect(page.locator("h1")).toHaveText("Saurabh Shubham");
  await expect(page).toHaveTitle("Senior Data Engineer Resume — Saurabh Shubham");
  await expect(page.locator(".hero-copy")).toHaveText(/Senior Data Engineer.*Data Platforms.*Backend Systems/);
  await expect(page.locator("body")).toHaveClass("resume-page");
  await expect(page.locator(".status > div")).toHaveCount(3);
  await expect(page.getByRole("heading", { name: /résumé.*preview/i })).toBeVisible();

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

test("reduced motion removes transitions and reveals content", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(await page.locator("html").evaluate(element => getComputedStyle(element).scrollBehavior)).toBe("auto");
  await expect(page.locator("#work")).toHaveCSS("opacity", "1");
  await expect(page.locator("#work")).toHaveCSS("transform", "none");
  await expect(page.locator(".quick-facts .live-dot")).toHaveCount(0);
});

test("light and dark themes keep readable base contrast", async ({ page }) => {
  await page.goto("/");
  const ratios = [];
  for (const theme of ["light", "dark"]) {
    if (theme === "dark") await page.getByRole("button", { name: "Switch to dark theme" }).click();
    ratios.push(await page.evaluate(() => {
      const parse = value => value.match(/[\d.]+/g).slice(0, 3).map(Number);
      const luminance = rgb => {
        const values = rgb.map(channel => {
          const value = channel / 255;
          return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
        });
        return 0.2126 * values[0] + 0.7152 * values[1] + 0.0722 * values[2];
      };
      const style = getComputedStyle(document.body);
      const a = luminance(parse(style.color));
      const b = luminance(parse(style.backgroundColor));
      return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
    }));
  }
  ratios.forEach(ratio => expect(ratio).toBeGreaterThanOrEqual(7));
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
