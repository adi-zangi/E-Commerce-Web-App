import { Builder, Browser, By, WebDriver, Key } from 'selenium-webdriver';
import env from '../../env.json';
import { ConsoleLogEntry } from 'selenium-webdriver/bidi/logEntries';

const clientPort = env.CLIENT_PORT || 3000;
const appUrl = `http://localhost:${clientPort}`;

describe('Search Autocomplete Tests', () => {
   let driver : WebDriver;

   beforeAll(async () => {
      driver = await new Builder().forBrowser(Browser.CHROME).build();
      await driver.manage().setTimeouts({implicit: 500});
   }, 10000);

   afterAll(async () => {
      await driver.quit();
   });

   it('verifies that search suggestions do not show when the search box is empty', async () => {
      await driver.get(appUrl);
      let autocompleteMenuArray = await driver.findElements(By.className('Search-autocomplete-menu'));
      expect(autocompleteMenuArray).toHaveLength(0);
   });

   it('verifies that search suggestions show when the search box has relevant text', async () => {
      await driver.get(appUrl);

      let searchInput = await driver.findElement(By.id('searchInput'));

      // Entering a key shows autocomplete suggestions
      await searchInput.sendKeys('p');
      let autocompleteMenuArray = await driver.findElements(By.className('Search-autocomplete-menu'));
      expect(autocompleteMenuArray).toHaveLength(1);
      let autocompleteMenu = autocompleteMenuArray[0];
      let searchSuggestionsArray = await autocompleteMenu.findElements(By.css('button'));
      expect(searchSuggestionsArray).toHaveLength(6);
   });

   it('verifies that search suggestions disappear when the search box becomes empty', async () => {
      await driver.get(appUrl);

      let searchInput = await driver.findElement(By.id('searchInput'));
      let autocompleteMenuArray;

      // Entering a key shows autocomplete suggestions
      await searchInput.sendKeys('p');
      autocompleteMenuArray = await driver.findElements(By.className('Search-autocomplete-menu'));
      expect(autocompleteMenuArray).toHaveLength(1);

      // Clearing the search box makes the autocomplete suggestions disappear
      await searchInput.sendKeys(Key.BACK_SPACE);
      autocompleteMenuArray = await driver.findElements(By.className('Search-autocomplete-menu'));
      expect(autocompleteMenuArray).toHaveLength(0);
   });

   it('verifies that clicking on a search suggestion makes a search', async () => {
      await driver.get(appUrl);

      let searchInput = await driver.findElement(By.id('searchInput'));

      // Clicking on the first autocomplete suggestion navigates to search results for the suggestion
      await searchInput.sendKeys('p');
      let autocompleteMenu = await driver.findElement(By.className('Search-autocomplete-menu'));
      let firstSuggestion = await autocompleteMenu.findElement(By.css('button'));
      let suggestionText = await firstSuggestion.getText();
      await firstSuggestion.click();

      let url = await driver.getCurrentUrl();
      let urlParams = suggestionText.replaceAll(/\s/g, "+");
      expect(url).toBe(`${appUrl}/results/search/?q=${urlParams}`);
   });

   it('verifies that making a search makes the search suggestions disappear', async () => {
      await driver.get(appUrl);

      let searchInput = await driver.findElement(By.id('searchInput'));
      let autocompleteMenu;
      let autocompleteMenuArray;

      // Clicking on the search button makes the suggestions disappear
      await searchInput.sendKeys('pen');
      autocompleteMenuArray = await driver.findElements(By.className('Search-autocomplete-menu'));
      expect(autocompleteMenuArray).toHaveLength(1);
      let searchButton = await driver.findElement(By.id('searchBtn'));
      await searchButton.click();
      autocompleteMenuArray = await driver.findElements(By.className('Search-autocomplete-menu'));
      expect(autocompleteMenuArray).toHaveLength(0);

      // Pressing 'enter' in the search box makes the suggestions disappear
      await searchInput.clear();
      await searchInput.sendKeys('pen');
      autocompleteMenuArray = await driver.findElements(By.className('Search-autocomplete-menu'));
      expect(autocompleteMenuArray).toHaveLength(1);
      await searchInput.sendKeys(Key.ENTER);
      autocompleteMenuArray = await driver.findElements(By.className('Search-autocomplete-menu'));
      expect(autocompleteMenuArray).toHaveLength(0);
      
      // Clicking on an autocomplete suggestion makes the suggestions disappear
      await searchInput.clear();
      await searchInput.sendKeys('p');
      autocompleteMenu = await driver.findElement(By.className('Search-autocomplete-menu'));
      let firstSuggestion = await autocompleteMenu.findElement(By.css('button'));
      await firstSuggestion.click();
      autocompleteMenuArray = await driver.findElements(By.className('Search-autocomplete-menu'));
      expect(autocompleteMenuArray).toHaveLength(0);
   });

   it('verifies that clicking outside of the search section makes the search suggestions disappear', async () => {
      await driver.get(`${appUrl}/results/category/?c=Pen`);

      let searchInput = await driver.findElement(By.id('searchInput'));
      let autocompleteMenuArray;

      // Entering a key shows autocomplete suggestions
      await searchInput.sendKeys('p');
      autocompleteMenuArray = await driver.findElements(By.className('Search-autocomplete-menu'));
      expect(autocompleteMenuArray).toHaveLength(1);

      // Clicking on the page up button makes the autocomplete suggestions disappear
      let pageUpButton = await driver.findElement(By.className('Page-up-btn'));
      await pageUpButton.click();
      autocompleteMenuArray = await driver.findElements(By.className('Search-autocomplete-menu'));
      expect(autocompleteMenuArray).toHaveLength(0);

      // Entering a key shows autocomplete suggestions
      await searchInput.sendKeys('p');
      autocompleteMenuArray = await driver.findElements(By.className('Search-autocomplete-menu'));
      expect(autocompleteMenuArray).toHaveLength(1);

      // Clicking on the app logo makes the autocomplete suggestions disappear
      let logoButton = await driver.findElement(By.id('logoBtn'));
      await logoButton.click();
      autocompleteMenuArray = await driver.findElements(By.className('Search-autocomplete-menu'));
      expect(autocompleteMenuArray).toHaveLength(0);
   });
});