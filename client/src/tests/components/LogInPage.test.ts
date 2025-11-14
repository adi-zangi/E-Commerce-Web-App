/**
 * Tests the LogInPage component
 */

import { Builder, Browser, By, WebDriver } from 'selenium-webdriver';
import env from '../../env.json';

const clientPort = env.CLIENT_PORT || 3000;
const appUrl = `http://localhost:${clientPort}`;

describe('Log In Page Tests', () => {
   let driver : WebDriver;

   beforeAll(async () => {
      driver = await new Builder().forBrowser(Browser.CHROME).build();
      await driver.manage().setTimeouts({implicit: 500});
   }, 10000);

   afterAll(async () => {
      await driver.quit();
   });

   it('verifies the create account button navigates to the sign up page', async () => {
      await driver.get(`${appUrl}/login`);
      let createUserDiv = await driver.findElement(By.className('Create-user-link'));
      let createUserLink = await createUserDiv.findElement(By.tagName('a'));
      await createUserLink.click();
      let url = await driver.getCurrentUrl();
      expect(url).toBe(`${appUrl}/signup`);
   });

   it('verifies logging in with empty credentials shows an email error and stays on the page', async () => {
      await driver.get(`${appUrl}/login`);
      let submitLogInButton = await driver.findElement(By.id('submitLogInBtn'));
      await submitLogInButton.click();

      // The page doesn't change
      let url = await driver.getCurrentUrl();
      expect(url).toBe(`${appUrl}/login`);

      // An email error shows
      let emailField = await driver.findElement(By.id('loginEmailField'));
      let emailFieldText = await emailField.getText();
      expect(emailFieldText).toBe('Enter your email');

      // A password error doesn't show
      let passField = await driver.findElement(By.id('loginPassField'));
      let passFieldText = await passField.getText();
      expect(passFieldText).toBe('');
   });

   it('verifies logging in with an invalid email shows an email error and stays on the page', async () => {
      await driver.get(`${appUrl}/login`);
      let emailInput = await driver.findElement(By.id('loginEmailInput'));
      await emailInput.sendKeys('bla');
      let submitLogInButton = await driver.findElement(By.id('submitLogInBtn'));
      await submitLogInButton.click();

      // The page doesn't change
      let url = await driver.getCurrentUrl();
      expect(url).toBe(`${appUrl}/login`);

      // An email error shows
      let emailField = await driver.findElement(By.id('loginEmailField'));
      let emailFieldText = await emailField.getText();
      expect(emailFieldText).toBe("We couldn't find a user with this email");

      // A password error doesn't show
      let passField = await driver.findElement(By.id('loginPassField'));
      let passFieldText = await passField.getText();
      expect(passFieldText).toBe('');
   });
});
