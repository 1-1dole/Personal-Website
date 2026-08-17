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

for (const [slug, title] of caseStudies) test(`generated ${slug} route`, async ({ page }) => { await page.goto(`projects/${slug}/`); await expect(page.locator('main h1')).toContainText(title); await expect(page.getByRole('link', { name: /back|work/i }).first()).toBeVisible(); await expect(page.getByRole('link', { name: /contact/i }).last()).toBeVisible(); for (const link of await page.locator('a[target="_blank"]').all()) await expect(link).toHaveAttribute('rel', /noopener.*noreferrer/); });
test('HNU image, Road Sign conceptual label and related links', async ({ page }) => { await page.goto('projects/human-nutrition-unit/'); await expect(page.locator('img[alt*="nutrition" i], img[src*="hnu" i]')).toBeVisible(); await page.goto('projects/road-sign-detection/'); await expect(page.getByText('Conceptual pipeline', { exact: true })).toBeVisible(); const navLinks = await page.getByRole('navigation').getByRole('link').count(); expect(navLinks).toBeGreaterThan(0); });
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
test('global navigation exposes case studies without putting them in homepage main', async ({ page }) => {
  await page.goto('./');
  const header = page.getByRole('banner');
  await header.getByText('Case studies', { exact: true }).click();
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
  await page.getByRole('banner').getByText('Case studies', { exact: true }).click();
  await expect(page.getByRole('link', { name: 'Human Nutrition Unit', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Skills', exact: true })).toBeVisible();
  await context.close();
});

test('case-study disclosure and command palette expose every route by keyboard', async ({ page }) => {
  await page.goto('./');
  const summary = page.getByRole('banner').getByText('Case studies', { exact: true });
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('banner').getByRole('link', { name: 'Memory Map', exact: true })).toBeVisible();

  await page.getByRole('button', { name: 'Open command palette' }).click();
  const palette = page.getByRole('dialog', { name: /command palette/i });
  for (const [slug, title] of caseStudies) {
    await expect(palette.getByRole('link', { name: title, exact: true })).toHaveAttribute(
      'href',
      new RegExp(`/Personal-Website/projects/${slug}/$`),
    );
  }
});

test('mobile navigation Escape selection focus at 320/375', async ({ page }) => { for (const width of [320, 375]) { await page.setViewportSize({ width, height: 800 }); await page.goto('./'); const button = page.getByRole('button', { name: 'Open navigation' }); await button.click(); const navigation = page.getByRole('navigation', { name: /primary/i }); await expect(navigation).toHaveAttribute('data-open', 'true'); await page.keyboard.press('Escape'); await expect(button).toBeFocused(); await button.click(); await navigation.getByRole('link', { name: 'Skills', exact: true }).click(); await expect(button).toBeFocused(); } });
test('command palette keyboard and focus behavior', async ({ page }) => { await page.goto('./'); const opener = page.getByRole('button', { name: 'Open command palette' }); await opener.click(); const dialog = page.getByRole('dialog', { name: /command palette/i }); await expect(dialog).toBeVisible(); await page.keyboard.press('ArrowDown'); await page.keyboard.press('Enter'); await expect(dialog).toBeHidden(); await opener.click(); await page.keyboard.press('Escape'); await expect(opener).toBeFocused(); await page.keyboard.press('Control+k'); await expect(dialog).toBeVisible(); });
test('case page command palette routes back to homepage sections', async ({ page }) => { await page.goto('projects/human-nutrition-unit/'); const opener = page.getByRole('button', { name: 'Open command palette' }); await opener.click(); const dialog = page.getByRole('dialog', { name: /command palette/i }); await expect(dialog).toBeVisible(); await expect(dialog.getByRole('link', { name: 'Skills' })).toHaveAttribute('href', '/Personal-Website/#skills'); await dialog.getByRole('link', { name: 'Skills' }).click(); await expect(page).toHaveURL(/\/Personal-Website\/#skills$/); });
test('case page header stays at the page top instead of following scroll', async ({ page }) => { await page.goto('projects/human-nutrition-unit/'); const header = page.locator('.site-header'); await expect(header).toBeVisible(); await page.evaluate(() => window.scrollTo(0, 900)); await expect.poll(async () => (await header.boundingBox())?.y ?? 0).toBeLessThan(0); });
test('case study hero uses normal document flow without overlapping sections', async ({ page }) => { await page.goto('projects/human-nutrition-unit/'); const hero = page.locator('.case-hero'); const overview = page.locator('.case-section').first(); await expect(hero).toHaveCSS('position', 'static'); const heroBox = await hero.boundingBox(); const overviewBox = await overview.boundingBox(); expect(heroBox).not.toBeNull(); expect(overviewBox).not.toBeNull(); expect(overviewBox!.y).toBeGreaterThanOrEqual(heroBox!.y + heroBox!.height); });
test('email fallback/status and branded 404', async ({ page }) => { await page.goto('./'); await expect(page.locator('a[href^="mailto:"]').first()).toBeVisible(); const copy = page.getByRole('button', { name: /copy.*email/i }); if (await copy.count()) { await copy.click(); await expect(page.locator('[aria-live="polite"], [role="status"]')).toContainText(/copied|failed|clipboard/i); } await page.goto('missing/'); await expect(page.getByRole('heading', { name: /404|lost/i })).toBeVisible(); });
for (const width of [320, 375, 768, 1440]) test(`no horizontal overflow ${width}px`, async ({ page }) => { await page.setViewportSize({ width, height: 900 }); await page.goto('./'); expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBeTruthy(); });
test('axe and reduced motion', async ({ page, browser }) => { await page.goto('./'); const results = await new AxeBuilder({ page }).analyze(); expect(results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')).toEqual([]); const canvas = page.locator('canvas[aria-hidden="true"]'); if (await canvas.count()) await expect(canvas).toBeVisible(); const context = await browser.newContext({ reducedMotion: 'reduce' }); const reduced = await context.newPage(); await reduced.goto('./'); expect(await reduced.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBeTruthy(); const reducedCanvas = reduced.locator('canvas[aria-hidden="true"]'); if (await reducedCanvas.count()) { await expect(reducedCanvas).toHaveAttribute('data-motion', /disabled|paused|off/); } await context.close(); });
test('production case pages use a stable stylesheet URL across deployments', async () => { const html = await readFile('dist/projects/human-nutrition-unit/index.html', 'utf8'); expect(html).toContain('href="/Personal-Website/_astro/site.css"'); });
