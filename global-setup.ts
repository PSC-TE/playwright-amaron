/**
 * Global setup file is used to perform some global operations before the execution of test cases.
 * Here it is configured to remove the previous allure-report files.
 */
import { rimraf } from "rimraf";

async function globalSetup(): Promise<void> {
    try {
        await rimraf('./my-allure-results');
    } catch (error) {
        throw new Error(`Failed to remove directory: ${error.message}`);
    }
}

export default globalSetup;
