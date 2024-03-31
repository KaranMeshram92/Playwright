import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  //globalSetup: 'globalSetup.ts',

  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: 'tests',

  timeout: 5 * 60 * 1000, //60 sec

  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 60 * 1000 //60 sec
  },

  // Look for testcase
  testMatch: /.*\.ts/,

  // Run all tests in parallel.
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,

  // Retry on CI only.
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI.
  workers: process.env.CI ? 10 : undefined,

  // Reporter to use
  reporter: 'html',
  

  use: {

    // Base URL to use in actions like `await page.goto('/')`.
    //baseURL: 'http://127.0.0.1:3000',

    // Collect trace when retrying the failed test.
    trace: 'retain-on-failure',

    // set headless
    headless: false,

    // testId 
    testIdAttribute: 'id',

    navigationTimeout: 10 * 60 * 1000,
    actionTimeout: 1 * 60 * 1000,

    // ignoreHTTPSErrors: true,
    // launchOptions: {
    //   slowMo: 500
    // },
    screenshot: {
      mode: 'on',
      fullPage: true,
      omitBackground: true,
    },
    video: {
      mode: 'retain-on-failure',
      size: {
        width: 1800,
        height: 1000
      }
    }
  },
  // Configure projects for major browsers.
  projects: [
    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },
    {
      name: 'Microsoft Edge',
      use: {
        ...devices['Desktop Edge'],
        channel: 'msedge',
        viewport: { width: 1920, height: 1080 }
      }, // or 'msedge-dev'
    }
  ],
  // Run your local dev server before starting the tests.
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },

});