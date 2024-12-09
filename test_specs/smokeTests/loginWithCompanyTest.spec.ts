import test from '@lib/BaseTest';
import commonSetup from 'test_specs/commonSetup';

commonSetup();

test('login with company user type', async({ webActions, loginPage }) => {
    console.log('logged in successfully');
    let title = await webActions.getPageTitle();
    await webActions.delay(2000);
    await loginPage.verifyPageTitle(title); 
});