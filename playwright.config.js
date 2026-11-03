
/** @type {import('@playwright/test').PlaywrightTestConfig} */

const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({

  // Test folder
  testDir: './tests',

  // Run tests in parallel
  fullyParallel: true,

  // Prevent test.only in CI
  forbidOnly: !!process.env.CI,

  // Retry failed tests on GitHub Actions
  retries: process.env.CI ? 2 : 0,

  // Worker configuration
  workers: process.env.CI ? 1 : undefined,

  // Reporters
  reporter: [
    ['list'],
    ['html', {
      outputFolder: 'playwright-report',
      open: 'never'
    }]
  ],

  // Shared browser settings
  use: {

    // SauceDemo application URL
    baseURL: 'https://www.saucedemo.com',

    // Headed locally, headless in CI
    headless: !!process.env.CI,

    // Trace on first retry
    trace: 'on-first-retry',

    // Screenshot on failure
    screenshot: 'only-on-failure',

    // Video on failure
    video: 'retain-on-failure',

    // Slow motion locally
    launchOptions: {
      slowMo: process.env.CI ? 0 : 100
    }
  },

  // Browser configurations
  projects: [

    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome']
      }
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox']
      }
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari']
      }
    }

  ]

});
