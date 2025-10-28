/**
 * Tests the App component
 */

import { Builder, Browser, By } from 'selenium-webdriver';
import env from '../env.json';

const clientPort = env.CLIENT_PORT || 3000;
const appUrl = `http://localhost:${clientPort}`;

describe('App Component Tests', () => {
   let driver;

   beforeAll(async () => {
      driver = await new Builder().forBrowser(Browser.CHROME).build();
      await driver.manage().setTimeouts({implicit: 500});
   });

   afterAll(async () => {
      await driver.quit();
   });

   it('navigates to the homepage and verifies title', async () => {
      await driver.get(appUrl);
      const title = await driver.getTitle();
      expect(title).toBe('React App');
   });

   it('navigates to an unknown route and verifies an error page shows', async () => {
      await driver.get(`${appUrl}/bla`);
      let header = await driver.findElement(By.tagName('h1'));
      let headerText = await header.getText();
      expect(headerText).toBe('404');
   });
});
