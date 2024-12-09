import { expect, Locator, Page, BrowserContext } from '@playwright/test';
import { WebActions } from "@lib/WebActions";

let webActions: WebActions;

export class HomePage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly LOGIN_LINK: Locator;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        webActions = new WebActions(this.page, this.context);
        this.LOGIN_LINK = page.locator('shared-header .login-panel')
    }

    async getPageTitle(): Promise<string>{
        return await webActions.getPageTitle()
    }

    async verifyPageTitle(name: string): Promise<void> {
        await expect(this.page).toHaveTitle(name);
    }

    async verifyPageUrl(url: string): Promise<void> {
        await expect(this.page).toHaveURL(url);
    }

    async clickLoginLink(): Promise<void> {
        await webActions.clickElement(this.LOGIN_LINK, 0);
    }

}