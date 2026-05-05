/**
 * Tests the HomePage component
 */

import { Builder, Browser, By, WebDriver } from 'selenium-webdriver';
import env from '../../env.json';

const clientPort = env.CLIENT_PORT || 3000;
const appUrl = `http://localhost:${clientPort}`;

describe('Home Page Tests', () => {
   let driver : WebDriver;

   beforeAll(async () => {
      driver = await new Builder().forBrowser(Browser.CHROME).build();
      await driver.manage().setTimeouts({implicit: 500});
   }, 10000);

   afterAll(async () => {
      await driver.quit();
   });

   it('navigates to the homepage and verifies the page content is present', async () => {
      await driver.get(appUrl);
      let heroArray = await driver.findElements(By.className('hero'));
      expect(heroArray).toHaveLength(1);
      let categoriesArray = await driver.findElements(By.className('categories'));
      expect(categoriesArray).toHaveLength(1);
      let bannerArray = await driver.findElements(By.className('banner'));
      expect(bannerArray).toHaveLength(1);
   });

   it('verifies that clicking on the category buttons displays products', async () => {
      await driver.get(appUrl);
      let categoriesArray = await driver.findElements(By.className('cat-card'));
      expect(categoriesArray.length).toBeGreaterThan(0);

      // Clicks on every category button
      for (let i = 0; i < categoriesArray.length; i++) {
         let category = categoriesArray[i];
         let categoryText = await category.getText();
         await category.click();

         // The URL contains the category name
         let url = await driver.getCurrentUrl();
         let expectedParams = encodeURIComponent(categoryText);
         expect(url).toBe(`${appUrl}/results/category?c=${expectedParams}`);

         // There are items showing in the results 
         let itemCards = await driver.findElements(By.className('Item-card'));
         expect(itemCards.length).toBeGreaterThan(0);

         // Goes back to click on other categories
         await driver.executeScript("window.history.back()");
         categoriesArray = await driver.findElements(By.className('cat-card'));
      }
   });
});
