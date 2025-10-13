/**
 * Tests the SearchBox component
 */

import { Builder, Browser, By } from 'selenium-webdriver';
import env from '../env.json';

const clientPort = env.CLIENT_PORT || 3000;
const appUrl = `http://localhost:${clientPort}`;

describe('Search Box Tests', () => {
   let driver;

   beforeAll(async () => {
      driver = await new Builder().forBrowser(Browser.CHROME).build();
   });

   afterAll(async () => {
      await driver.quit();
   });

   it('navigates to the homepage and verifies the search box is present', async () => {
      await driver.get(appUrl);
      let searchInputArray = await driver.findElements(By.id('searchInput'));
      expect(searchInputArray).toHaveLength(1);
      let searchButtonArray = await driver.findElements(By.id('searchBtn'));
      expect(searchButtonArray).toHaveLength(1);
   });
});
