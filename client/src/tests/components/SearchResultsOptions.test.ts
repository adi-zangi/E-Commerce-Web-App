/**
 * Tests the SearchResultsOptionsMenu component
 */

import { Builder, Browser, By, WebDriver } from 'selenium-webdriver';
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

   it("verifies that the selected sort option resets to 'relevance' when multiple searches are made", async () => {
      await driver.get(appUrl);

      let searchInput;
      let searchButton;
      let selected;

      // Makes a search
      searchInput = await driver.findElement(By.id('searchInput'));
      searchButton = await driver.findElement(By.id('searchBtn'));
      await searchInput.sendKeys('pencils');
      await searchButton.click();
      
      // Selects to sort by 'price, low to high'
      const firstSortSelect = await driver.findElement(By.id('sortBtn'));
      await firstSortSelect.click();
      let sortMenu = await driver.findElement(By.css('ul'));
      let menuOptions = await sortMenu.findElements(By.css('li'));
      let secondOption = menuOptions[1];
      await secondOption.click();
      const secondSortSelect = await driver.findElement(By.id('sortBtn'));
      selected = await secondSortSelect.getText();
      expect(selected).toBe('Sort by: Price, low to high');

      // Makes another search
      searchInput = await driver.findElement(By.id('searchInput'));
      searchButton = await driver.findElement(By.id('searchBtn'));
      await searchInput.clear();
      await searchInput.sendKeys('books');
      await searchButton.click();

      // Verifies that 'relevance' is selected
      const thirdSortSelect = await driver.findElement(By.id('sortBtn'));
      selected = await thirdSortSelect.getText();
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

   it('verifies that selecting a sort option makes the url change', async () => {
      await driver.get(`${appUrl}/results/category/?c=Pencils`);

      let sortMenu;
      let menuOptions;
      let urlParams;

      // Selects the first sort option and verifies that the url contains the sort option
      const firstSortSelect = await driver.findElement(By.id('sortBtn'));
      await firstSortSelect.click();
      sortMenu = await driver.findElement(By.css('ul'));
      let firstOption = await sortMenu.findElement(By.css('li'));
      await firstOption.click();
      const firstUrl = await driver.getCurrentUrl();
      expect(firstUrl).toBe(`${appUrl}/results/category/?c=Pencils&sort=Relevance`);
      
      // Selects the second sort option and verifies that the url contains the sort option
      const secondSortSelect = await driver.findElement(By.id('sortBtn'));
      await secondSortSelect.click();
      sortMenu = await driver.findElement(By.css('ul'));
      menuOptions = await sortMenu.findElements(By.css('li'));
      let secondOption = menuOptions[1];
      await secondOption.click();
      const secondUrl = await driver.getCurrentUrl();
      urlParams = new URLSearchParams(secondUrl);
      expect(urlParams.get('sort')).toBe('Price, low to high');

      // Selects the second sort option and verifies that the url contains the sort option
      const thirdSortSelect = await driver.findElement(By.id('sortBtn'));
      await thirdSortSelect.click();
      sortMenu = await driver.findElement(By.css('ul'));
      menuOptions = await sortMenu.findElements(By.css('li'));
      let thirdOption = menuOptions[2];
      await thirdOption.click();
      const thirdUrl = await driver.getCurrentUrl();
      urlParams = new URLSearchParams(thirdUrl);
      expect(urlParams.get('sort')).toBe('Price, high to low');
   });

   it('verifies that selecting a sort option makes that option show as the selected option', async () => {
      await driver.get(`${appUrl}/results/category/?c=Pencils`);

      let sortMenu;
      let menuOptions;
      let selected;

      // Selects the first sort option and verifies that 'relevance' is selected
      let firstSortSelect = await driver.findElement(By.id('sortBtn'));
      await firstSortSelect.click();
      sortMenu = await driver.findElement(By.css('ul'));
      let firstOption = await sortMenu.findElement(By.css('li'));
      await firstOption.click();
      const secondSortSelect = await driver.findElement(By.id('sortBtn'));
      selected = await secondSortSelect.getText();
      expect(selected).toBe('Sort by: Relevance');
      
      // Selects the second sort option and verifies that 'price, low to high' is selected
      const thirdSortSelect = await driver.findElement(By.id('sortBtn'));
      await thirdSortSelect.click();
      sortMenu = await driver.findElement(By.css('ul'));
      menuOptions = await sortMenu.findElements(By.css('li'));
      let secondOption = menuOptions[1];
      await secondOption.click();
      const fourthSortSelect = await driver.findElement(By.id('sortBtn'));
      selected = await fourthSortSelect.getText();
      expect(selected).toBe('Sort by: Price, low to high');

      // Selects the second sort option and verifies that 'price, high to low' is selected
      const fifthSortSelect = await driver.findElement(By.id('sortBtn'));
      await fifthSortSelect.click();
      sortMenu = await driver.findElement(By.css('ul'));
      menuOptions = await sortMenu.findElements(By.css('li'));
      let thirdOption = menuOptions[2];
      await thirdOption.click();
      const sixthSortSelect = await driver.findElement(By.id('sortBtn'));
      selected = await sixthSortSelect.getText();
      expect(selected).toBe('Sort by: Price, high to low');
   });
});