import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { WebActions } from "@lib/WebActions";

export class ProdRegistrationPage extends WebActions {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly USERNAME_EDITBOX: string;
    readonly PASSWORD_EDITBOX: string;
    readonly STATUS_TAB: Locator;
    readonly REGISTRATION_TAB: Locator;
    readonly MOBILE_TEXT_BOX: Locator;
    readonly BATTERY_SERIAL_NO_BOX: Locator;
    readonly DATE_SELECT: Locator;
    readonly VEHICAL_NO_BOX: Locator;
    readonly CUSTOMER_MOBILE_NO: Locator;
    readonly OPEN_CALANDER: Locator;
    readonly CHECKBOX: Locator;
    readonly REGISTER_BUTTON: Locator;
    readonly EXPAND_VEHICAL_DETAILS_BUTTON: Locator;


    constructor(page: Page, context: BrowserContext) {
        super(page, context)
        this.page = page;
        this.context = context;
        this.STATUS_TAB = this.page.getByRole('tab', { name: 'Status' });
        this.REGISTRATION_TAB = this.page.getByRole('tab', { name: 'Registration' });
        this.MOBILE_TEXT_BOX = this.page.getByPlaceholder('Registered Mobile/Email Id');
        this.BATTERY_SERIAL_NO_BOX = this.page.getByPlaceholder('Battery Serial Number');
        this.VEHICAL_NO_BOX = this.page.getByPlaceholder('Vehicle Number/VIN Number').first();
        this.CUSTOMER_MOBILE_NO = this.page.getByPlaceholder('Customer Mobile / Email');
        this.OPEN_CALANDER = this.page.getByLabel('Open calendar');
        this.DATE_SELECT = this.page.getByLabel('03-Nov-');
        this.CHECKBOX = this.page.locator('.checkmark').first()
        this.REGISTER_BUTTON = this.page.getByRole('button', { name: 'Register' });
        this.EXPAND_VEHICAL_DETAILS_BUTTON = this.page.locator("//i[text()='add']").first();
    }

    selectCategoryTab(category: RegExp): Locator {
        return this.page.locator('div').filter({ hasText: category  });
    }

    async clickStatusTab(){
        await this.clickElement(this.STATUS_TAB, 0)
    }

    async clickRegistrationTab(){
        await this.clickElement(this.REGISTRATION_TAB, 0)
    }

    async clickOnSelectedCategoryTab(category: RegExp){
        await this.clickElement(this.selectCategoryTab(category), 0)
    }

    async registerBatteryWtihSerialNo(serialNumber: string, vehicalNo: string, mobileNo: string, ){
        await this.fillTextBox(this.BATTERY_SERIAL_NO_BOX, serialNumber);
        await this.fillTextBox(this.VEHICAL_NO_BOX, vehicalNo);
        await this.fillTextBox(this.CUSTOMER_MOBILE_NO, mobileNo);
        await this.clickElement(this.OPEN_CALANDER, 0);
        await this.clickElement(this.DATE_SELECT, 0);
        await this.clickCheckBox(this.CHECKBOX);
        // await webActions.clickElement(this.REGISTER_BUTTON, 0);
    }

    async registerBatteryWithVehicalDetails(){
        await this.clickElement(this.EXPAND_VEHICAL_DETAILS_BUTTON,0);
    }

    async verifyRegisterButtonIsEnabled(){
        await this.elementToBeEnabled(this.REGISTER_BUTTON, 3000)
    }

    async verifyRegisterButtonIsDisabled(){
        await expect(this.REGISTER_BUTTON).toBeDisabled();
    }

    // async selectDate(targetMonth: string, targetYear: string, targetDay: number) {
    // // Open the calendar input (example: clicking on an input field that opens the calendar)
    // const calendarInput = await this.OPEN_CALANDER; // Replace with actual selector
    // if (calendarInput) {
    //     await calendarInput.click();
    // } else {
    //     console.error('Calendar input not found!');
    //     return;
    // }

    // // Navigate to the correct month/year
    // // await navigateToMonth(targetMonth, targetYear);

    // // Select the target day
    // const dayElement = await this.page.$(`td[aria-label="${targetDay}"]`); // Use the appropriate selector for your calendar
    // if (dayElement) {
    //     await dayElement.click();
    // } else {
    //     console.error(`Day ${targetDay} not found in calendar!`);
    // }
    // }

    // async navigateToMonth(targetMonth: string, targetYear: string) {
    // // Loop until we find the correct month and year
    // let currentMonth: string;
    // let currentYear: string;
    
    // do {
    //     // Get the current month and year displayed on the calendar (adjust selectors as needed)
    //     const monthElement = await this.page.$('.calendar-header .month'); // Adjust selector
    //     const yearElement = await this.page.$('.calendar-header .year'); // Adjust selector
        
    //     currentMonth = monthElement ? await monthElement.innerText() : '';
    //     currentYear = yearElement ? await yearElement.innerText() : '';

    //     console.log(`Current Month: ${currentMonth}, Current Year: ${currentYear}`);

    //     // If the displayed month and year do not match the target, click the "next" button
    //     if (currentMonth !== targetMonth || currentYear !== targetYear) {
    //     const nextButton = await page.$('.calendar-header .next'); // Adjust selector for "next" button
    //     if (nextButton) {
    //         await nextButton.click();
    //     }
    //     }
    // } while (currentMonth !== targetMonth || currentYear !== targetYear);
    // }

    // async function main() {
    // // Launch the browser and open a new page
    // const browser = await chromium.launch({ headless: false });
    // const page = await browser.newPage();

    // // Navigate to the page with the calendar
    // await page.goto('http://example.com'); // Replace with actual URL

    // // Define the target date (e.g., select December 2024, 15th)
    // const targetMonth = 'December';
    // const targetYear = '2024';
    // const targetDay = 15;

    // // Select the date dynamically
    // await selectDate(page, targetMonth, targetYear, targetDay);

    // // Wait a few seconds to see the result
    // await page.waitForTimeout(5000);

    // // Close the browser
    // await browser.close();
    // }

    // main().catch(err => {
    // console.error('Error in automation:', err);
    // });

}