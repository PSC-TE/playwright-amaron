// import { test, expect } from '@playwright/test';
import test from '@lib/BaseTest';
let baseUrl = 'https://staging2.batteryconnect.com/amaron/app/warranty/register';
let loginUrl = 'https://staging2.batteryconnect.com/amaron/auth/login';

test(`Verify login & page title`, async ({ homePage, webActions }) => {
    await webActions.navigateTo(baseUrl, 500)
    await homePage.clickLoginLink();
    await homePage.verifyPageTitle('Amara Raja')
    await homePage.verifyPageUrl(loginUrl);
});

