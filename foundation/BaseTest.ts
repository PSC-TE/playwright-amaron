/**
 * These tests are executed in Playwright environment that launches the browser and provides a fresh page to each test.
 * BaseTest.ts is extended to all the page object classes.
 */

import { TestInfo, test as baseTest } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { HomePage } from '@pages/HomePage';
import { WebActions } from '@lib/WebActions';
import { ProdRegistrationPage } from '@pages/ProductRegistrationPage';
import { ProdStatusPage } from '@pages/ProductStatusPage';
import { HeadersPage } from '@pages/HeadersPage';


const test = baseTest.extend<{
    webActions: WebActions;
    loginPage: LoginPage;
    homePage: HomePage;
    prsPage: ProdRegistrationPage;
    productStatusPage: ProdStatusPage;
    headersPage: HeadersPage;
}>({
    webActions: async ({ page, context }, use) => {
        await use(new WebActions(page, context));
    },
    loginPage: async ({ page, context }, use) => {
        await use(new LoginPage(page, context));
    },
    homePage: async ({page, context}, use)=>{
        await use(new HomePage(page, context))
    },
    prsPage: async ({page, context}, use)=>{
        await use(new ProdRegistrationPage(page, context))
    },
    productStatusPage: async ({page, context}, use)=>{
        await use(new ProdStatusPage(page, context))
    },
    headersPage: async ({page, context}, user) => {
        await user(new HeadersPage(page, context))
    }
});

export default test;