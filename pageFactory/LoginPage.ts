import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { WebActions } from "@lib/WebActions";
import { testConfig } from 'testConfig';

let webActions: WebActions;

export class LoginPage extends WebActions {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly USER_EDITBOX: Locator;
    readonly PASSWORD_EDITBOX: Locator;
    readonly SIGNIN_BUTTON: Locator;
    readonly PRODUCT_REGISTRATION_LINK: Locator;
    // readonly LOGIN_LOGO: Locator;

    constructor(page: Page, context: BrowserContext) {
        super(page, context)
        this.page = page;
        this.context = context;
        this.USER_EDITBOX = this.page.getByPlaceholder('User ID');
        this.PASSWORD_EDITBOX = this.page.getByPlaceholder('Password');
        this.SIGNIN_BUTTON = this.page.getByRole('button', { name: 'Sign In' });
        this.PRODUCT_REGISTRATION_LINK = this.page.getByText('Product Registration & Status');
    }

    // this method is to choose the sign-in options (i.e., customers, channel partners, company)
    signInType(userType: string): Locator {
        return this.page.locator(`//*[@id='${userType}']`);
    }

    async selectSignInType(userType: string){
        await this.clickElement(this.signInType(userType), 500)
    }

    async loginToApplication(): Promise<void> { 
        // const decipherPassword = await webActions.decipherPassword();

        await this.fillTextBox(this.USER_EDITBOX, testConfig.userID);
        await this.fillTextBox(this.PASSWORD_EDITBOX, testConfig.password);
        await this.delay(2000)
        await this.clickElement(this.SIGNIN_BUTTON, 200)

    }

    async verifyPageTitle(title: string): Promise<void> {
        await expect(this.page).toHaveTitle(title);
    }

    async clickProductRegistrationTab(): Promise<void>{
        await this.clickElement(this.PRODUCT_REGISTRATION_LINK, 200)
    }
}