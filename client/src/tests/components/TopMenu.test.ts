/**
 * Tests the TopMenu component
 */

import { Builder, Browser, By, WebDriver } from 'selenium-webdriver';
import env from '../../env.json';

const clientPort = env.CLIENT_PORT || 3000;
const appUrl = `http://localhost:${clientPort}`;

describe('Top Menu Tests', () => {
   let driver : WebDriver;

   beforeAll(async () => {
      driver = await new Builder().forBrowser(Browser.CHROME).build();
      await driver.manage().setTimeouts({implicit: 500});
   }, 10000);

   afterAll(async () => {
      await driver.quit();
   });

   it('navigates to the homepage and verifies a product category can be selected from the top menu', async () => {
      await driver.get(appUrl);

      let topMenu = await driver.findElement(By.className('Top-menu'));

      // Department buttons are present
      let departmentButtonArray = await topMenu.findElements(By.tagName('button'));
      expect(departmentButtonArray.length).toBeGreaterThan(0);

      // First department button opens a category menu
      let firstDeptButton = departmentButtonArray[0];
      await firstDeptButton.click();
      let firstDeptMenu = await driver.findElement(By.tagName('ul'));
      let categoriesArray = await firstDeptMenu.findElements(By.tagName('li'));
      expect(categoriesArray.length).toBeGreaterThan(0);

      // Clicking on the first category navigates to search results for the category
      let firstCategory = categoriesArray[0];
      let categoryName = await firstCategory.getText();
      await firstCategory.click();
      let url = await driver.getCurrentUrl();
      expect(url).toBe(`${appUrl}/results/category/?c=${categoryName}`);
   });
});
