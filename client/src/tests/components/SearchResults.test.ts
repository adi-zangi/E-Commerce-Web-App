/**
 * Tests the SearchResultsPage component
 */

import { Builder, Browser, By, WebDriver, Key } from 'selenium-webdriver';
import env from '../../env.json';

const clientPort = env.CLIENT_PORT || 3000;
const appUrl = `http://localhost:${clientPort}`;

describe('Search Results Tests', () => {
   let driver : WebDriver;

   beforeAll(async () => {
      driver = await new Builder().forBrowser(Browser.CHROME).build();
      await driver.manage().setTimeouts({implicit: 500});
   }, 10000);

   afterAll(async () => {
      await driver.quit();
   });

   it('navigates to the search results for a no-match query and verifies the are no results', async () => {
      await driver.get(`${appUrl}/results/search?q=blabla`);
      let resultsHeader = await driver.findElement(By.className('No-results-header'));
      let headerText = await resultsHeader.getText();
      expect(headerText).toBe('No matches found');
   });

   it('navigates to the search results for a search query and verifies the results are present', async () => {
      await driver.get(`${appUrl}/results/search?q=${encodeURIComponent('blue pens')}`);

      // Search results are present
      let itemCardArray = await driver.findElements(By.className('Item-card'));
      expect(itemCardArray.length).toBeGreaterThan(0);

      // Page 1 is selected
      let pageSection = await driver.findElement(By.className('Page-text'));
      let pageText = await pageSection.getText();
      let pageNumber = pageText.split(/\s+/)[1];
      expect(pageNumber).toBe('1');

      // The search box contains the search query
      let searchInput = await driver.findElement(By.id('searchInput'));
      let inputValue = await searchInput.getAttribute('value');
      expect(inputValue).toBe('blue pens');
   });

   it('navigates to the search results for a category and verifies the results are present', async () => {
      await driver.get(`${appUrl}/results/category?c=Pencils`);

      // Search results are present
      let itemCardArray = await driver.findElements(By.className('Item-card'));
      expect(itemCardArray.length).toBeGreaterThan(0);

      // Page 1 is selected
      let pageSection = await driver.findElement(By.className('Page-text'));
      let pageText = await pageSection.getText();
      let pageNumber = pageText.split(/\s+/)[1];
      expect(pageNumber).toBe('1');

      // The search box is empty
      let searchInput = await driver.findElement(By.id('searchInput'));
      let inputValue = await searchInput.getAttribute('value');
      expect(inputValue).toBe('');
   });

   it('verifies the page picker changes the search results page', async () => {
      await driver.get(`${appUrl}/results/search?q=pen`);
      let pageSection = await driver.findElement(By.className('Page-text'));
      let pageText;
      let pageNumber;

      // Page number is 1
      pageText = await pageSection.getText();
      pageNumber = pageText.split(/\s+/)[1];
      expect(pageNumber).toBe('1');
      
      // Clicking on the page up button goes to page 2
      let pageUpButton = await driver.findElement(By.className('Page-up-btn'));
      await pageUpButton.click();
      pageText = await pageSection.getText();
      pageNumber = pageText.split(/\s+/)[1];
      expect(pageNumber).toBe('2');

      // Clicking on the page down button goes to page 1
      let pageDownButton = await driver.findElement(By.className('Page-down-btn'));
      await pageDownButton.click();
      pageText = await pageSection.getText();
      pageNumber = pageText.split(/\s+/)[1];
      expect(pageNumber).toBe('1');
   });

   it('verifies that making the same search twice refreshes the search results', async () => {
      await driver.get(`${appUrl}/results/search?q=pen`);
      let pageSection;
      let pageText;
      let pageNumber;

      // Switch to page 2
      let pageUpButton = await driver.findElement(By.className('Page-up-btn'));
      await pageUpButton.click();
      pageSection = await driver.findElement(By.className('Page-text'));
      pageText = await pageSection.getText();
      pageNumber = pageText.split(/\s+/)[1];
      expect(pageNumber).toBe('2');

      // Click on the search button
      let searchButton = await driver.findElement(By.id('searchBtn'));
      await searchButton.click();

      // The page number is 1
      pageSection = await driver.findElement(By.className('Page-text'));
      pageText = await pageSection.getText();
      pageNumber = pageText.split(/\s+/)[1];
      expect(pageNumber).toBe('1');
   });

   it('verifies that refreshing the search results page resets the page number', async () => {
      await driver.get(`${appUrl}/results/search?q=pen`);
      let pageSection;
      let pageText;
      let pageNumber;

      // Switch to page 2
      pageSection = await driver.findElement(By.className('Page-text'));
      let pageUpButton = await driver.findElement(By.className('Page-up-btn'));
      await pageUpButton.click();
      pageText = await pageSection.getText();
      pageNumber = pageText.split(/\s+/)[1];
      expect(pageNumber).toBe('2');

      // Clicking on the search button changes the page to 1
      await driver.navigate().refresh();
      pageSection = await driver.findElement(By.className('Page-text'));
      pageText = await pageSection.getText();
      pageNumber = pageText.split(/\s+/)[1];
      expect(pageNumber).toBe('1');
   });
});
