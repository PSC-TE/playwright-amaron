import { expect, Locator, Page, BrowserContext } from '@playwright/test';
import { WebActions } from "@lib/WebActions";

// let webActions : WebActions;

export class HeadersPage extends WebActions {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly LOGIN_LINK: Locator;
    readonly LOGOUT_BUTTON: Locator;
    readonly PROFILE_DROPDOWN: Locator;
    readonly DROPDOWN_MENU: Locator;
    readonly CONFIRM_BUTTON: Locator;
    readonly CANCEL_BUTTON: Locator;

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
        this.page = page;
        this.context = context;
        // webActions = new WebActions(this.page, this.context);
        this.LOGIN_LINK = page.locator('shared-header .login-panel')
        this.PROFILE_DROPDOWN = page.getByRole('img', { name: 'arrow' }).first();
        this.LOGOUT_BUTTON = page.getByRole('navigation').getByText('Logout');
        this.CONFIRM_BUTTON = page.getByRole('button', { name: 'Confirm' });
        this.CANCEL_BUTTON = page.getByRole('button', { name: 'Cancel' });
    }

    async clickOnLoginLink() {
        await this.clickElement(this.LOGIN_LINK, 200);
    }

    async clickOnProfileDropdown(){
        await this.clickElement(this.PROFILE_DROPDOWN, 200);
    }

    async clickOnLogoutButton(){
        await this.clickElement(this.LOGOUT_BUTTON, 200);
    }

    async clickOnConfirmButton(){
        await this.clickElement(this.CONFIRM_BUTTON, 200);
    }

    async clickOnCancelButton(){
        await this.clickElement(this.CANCEL_BUTTON, 200);
    }
}
