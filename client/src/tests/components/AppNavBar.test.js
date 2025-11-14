/**
 * Tests the AppNavBar component
 */

import { Builder, Browser, By } from 'selenium-webdriver';
import env from '../../env.json';

const clientPort = env.CLIENT_PORT || 3000;
const appUrl = `http://localhost:${clientPort}`;

describe('App Navigation Bar Tests', () => {
   let driver;

   beforeAll(async () => {
      driver = await new Builder().forBrowser(Browser.CHROME).build();
      await driver.manage().setTimeouts({implicit: 500});
   });

   afterAll(async () => {
      await driver.quit();
   });

   it('verifies the app logo button navigates to the homepage', async () => {
      await driver.get(appUrl);
      let logoButton = await driver.findElement(By.id('logoBtn'));
      await logoButton.click();
      let url = await driver.getCurrentUrl();
      expect(url).toBe(`${appUrl}/`);
   });

   it('verifies the sign in button navigates to the sign in page', async () => {
      await driver.get(appUrl);
      let logInButton = await driver.findElement(By.id('logInBtn'));
      await logInButton.click();
      let url = await driver.getCurrentUrl();
      expect(url).toBe(`${appUrl}/login`);
   });
});
