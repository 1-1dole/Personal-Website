import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFile } from 'node:fs/promises';

const caseStudies = [
  ['human-nutrition-unit', 'Human Nutrition Unit'],
  ['recipe-application', 'Recipe Application'],
  ['road-sign-detection', 'Road Sign Detection'],
  ['memory-map', 'Memory Map'],
] as const;

test('homepage presents Anson profile without a project showcase', async ({ page }) => {
  await page.goto('./');
  await expect(page.getByRole('heading', { name: 'Graduate Software Engineer' })).toBeVisible();

  const main = page.locator('main');
  for (const section of ['Skills', 'Background', 'Learnings', 'Target']) {
    await expect(main.getByRole('heading', { name: section, exact: true })).toBeVisible();
  }

  for (const [, projectTitle] of caseStudies) {
    await expect(main.getByText(projectTitle, { exact: true })).toHaveCount(0);
  }

  await expect(main.locator('[data-project-card], [data-filter]')).toHaveCount(0);
  await expect(main.locator('img[src*="hnu"], img[alt*="project" i]')).toHaveCount(0);

  await page.getByRole('navigation', { name: 'Profile map' }).getByRole('link', { name: /^Skills/ }).click();
  await expect(page).toHaveURL(/#skills$/);
  await expect(page.locator('#skills')).toBeInViewport();
});

test('profile stations keep their route color and readable text on hover', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('./');
  const expectedColors = [
    ['rgb(18, 79, 212)', 'rgb(244, 241, 232)'],
    ['rgb(7, 136, 70)', 'rgb(244, 241, 232)'],
    ['rgb(233, 79, 8)', 'rgb(244, 241, 232)'],
    ['rgb(17, 18, 15)', 'rgb(244, 241, 232)'],
  ] as const;

  for (const [index, station] of (await page.locator('[data-station]').all()).entries()) {
    await station.hover();
    const colors = await station.evaluate((element) => {
      const style = getComputedStyle(element);
      return [style.backgroundColor, style.color];
    });
    expect(colors).toEqual(expectedColors[index]);
  }
});

test('profile section headings leave clear space before their descriptions', async ({ page }) => {
  await page.setViewportSize({ width: 645, height: 900 });
  await page.goto('./');

  for (const sign of await page.locator('.section-sign').all()) {
    const gap = await sign.evaluate((element) => {
      const heading = element.querySelector('h2');
      const description = element.querySelector('p');
      if (!heading || !description) return -1;
      const headingRange = document.createRange();
      const descriptionRange = document.createRange();
      headingRange.selectNodeContents(heading);
      descriptionRange.selectNodeContents(description);
      return descriptionRange.getBoundingClientRect().top - headingRange.getBoundingClientRect().bottom;
    });
    expect(gap).toBeGreaterThanOrEqual(12);
  }
});

for (const [slug, title] of caseStudies) test(`generated ${slug} route`, async ({ page }) => { await page.goto(`projects/${slug}/`); await expect(page.locator('main h1')).toContainText(title); await expect(page.getByRole('link', { name: /profile map/i }).first()).toBeVisible(); await expect(page.getByRole('link', { name: /contact/i }).last()).toBeVisible(); for (const link of await page.locator('main a[target="_blank"]').all()) await expect(link).toHaveAttribute('rel', /noopener.*noreferrer/); for (const link of await page.locator('.related-grid a').all()) await expect(link).toHaveAttribute('href', /^\/Personal-Website\/projects\/[^/]+\/$/); });
test('HNU image, Road Sign conceptual label and related links', async ({ page }) => { await page.goto('projects/human-nutrition-unit/'); await expect(page.locator('img[alt*="nutrition" i], img[src*="hnu" i]')).toBeVisible(); await page.goto('projects/road-sign-detection/'); await expect(page.getByText('Conceptual pipeline', { exact: true })).toBeVisible(); const navLinks = await page.getByRole('navigation').getByRole('link').count(); expect(navLinks).toBeGreaterThan(0); });
test('projects use the route progress spine and retain verified evidence', async ({ page }) => {
  await page.goto('projects/human-nutrition-unit/');
  const progress = page.getByRole('navigation', { name: 'Project progress' });
  await expect(page.getByText(/^Project \/ /)).toBeVisible();
  for (const label of ['Context', 'Delivery', 'Architecture', 'Confidence', 'Reflection']) {
    await expect(progress.getByRole('link', { name: label, exact: true })).toBeVisible();
  }
  await expect(page.locator('img[src="/Personal-Website/images/hnu-homepage.png"]')).toBeVisible();
  await expect(page.getByRole('link', { name: /profile map/i })).toHaveAttribute('href', '/Personal-Website/');
});
test('base-path assets and case metadata are canonical and load', async ({ page, request }) => {
  await page.goto('./');
  const resume = page.getByRole('link', { name: /resume/i }).first();
  await expect(resume).toHaveAttribute('href', '/Personal-Website/resume/Anson_Lin_Resume.pdf');
  expect((await request.get('/Personal-Website/resume/Anson_Lin_Resume.pdf')).ok()).toBeTruthy();
  await page.goto('projects/human-nutrition-unit/');
  await expect(page.locator('img[src="/Personal-Website/images/hnu-homepage.png"]')).toHaveAttribute('src', '/Personal-Website/images/hnu-homepage.png');
  expect((await request.get('/Personal-Website/images/hnu-homepage.png')).ok()).toBeTruthy();
  await expect(page).toHaveTitle('Human Nutrition Unit — Anson Lin');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /nutrition/i);
  await expect(page.getByRole('link', { name: /related|recipe application/i }).first()).toHaveAttribute('href', /\/Personal-Website\/projects\/[^/]+\/$/);
});
test('global navigation exposes projects without putting them in homepage main', async ({ page }) => {
  await page.goto('./');
  const header = page.getByRole('banner');
  await header.getByText('Projects', { exact: true }).click();
  for (const [slug, title] of caseStudies) {
    await expect(header.getByRole('link', { name: title, exact: true })).toHaveAttribute(
      'href',
      new RegExp(`/Personal-Website/projects/${slug}/$`),
    );
    await expect(page.locator('main').getByText(title, { exact: true })).toHaveCount(0);
  }
});

test('case-study navigation is available without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4321/Personal-Website/');
  await page.getByRole('banner').getByText('Projects', { exact: true }).click();
  await expect(page.getByRole('link', { name: 'Human Nutrition Unit', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Skills', exact: true })).toBeVisible();
  await context.close();
});

test('case-study disclosure and command palette expose every route by keyboard', async ({ page }) => {
  await page.goto('./');
  const summary = page.getByRole('banner').getByText('Projects', { exact: true });
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('banner').getByRole('link', { name: 'Memory Map', exact: true })).toBeVisible();

  await page.getByRole('button', { name: 'Open command palette' }).click();
  const palette = page.getByRole('dialog', { name: /command palette/i });
  await expect(palette.getByText('Projects', { exact: true })).toBeVisible();
  for (const [slug, title] of caseStudies) {
    await expect(palette.getByRole('link', { name: title, exact: true })).toHaveAttribute(
      'href',
      new RegExp(`/Personal-Website/projects/${slug}/$`),
    );
  }
});

test('Escape restores the control that opened navigation without stealing idle focus', async ({ page }) => {
  await page.goto('./');
  const header = page.getByRole('banner');
  const summary = header.getByText('Projects', { exact: true });
  await summary.focus();
  await page.keyboard.press('Enter');
  const firstCase = header.getByRole('link', { name: 'Human Nutrition Unit', exact: true });
  await firstCase.focus();
  await page.keyboard.press('Escape');
  await expect(header.locator('[data-case-menu]')).not.toHaveAttribute('open', '');
  await expect(summary).toBeFocused();

  const home = header.getByRole('link', { name: 'Home', exact: true });
  await home.focus();
  await page.keyboard.press('Escape');
  await expect(home).toBeFocused();
});

test('mobile navigation Escape selection focus at 320/375', async ({ page }) => { for (const width of [320, 375]) { await page.setViewportSize({ width, height: 800 }); await page.goto('./'); const button = page.getByRole('button', { name: 'Open navigation' }); await button.click(); const navigation = page.getByRole('navigation', { name: /primary/i }); await expect(navigation).toHaveAttribute('data-open', 'true'); await page.keyboard.press('Escape'); await expect(button).toBeFocused(); await button.click(); await navigation.getByRole('link', { name: 'Skills', exact: true }).click(); await expect(button).toBeFocused(); } });
test('command palette keyboard and focus behavior', async ({ page }) => { await page.goto('./'); const opener = page.getByRole('button', { name: 'Open command palette' }); await opener.click(); const dialog = page.getByRole('dialog', { name: /command palette/i }); await expect(dialog).toBeVisible(); await page.keyboard.press('ArrowDown'); await page.keyboard.press('Enter'); await expect(dialog).toBeHidden(); await opener.click(); await page.keyboard.press('Escape'); await expect(opener).toBeFocused(); await page.keyboard.press('Control+k'); await expect(dialog).toBeVisible(); });
test('command palette Escape restores command focus on mobile', async ({ page }) => { await page.setViewportSize({ width: 375, height: 800 }); await page.goto('./'); const opener = page.getByRole('button', { name: 'Open command palette' }); await opener.click(); await expect(page.getByRole('dialog', { name: /command palette/i })).toBeVisible(); await page.keyboard.press('Escape'); await expect(opener).toBeFocused(); });
test('case page command palette routes back to homepage sections', async ({ page }) => { await page.goto('projects/human-nutrition-unit/'); const opener = page.getByRole('button', { name: 'Open command palette' }); await opener.click(); const dialog = page.getByRole('dialog', { name: /command palette/i }); await expect(dialog).toBeVisible(); await expect(dialog.getByRole('link', { name: 'Skills' })).toHaveAttribute('href', '/Personal-Website/#skills'); await dialog.getByRole('link', { name: 'Skills' }).click(); await expect(page).toHaveURL(/\/Personal-Website\/#skills$/); });
test('case page header stays at the page top instead of following scroll', async ({ page }) => { await page.goto('projects/human-nutrition-unit/'); const header = page.locator('.site-header'); await expect(header).toBeVisible(); await page.evaluate(() => window.scrollTo(0, 900)); await expect.poll(async () => (await header.boundingBox())?.y ?? 0).toBeLessThan(0); });
test('case study hero uses normal document flow without overlapping sections', async ({ page }) => { await page.goto('projects/human-nutrition-unit/'); const hero = page.locator('.case-hero'); const overview = page.locator('.case-section').first(); await expect(hero).toHaveCSS('position', 'static'); const heroBox = await hero.boundingBox(); const overviewBox = await overview.boundingBox(); expect(heroBox).not.toBeNull(); expect(overviewBox).not.toBeNull(); expect(overviewBox!.y).toBeGreaterThanOrEqual(heroBox!.y + heroBox!.height); });
test('contact keeps direct email without a copy control and 404 stays branded', async ({ page }) => { await page.goto('./'); await expect(page.locator('a[href^="mailto:"]').first()).toBeVisible(); await expect(page.getByRole('button', { name: /copy.*email/i })).toHaveCount(0); await expect(page.locator('[data-copy-status]')).toHaveCount(0); await page.goto('missing/'); await expect(page.getByText('404 / Station not found', { exact: true })).toBeVisible(); await expect(page.getByRole('heading', { name: 'That station is missing.' })).toBeVisible(); await expect(page.getByRole('link', { name: 'Return to profile map' })).toHaveAttribute('href', '/Personal-Website/'); });
for (const width of [320, 375, 390, 768, 1440]) {
  test(`homepage and case study have no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ['./', 'projects/recipe-application/']) {
      await page.goto(path);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    }
  });
}

test('atlas respects reduced motion and remains complete', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4321/Personal-Website/');
  await expect(page.locator('[data-station]')).toHaveCount(4);
  for (const route of await page.locator('[data-route]').all()) {
    await expect(route).toHaveCSS('animation-name', 'none');
  }
  await context.close();
});

test('homepage and representative case study have no serious axe violations', async ({ page }) => {
  for (const path of ['./', 'projects/human-nutrition-unit/']) {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.filter(({ impact }) => impact === 'serious' || impact === 'critical')).toEqual([]);
  }
});
test('production case pages use a stable stylesheet URL across deployments', async () => { const html = await readFile('dist/projects/human-nutrition-unit/index.html', 'utf8'); expect(html).toContain('href="/Personal-Website/_astro/site.css"'); });
