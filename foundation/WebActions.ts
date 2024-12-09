/**
 * WebActions class contains all the common web actions that can be performed on a web page.
 */

import fs from 'fs';
import type { Page } from '@playwright/test';
import { BrowserContext, expect, Locator } from '@playwright/test';
// import { Workbook } from 'exceljs';
import { testConfig } from '../testConfig';

export class WebActions {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly element: Locator;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
    }

    async delay(time: number): Promise<void> {
        return new Promise(function (resolve) {
            setTimeout(resolve, time);
        });
    }

    async navigateTo(url: string, timeOut: number){
        let isSuccess = false
        try {
            if (timeOut != undefined) {
                await this.page.waitForTimeout(timeOut)
            }
            await this.page.goto(url)
            isSuccess = true
        } catch (e) {
            console.log("Error occurred in navigating to the Page" + e)
        }
        return isSuccess
    }
    async getPageTitle() {
        let pageTitle = null
        try {
            pageTitle = await this.page.title()
        } catch (e) {
            console.log("Error occurred in getting the Page Title" + e)
        }
        return pageTitle
    }

    async clickElement (element: Locator, timeOut: number) {
        let isSuccess = false
        try {
            if (timeOut != undefined) {
                await this.page.waitForTimeout(timeOut)
            }
            if (element.isVisible()) {
                await this.page.waitForLoadState('domcontentloaded')
                await element.waitFor()
                await element.scrollIntoViewIfNeeded()
                await element.click()
            }
            isSuccess = true
        } catch (e) {
            console.log("Error occurred in clicking the element: " + e)
        }
        return isSuccess
    }

    async getUrl() {
        let getUrl = null
        try {
            getUrl = await this.page.url()
        } catch (e) {
            console.log("Error occurred in getting the url of the Page" + e)
        }
        return getUrl
    };

    async fillTextBox(element: Locator, inputText: string){
        let isSuccess = false;
        try {
            if (element.isVisible()) {
                await element.waitFor()
                await element.scrollIntoViewIfNeeded()
                await element.click()
                await element.fill(inputText)
                isSuccess = true
            }
        } catch (e) {
            console.log("Error occurred in setting the input text: " + e)
        }
        return isSuccess
    };

    getElementText = async function (element: Locator, timeOut: number) {
        let textContent = null
        try {
            if (timeOut != undefined) {
                await this.page.waitForTimeout(timeOut);
                textContent = await element.textContent();
            }
        } catch (e) {
            console.log("Error occurred in getting the text content: " + e)
        }
        return textContent
    }

    async pressEnter(element: string){
        return await this.page.locator(element).press('Enter')
    }

    async clickCheckBox(element: Locator){
        let isSuccess = false;
        try {
            if (element.isVisible()) {
                await element.waitFor()
                await element.scrollIntoViewIfNeeded()
                await element.click()
                isSuccess = true
            }
        } catch (e) {
            console.log("Error occurred in checking the 'Terms and Conditions' check box: " + e)
        }
        return isSuccess
    }

    async elementToBeEnabled(element: Locator, timeout: number){
        let isSuccess = false;
        try {
            if (element.isVisible()) {
                await element.waitFor()
                await element.scrollIntoViewIfNeeded()
                await expect(element).toBeEnabled({timeout: timeout})
                isSuccess = true
            }
        } catch (e) {
            console.log("Error occurred in and the element is not enabled " + e)
        }
        return isSuccess
    }

    async selectOptions(element: string, value: string){
        return await this.page.locator(element).selectOption({value: value});
    }

    async clickElementJS(locator: string): Promise<void> {
        return await this.page.$eval(locator, (element: HTMLElement) => element.click());
    }

    async dragAndDrop(element: string, location: string){
        return await this.page.locator(element).dragTo(this.page.locator(location));
    }

    async scrollToView(element: Locator){
        return await (element).scrollIntoViewIfNeeded();
    }

    async readValuesFromTextFile(filePath: string): Promise<string> {
        return fs.readFileSync(`${filePath}`, `utf-8`);
    }

    // async readDataFromExcel(fileName: string, sheetName: string, rowNum: number, cellNum: number): Promise<string> {
    //     const workbook = new Workbook();
    //     return workbook.xlsx.readFile(`./Downloads/${fileName}`).then(function () {
    //         const sheet = workbook.getWorksheet(sheetName);
    //         return sheet.getRow(rowNum).getCell(cellNum).toString();
    //     });
    // }

}