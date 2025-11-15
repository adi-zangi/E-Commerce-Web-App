/**
 * Tests the SearchBox component
 */

import { Builder, Browser, By, WebDriver, Key } from 'selenium-webdriver';
import env from '../../env.json';

const clientPort = env.CLIENT_PORT || 3000;
const appUrl = `http://localhost:${clientPort}`;

describe('Search Box Tests', () => {
   let driver : WebDriver;

   beforeAll(async () => {
      driver = await new Builder().forBrowser(Browser.CHROME).build();
      await driver.manage().setTimeouts({implicit: 500});
   }, 10000);

   afterAll(async () => {
      await driver.quit();
   });

   it('verifies that a search can be made by clicking on the search button', async () => {
      await driver.get(appUrl);

      let searchInput = await driver.findElement(By.id('searchInput'));
      let searchButton= await driver.findElement(By.id('searchBtn'));

      // Clicking on the search button navigates to search results for the search input
      await searchInput.sendKeys('blue pens');
      await searchButton.click();
      let url = await driver.getCurrentUrl();
      expect(url).toBe(`${appUrl}/results/search/?q=blue+pens`);
   });

   it('verifies that a search can be made by pressing the enter key', async () => {
      await driver.get(appUrl);

      let searchInput = await driver.findElement(By.id('searchInput'));

      // Pressing 'enter' navigates to search results for the search input
      await searchInput.sendKeys('blue pens');
      await searchInput.sendKeys(Key.ENTER);
      let url = await driver.getCurrentUrl();
      expect(url).toBe(`${appUrl}/results/search/?q=blue+pens`);
   });
});
