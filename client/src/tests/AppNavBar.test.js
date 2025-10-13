/**
 * Tests the AppNavBar component
 */

import { Builder, Browser, By } from 'selenium-webdriver';
import env from '../env.json';

const clientPort = env.CLIENT_PORT || 3000;
const appUrl = `http://localhost:${clientPort}`;

describe('App Navigation Bar Tests', () => {
   let driver;

   beforeAll(async () => {
      driver = await new Builder().forBrowser(Browser.CHROME).build();
   });

   afterAll(async () => {
      await driver.quit();
   });

   it('verifies the app logo button navigates to the homepage', async () => {
      await driver.get(appUrl);
      let logoButtonArray = await driver.findElements(By.id('logoBtn'));
      expect(logoButtonArray).toHaveLength(1);
      let logoButton = logoButtonArray[0];
      await logoButton.click();
      let url = await driver.getCurrentUrl();
      expect(url).toBe(`${appUrl}/`);
   });

   it('verifies the sign in button navigates to the sign in page', async () => {
      await driver.get(appUrl);
      let logInButtonArray = await driver.findElements(By.id('logInBtn'));
      expect(logInButtonArray).toHaveLength(1);
      let logInButton = logInButtonArray[0];
      await logInButton.click();
      let url = await driver.getCurrentUrl();
      expect(url).toBe(`${appUrl}/login`);
   });
});
