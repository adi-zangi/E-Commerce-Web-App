/**
 * Tests the SearchResultsOptionsMenu component
 */

import { Builder, Browser, By, WebDriver } from 'selenium-webdriver';
import env from '../../env.json';

const clientPort = env.CLIENT_PORT || 3000;
const appUrl = `http://localhost:${clientPort}`;

describe('Search Results Options Tests', () => {
   let driver : WebDriver;

   beforeAll(async () => {
      driver = await new Builder().forBrowser(Browser.CHROME).build();
      await driver.manage().setTimeouts({implicit: 500});
   }, 10000);

   afterAll(async () => {
      await driver.quit();
   });

   it('verifies that the sort select menu is present in the search results page and has 3 options', async () => {
      await driver.get(`${appUrl}/results/category/?c=Pencils`);

      let sortSelect = await driver.findElement(By.id('sortBtn'));
      await sortSelect.click();
      let sortMenu = await driver.findElement(By.css('ul'));
      let menuOptions = await sortMenu.findElements(By.css('li'));
      expect(menuOptions).toHaveLength(3);
   });

   it("verifies that the selected sort option is 'relevance' when a new search is made", async () => {
      await driver.get(appUrl);

      // Makes a search
      let searchInput = await driver.findElement(By.id('searchInput'));
      let searchButton = await driver.findElement(By.id('searchBtn'));
      await searchInput.sendKeys('pencils');
      await searchButton.click();
      
      // Verifies that 'relevance' is selected
      let sortSelect = await driver.findElement(By.id('sortBtn'));
      let selected = await sortSelect.getText();
      expect(selected).toBe('Sort by: Relevance');
   });

   it('verifies that selecting a sort option makes the url change', async () => {
      await driver.get(`${appUrl}/results/category/?c=Pencils`);
      
      // Selects the second sort option and verifies that the url contains the sort option
      const sortSelect = await driver.findElement(By.id('sortBtn'));
      await sortSelect.click();
      const sortMenu = await driver.findElement(By.css('ul'));
      const menuOptions = await sortMenu.findElements(By.css('li'));
      let secondOption = menuOptions[1];
      await secondOption.click();
      const url = await driver.getCurrentUrl();
      expect(url).toBe(`${appUrl}/results/category/?c=Pencils&sort=Price%2C+low+to+high`);
   });

   it("verifies that the selected sort option resets to 'relevance' when multiple searches are made", async () => {
      await driver.get(`${appUrl}/results/category/?c=Pencils`);
      
      // Selects to sort by 'price, low to high'
      const sortSelect = await driver.findElement(By.id('sortBtn'));
      await sortSelect.click();
      let sortMenu = await driver.findElement(By.css('ul'));
      let menuOptions = await sortMenu.findElements(By.css('li'));
      let secondOption = menuOptions[1];
      await secondOption.click();
      const url = await driver.getCurrentUrl();
      expect(url).toBe(`${appUrl}/results/category/?c=Pencils&sort=Price%2C+low+to+high`);

      // Makes a search
      const searchInput = await driver.findElement(By.id('searchInput'));
      const searchButton = await driver.findElement(By.id('searchBtn'));
      await searchInput.clear();
      await searchInput.sendKeys('books');
      await searchButton.click();

      // Verifies that 'relevance' is selected
      const secondSortSelect = await driver.findElement(By.id('sortBtn'));
      const selected = await secondSortSelect.getText();
      expect(selected).toBe('Sort by: Relevance'); 
   });

   it('verifies that the selected sort option stays the same after the page refreshes', async () => {
      await driver.get(`${appUrl}/results/category/?c=Pencils`);
      let sortSelect;
      let selected;
      
      // Selects to sort by 'price, low to high'
      sortSelect = await driver.findElement(By.id('sortBtn'));
      await sortSelect.click();
      let sortMenu = await driver.findElement(By.css('ul'));
      let menuOptions = await sortMenu.findElements(By.css('li'));
      let secondOption = menuOptions[1];
      await secondOption.click();
      sortSelect = await driver.findElement(By.id('sortBtn'));
      selected = await sortSelect.getText();
      expect(selected).toBe('Sort by: Price, low to high');

      // Refreshes the page
      driver.navigate().refresh();

      // Verifies that 'price, low to high' is selected
      sortSelect = await driver.findElement(By.id('sortBtn'));
      selected = await sortSelect.getText();
      expect(selected).toBe('Sort by: Price, low to high');
   });
});