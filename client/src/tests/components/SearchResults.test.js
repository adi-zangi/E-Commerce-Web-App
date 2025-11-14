/**
 * Tests the SearchResults component
 */

import { Builder, Browser, By } from 'selenium-webdriver';
import env from '../../env.json';

const clientPort = env.CLIENT_PORT || 3000;
const appUrl = `http://localhost:${clientPort}`;

describe('Search Results Tests', () => {
   let driver;

   beforeAll(async () => {
      driver = await new Builder().forBrowser(Browser.CHROME).build();
      await driver.manage().setTimeouts({implicit: 500});
   });

   afterAll(async () => {
      await driver.quit();
   });

   it('navigates to the search results for a no-match query and verifies the are no results', async () => {
      await driver.get(`${appUrl}/results/search/?q=blabla`);
      let resultsHeader = await driver.findElement(By.className('No-results-header'));
      let headerText = await resultsHeader.getText();
      expect(headerText).toBe('No matches found');
   });

   it('navigates to the search results for a search query and verifies the results are present', async () => {
      await driver.get(`${appUrl}/results/search/?q=blue+pens`);
      let itemCardArray = await driver.findElements(By.className('Item-card'));
      expect(itemCardArray.length).toBeGreaterThan(0);
      let pageInput = await driver.findElement(By.className('Page-input'));
      let pageNumber = await pageInput.getAttribute('value');
      expect(pageNumber).toBe('1');
   });

   it('navigates to the search results for a category and verifies the results are present', async () => {
      await driver.get(`${appUrl}/results/category/?c=Pencils`);
      let itemCardArray = await driver.findElements(By.className('Item-card'));
      expect(itemCardArray.length).toBeGreaterThan(0);
      let pageInput = await driver.findElement(By.className('Page-input'));
      let pageNumber = await pageInput.getAttribute('value');
      expect(pageNumber).toBe('1');
   });
});
