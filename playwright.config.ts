// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { testConfig } from './testConfig';

// environment
const ENV = 'qa';
if (!ENV || ![`qa`, `dev`].includes(ENV)) {
  console.log(`Please provide a correct environment value after command like "--ENV=qa|dev|qaApi|devApi"`);
  process.exit();
}
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */

module.exports = defineConfig({
  // testDir: './test_specs/smokeTests/',

  // Glob patterns or regular expressions to ignore test files.
  // testIgnore: '*test-assets',

  // Glob patterns or regular expressions that match test files.
  // testMatch: '*todo-tests/*.spec.ts',

  //Global Setup to run before all tests
  globalSetup: `./global-setup`,

  // sets timeout for each test cases
  timeout: 120000,

  // config for expect assertions
  expect: {
    timeout: 30000
  },

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  //number of retries if test case fails
  retries: process.env.CI ? 2 : 0,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter:[
    ['allure-playwright', 
      {
        resultsDir: 'my-allure-results'
        
      }
    ], 
    ['html',
      { 
        outputFolder: 'html-report', 
        open: 'never' 
      }
    ]
  ],

    
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  // use: {
  //   video: 'retain-on-failure',
  //   launchOptions: {
  //     slowMo: 0
  //   },

  //   /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: testConfig.qa,

  //   /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  //   trace: 'on-first-retry',
  //   //Artifacts
  //   screenshot: `only-on-failure`,
  // },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        headless: false,
        video: 'retain-on-failure',
        launchOptions: {
          slowMo: 1000
        },
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: testConfig[ENV],
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry',
        screenshot: `only-on-failure`,
       },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

