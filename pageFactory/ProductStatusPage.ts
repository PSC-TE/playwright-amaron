import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { WebActions } from "@lib/WebActions";
import { testConfig } from 'testConfig';
import { log } from 'console';

let webActions: WebActions;

export class ProdStatusPage {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly STATUS_TAB: Locator;
    readonly REGISTRATION_TAB: Locator;
    readonly MOBILE_TEXT_BOX: Locator;
    readonly CHECK_STATUS: Locator;
    readonly REGISTERED_PRODUCT_HEADING: Locator;
    readonly PRODUCT_SERIAL_NUMBER: string;
    readonly DELETE_BUTTON: Locator;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        webActions = new WebActions(this.page, this.context);
        this.STATUS_TAB = this.page.getByRole('tab', { name: 'Status' });
        this.REGISTRATION_TAB = this.page.getByRole('tab', { name: 'Registration' });
        this.MOBILE_TEXT_BOX = this.page.getByPlaceholder('Registered Mobile/Email Id');
        this.CHECK_STATUS = this.page.getByRole('button', { name: 'Check Status' });
        this.REGISTERED_PRODUCT_HEADING = this.page.getByRole('heading', { name: 'Registered Batterie(s)/HUPS(s' })
        this.DELETE_BUTTON = this.page.locator(`//button[@mattooltip="Delete battery"]`);
    }       

    async clickStatusTab(){
        return await webActions.clickElement(this.STATUS_TAB, 0);
    }

    async clickRegistrationTab(){
        await webActions.clickElement(this.REGISTRATION_TAB, 0);
    }

    async enterMobileNumber(mobNo: string){
        return await webActions.fillTextBox(this.MOBILE_TEXT_BOX, mobNo);
    }

    async clickCheckStatusBox(){
        await webActions.clickElement(this.CHECK_STATUS, 0);
    }

    async verifyProductHeading(){
        let text = await webActions.getElementText(this.REGISTERED_PRODUCT_HEADING, 0);
        console.log(text);
        // let headingText = `Registered Batterie(s)/HUPS(s) Against Mobile Number/Email - "8688652225"`
        await expect(this.REGISTERED_PRODUCT_HEADING).toHaveText(`Registered Batterie(s)/HUPS(s) Against Mobile Number/Email - "${testConfig.MOBILE2}"`);

    }

    getBatteryName(batteryName: string): Locator {
        return this.page.getByText(batteryName).first();
    }

    async clickBatteryName(batteryName: string): Promise<void> {
        await webActions.clickElement(this.getBatteryName(batteryName), 0);
    }

    getSerialNumber(serialNumber: string): Locator{
        return this.page.getByText(serialNumber).nth(1)
    }
    
    async verifySerialNumber(batteryName:string, serialNo: string, expectedSerialNo: string){
        await this.clickBatteryName(batteryName);
        const serialNumberLocator = this.getSerialNumber(serialNo)
        await expect(serialNumberLocator).toHaveText(expectedSerialNo);
    }

    async deleteButtonVisible(){
        await this.DELETE_BUTTON.scrollIntoViewIfNeeded();
        await expect(this.DELETE_BUTTON).toBeVisible();
    }

    async deleteSelectedBattery(){
        await webActions.clickElement(this.DELETE_BUTTON, 0);
    }
}