import test from '@lib/BaseTest';
import commonSetup from 'test_specs/commonSetup';
import { testConfig } from 'testConfig';

commonSetup();

test('check status of the registered mobile number', async ({ loginPage, prsPage, productStatusPage }) => {
  await loginPage.clickProductRegistrationTab();
  await prsPage.clickStatusTab();
  await productStatusPage.enterMobileNumber(testConfig.MOBILE2);

  await productStatusPage.clickCheckStatusBox();
  await productStatusPage.verifyProductHeading();
});