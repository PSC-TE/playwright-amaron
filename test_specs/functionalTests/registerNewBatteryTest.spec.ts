import test from '@lib/BaseTest';
import commonSetup from 'test_specs/commonSetup';
import { testConfig } from 'testConfig';

commonSetup();

test('register a new battery using serial number', async ({ loginPage, prsPage, productStatusPage }) => {
  await loginPage.clickProductRegistrationTab();

  // checking status of registered batteries for a mobile number
  await prsPage.clickStatusTab();
  await productStatusPage.enterMobileNumber(testConfig.MOBILE2);
  await productStatusPage.clickCheckStatusBox();

  // verifying the product name against the clicked one
  await productStatusPage.verifyProductHeading();
  await productStatusPage.clickBatteryName(testConfig.batteryName_1);

  // verifying serial number of the product
  await productStatusPage.verifySerialNumber(testConfig.batteryName_1, testConfig.serialNo_1, testConfig.serialNo_1);

  await productStatusPage.deleteButtonVisible();

  await productStatusPage.clickRegistrationTab();

//   selecting vehical category
  await prsPage.clickOnSelectedCategoryTab(/^Two Wheeler$/);

//   verifying that register button is currently disabled
  await prsPage.verifyRegisterButtonIsDisabled();

//   filling all necessary details for registering new battery
  await prsPage.registerBatteryWtihSerialNo(testConfig.batteryReg1, testConfig.vehicalNo, testConfig.MOBILE3);

//   verifying that register button is enabled after filling all necessary details
  await prsPage.verifyRegisterButtonIsEnabled();
});
