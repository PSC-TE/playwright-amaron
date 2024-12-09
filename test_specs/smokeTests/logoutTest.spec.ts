import test from '@lib/BaseTest';
import { testConfig } from 'testConfig';

let baseUrl = testConfig.qa;

test(`Verify logout page title`, async ({ homePage, loginPage, webActions, headersPage }) => {
    await webActions.navigateTo(baseUrl, 500);
    await homePage.clickLoginLink();
    await loginPage.signInType('company').click();
    await loginPage.loginToApplication();
    console.log("login successful")

    await headersPage.clickOnProfileDropdown();
    await headersPage.clickOnLogoutButton();
    await headersPage.clickOnConfirmButton();
    console.log('logout successful');
    
    await homePage.verifyPageTitle('Amara Raja')
});

