/**
 * This is commonSetup.ts file to perform such common browser actions like navigating to url and do login logout action.
 * Here we are using beforeEach() and afterEach() hooks
 * */

import test from "@lib/BaseTest";
import { testConfig } from "testConfig";
let baseUrl = testConfig.qa;

const commonSetup = () => {
  test.beforeEach(async ({ loginPage, headersPage, webActions }) => {
    await webActions.navigateTo(baseUrl, 500);
    await headersPage.clickOnLoginLink();
    await loginPage.selectSignInType('company');
    await loginPage.loginToApplication();
    console.log("login successful")
  });

  test.afterEach(async ({ headersPage }) => {
    await headersPage.clickOnProfileDropdown();
    await headersPage.clickOnLogoutButton();
    await headersPage.clickOnConfirmButton();
    console.log('logout successful');
  });
};

export default commonSetup;
