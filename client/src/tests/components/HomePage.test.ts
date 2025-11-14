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
      let appHeaderArray = await driver.findElements(By.className('App-header'));
      expect(appHeaderArray).toHaveLength(1);
   });
});
