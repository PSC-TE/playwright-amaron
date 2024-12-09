import test from '@lib/BaseTest';
import commonSetup from 'test_specs/commonSetup';
import { testConfig } from 'testConfig';

commonSetup();

test('test status and serial number of a registered product', async ({ loginPage, prsPage, productStatusPage }) => {
  await loginPage.clickProductRegistrationTab();

  // checking status of registered batteries for a mobile number
  await prsPage.clickStatusTab();
  await productStatusPage.enterMobileNumber(testConfig.MOBILE2);
  await productStatusPage.clickCheckStatusBox();

  // verifying the product name against the clicked one
  await productStatusPage.verifyProductHeading();
  await productStatusPage.clickBatteryName(testConfig.batteryName_1);

  // verifying serial number of the product
  await productStatusPage.verifySerialNumber(testConfig.batteryName_1, testConfig.serialNo_1, testConfig.serialNo_1)
});
