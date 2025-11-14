/**
 * Tests the CreateUserPage component
 */

import { Builder, Browser, By, WebDriver } from 'selenium-webdriver';
import env from '../../env.json';

const clientPort = env.CLIENT_PORT || 3000;
const appUrl = `http://localhost:${clientPort}`;

describe('Create User Page Tests', () => {
   let driver : WebDriver;

   beforeAll(async () => {
      driver = await new Builder().forBrowser(Browser.CHROME).build();
      await driver.manage().setTimeouts({implicit: 500});
   }, 10000);

   afterAll(async () => {
      await driver.quit();
   });

   it('verifies submitting the form with empty fields shows an error and stays on the page', async () => {
      await driver.get(`${appUrl}/signup`);
      let submitCreateUserButtonArray = await driver.findElements(By.id('submitCreateUserBtn'));
      expect(submitCreateUserButtonArray).toHaveLength(1);
      let submitCreateUserButton = submitCreateUserButtonArray[0];
      await submitCreateUserButton.click();

      // The page doesn't change
      let url = await driver.getCurrentUrl();
      expect(url).toBe(`${appUrl}/signup`);

      // An error shows for the email field
      let emailField = await driver.findElement(By.id('signupEmailField'));
      let emailFieldText = await emailField.getText();
      expect(emailFieldText).toBe('Email cannot be blank');

      // An error shows for the first name field
      let firstNameField = await driver.findElement(By.id('signupFirstNameField'));
      let firstNameFieldText = await firstNameField.getText();
      expect(firstNameFieldText).toBe('First name cannot be blank');

      // An error shows for the last name field
      let lastNameField = await driver.findElement(By.id('signupLastNameField'));
      let lastNameFieldText = await lastNameField.getText();
      expect(lastNameFieldText).toBe('Last name cannot be blank');

      // An error shows for the password field
      let passField = await driver.findElement(By.id('signupPassField'));
      let passFieldText = await passField.getText();
      expect(passFieldText).toBe('Password cannot be blank');
   });

   it('verifies submitting the form with an invalid email shows an error and stays on the page', async () => {
      await driver.get(`${appUrl}/signup`);
      let emailInput = await driver.findElement(By.id('signupEmailInput'));
      emailInput.sendKeys('bla');
      let submitCreateUserButtonArray = await driver.findElements(By.id('submitCreateUserBtn'));
      expect(submitCreateUserButtonArray).toHaveLength(1);
      let submitCreateUserButton = submitCreateUserButtonArray[0];
      await submitCreateUserButton.click();

      // The page doesn't change
      let url = await driver.getCurrentUrl();
      expect(url).toBe(`${appUrl}/signup`);

      // An error shows for the email field
      let emailField = await driver.findElement(By.id('signupEmailField'));
      let emailFieldText = await emailField.getText();
      expect(emailFieldText).toBe('Invalid email');

      // An error shows for the first name field
      let firstNameField = await driver.findElement(By.id('signupFirstNameField'));
      let firstNameFieldText = await firstNameField.getText();
      expect(firstNameFieldText).toBe('First name cannot be blank');

      // An error shows for the last name field
      let lastNameField = await driver.findElement(By.id('signupLastNameField'));
      let lastNameFieldText = await lastNameField.getText();
      expect(lastNameFieldText).toBe('Last name cannot be blank');

      // An error shows for the password field
      let passField = await driver.findElement(By.id('signupPassField'));
      let passFieldText = await passField.getText();
      expect(passFieldText).toBe('Password cannot be blank');
   });

   it('verifies that populated first and last name fields do not show errors', async () => {
      await driver.get(`${appUrl}/signup`);
      let firstNameInput = await driver.findElement(By.id('signupFirstNameInput'));
      let lastNameInput = await driver.findElement(By.id('signupLastNameInput'));
      firstNameInput.sendKeys('bla');
      lastNameInput.sendKeys('bla');
      let submitCreateUserButtonArray = await driver.findElements(By.id('submitCreateUserBtn'));
      expect(submitCreateUserButtonArray).toHaveLength(1);
      let submitCreateUserButton = submitCreateUserButtonArray[0];
      await submitCreateUserButton.click();

      // The page doesn't change
      let url = await driver.getCurrentUrl();
      expect(url).toBe(`${appUrl}/signup`);

      // An error shows for the email field
      let emailField = await driver.findElement(By.id('signupEmailField'));
      let emailFieldText = await emailField.getText();
      expect(emailFieldText).toBe('Email cannot be blank');

      // An error doesn't show for the first name field
      let firstNameField = await driver.findElement(By.id('signupFirstNameField'));
      let firstNameFieldText = await firstNameField.getText();
      expect(firstNameFieldText).toBe('');

      // An error doesn't show for the last name field
      let lastNameField = await driver.findElement(By.id('signupLastNameField'));
      let lastNameFieldText = await lastNameField.getText();
      expect(lastNameFieldText).toBe('');

      // An error shows for the password field
      let passField = await driver.findElement(By.id('signupPassField'));
      let passFieldText = await passField.getText();
      expect(passFieldText).toBe('Password cannot be blank');
   });
});
