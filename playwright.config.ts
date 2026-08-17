import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  fullyParallel: true,
  webServer: { command: 'pnpm dev --host 127.0.0.1', port: 4321, reuseExistingServer: true },
  use: { baseURL: 'http://127.0.0.1:4321/Personal-Website/', browserName: 'chromium', launchOptions: { executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' }, trace: 'on-first-retry' },
});
