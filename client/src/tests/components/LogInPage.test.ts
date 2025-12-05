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
      let createUserLink = await createUserDiv.findElement(By.css('a'));
      await createUserLink.click();
      let url = await driver.getCurrentUrl();
      expect(url).toBe(`${appUrl}/signup`);
   });

   it('verifies logging in with empty credentials shows an email error', async () => {
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

   it('verifies logging in with an invalid email shows an email error', async () => {
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

   it('verifies logging in with a valid email and an empty password shows a password error', async () => {
      await driver.get(`${appUrl}/login`);
      let emailInput = await driver.findElement(By.id('loginEmailInput'));
      await emailInput.sendKeys('test1@gmail.com');
      let submitLogInButton = await driver.findElement(By.id('submitLogInBtn'));
      await submitLogInButton.click();

      // The page doesn't change
      let url = await driver.getCurrentUrl();
      expect(url).toBe(`${appUrl}/login`);

      // An email error doesn't show
      let emailField = await driver.findElement(By.id('loginEmailField'));
      let emailFieldText = await emailField.getText();
      expect(emailFieldText).toBe('');

      // A password error shows
      let passField = await driver.findElement(By.id('loginPassField'));
      let passFieldText = await passField.getText();
      expect(passFieldText).toBe('Enter your password');
   });

   it('verifies logging in with a valid email and an invalid password shows a password error', async () => {
      await driver.get(`${appUrl}/login`);
      let emailInput = await driver.findElement(By.id('loginEmailInput'));
      await emailInput.sendKeys('test1@gmail.com');
      let passwordInput = await driver.findElement(By.id('loginPassInput'));
      await passwordInput.sendKeys('bla');
      let submitLogInButton = await driver.findElement(By.id('submitLogInBtn'));
      await submitLogInButton.click();

      // The page doesn't change
      let url = await driver.getCurrentUrl();
      expect(url).toBe(`${appUrl}/login`);

      // An email error doesn't show
      let emailField = await driver.findElement(By.id('loginEmailField'));
      let emailFieldText = await emailField.getText();
      expect(emailFieldText).toBe('');

      // A password error shows
      let passField = await driver.findElement(By.id('loginPassField'));
      let passFieldText = await passField.getText();
      expect(passFieldText).toBe('This password is incorrect. Please try again.');
   });

   it('verifies attempting to log in more than 5 times with a valid email locks the account', async () => {
      await driver.get(`${appUrl}/login`);
      let emailInput = await driver.findElement(By.id('loginEmailInput'));
      await emailInput.sendKeys('test2@gmail.com');
      let passwordInput = await driver.findElement(By.id('loginPassInput'));
      await passwordInput.sendKeys('bla');
      let submitLogInButton = await driver.findElement(By.id('submitLogInBtn'));

      // Submits the login form 6 times
      for (let i = 0; i < 6; i++) {
         await submitLogInButton.click();
      }

      // The page doesn't change
      let url = await driver.getCurrentUrl();
      expect(url).toBe(`${appUrl}/login`);

      // An email error doesn't show
      let emailField = await driver.findElement(By.id('loginEmailField'));
      let emailFieldText = await emailField.getText();
      expect(emailFieldText).toBe('');

      // A password error shows
      let passField = await driver.findElement(By.id('loginPassField'));
      let passFieldText = await passField.getText();
      expect(passFieldText).toBe('Too many login attempts for this user. Please try again in 15 minutes.');
   });
});
