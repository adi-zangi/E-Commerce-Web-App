/**
 * Tests the SearchResults component
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
      await driver.get(`${appUrl}/results/search/?q=blabla`);
      let resultsHeader = await driver.findElement(By.className('No-results-header'));
      let headerText = await resultsHeader.getText();
      expect(headerText).toBe('No matches found');
   });

   it('navigates to the search results for a search query and verifies the results are present', async () => {
      await driver.get(`${appUrl}/results/search/?q=${encodeURIComponent('blue pens')}`);

      // Search results are present
      let itemCardArray = await driver.findElements(By.className('Item-card'));
      expect(itemCardArray.length).toBeGreaterThan(0);

      // Page 1 is selected
      let pageInput = await driver.findElement(By.className('Page-input'));
      let pageNumber = await pageInput.getAttribute('value');
      expect(pageNumber).toBe('1');

      // The search box contains the search query
      let searchInput = await driver.findElement(By.id('searchInput'));
      let inputValue = await searchInput.getAttribute('value');
      expect(inputValue).toBe('blue pens');
   });

   it('navigates to the search results for a category and verifies the results are present', async () => {
      await driver.get(`${appUrl}/results/category/?c=Pencils`);

      // Search results are present
      let itemCardArray = await driver.findElements(By.className('Item-card'));
      expect(itemCardArray.length).toBeGreaterThan(0);

      // Page 1 is selected
      let pageInput = await driver.findElement(By.className('Page-input'));
      let pageNumber = await pageInput.getAttribute('value');
      expect(pageNumber).toBe('1');

      // The search box is empty
      let searchInput = await driver.findElement(By.id('searchInput'));
      let inputValue = await searchInput.getAttribute('value');
      expect(inputValue).toBe('');
   });

   it('verifies the page picker changes the search results page', async () => {
      await driver.get(`${appUrl}/results/category/?c=Pen`);
      let pageInput = await driver.findElement(By.className('Page-input'));
      let pageNumber;

      // Page number is 1
      pageNumber = await pageInput.getAttribute('value');
      expect(pageNumber).toBe('1');
      
      // Clicking on the page up button goes to page 2
      let pageUpButton = await driver.findElement(By.className('Page-up-btn'));
      await pageUpButton.click();
      pageNumber = await pageInput.getAttribute('value');
      expect(pageNumber).toBe('2');

      // Clicking on the page down button goes to page 1
      let pageDownButton = await driver.findElement(By.className('Page-down-btn'));
      await pageDownButton.click();
      pageNumber = await pageInput.getAttribute('value');
      expect(pageNumber).toBe('1');

      // Typing '3' into the page input and pressing enter goes to page 3
      await pageInput.clear();
      await pageInput.sendKeys('3');
      await pageInput.sendKeys(Key.ENTER);
      pageNumber = await pageInput.getAttribute('value');
      expect(pageNumber).toBe('3');

      // Typing '4' into the page input and pressing the page up button goes to page 4
      await pageInput.clear();
      await pageInput.sendKeys('4');
      await pageUpButton.click();
      pageNumber = await pageInput.getAttribute('value');
      expect(pageNumber).toBe('4');
   });

   it('verifies that making the same search twice refreshes the search results', async () => {
      await driver.get(`${appUrl}/results/category/?c=Pen`);
      let pageInput = await driver.findElement(By.className('Page-input'));
      let pageNumber;

      // Switch to page 2
      let pageUpButton = await driver.findElement(By.className('Page-up-btn'));
      await pageUpButton.click();
      pageNumber = await pageInput.getAttribute('value');
      expect(pageNumber).toBe('2');

      // Clicking on the search button changes the page to 1
      let searchButton = await driver.findElement(By.id('searchBtn'));
      await searchButton.click();
      pageNumber = await pageInput.getAttribute('value');
      expect(pageNumber).toBe('1');
   });

   it('verifies that refreshing the search results page resets the page number', async () => {
      await driver.get(`${appUrl}/results/category/?c=Pen`);
      let pageInput;
      let pageNumber;

      // Switch to page 2
      pageInput = await driver.findElement(By.className('Page-input'));
      let pageUpButton = await driver.findElement(By.className('Page-up-btn'));
      await pageUpButton.click();
      pageNumber = await pageInput.getAttribute('value');
      expect(pageNumber).toBe('2');

      // Clicking on the search button changes the page to 1
      await driver.navigate().refresh();
      pageInput = await driver.findElement(By.className('Page-input'));
      pageNumber = await pageInput.getAttribute('value');
      expect(pageNumber).toBe('1');
   });
});
