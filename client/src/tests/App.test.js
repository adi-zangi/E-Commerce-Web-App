/**
 * Tests the App component
 */

import { Builder, Browser } from 'selenium-webdriver';
import env from '../env.json';

const clientPort = env.CLIENT_PORT || 3000;
const appUrl = `http://localhost:${clientPort}`;

describe('App Component Tests', () => {
   let driver;

   beforeAll(async () => {
      driver = await new Builder().forBrowser(Browser.CHROME).build();
   });

   afterAll(async () => {
      await driver.quit();
   });

   it('navigates to the homepage and verifies title', async () => {
      await driver.get(appUrl);
      const title = await driver.getTitle();
      expect(title).toBe('React App');
   });
});
