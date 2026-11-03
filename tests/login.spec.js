import { test, expect } from '../fixtures/baseTest.js';
import loginData from '../test-data/loginData.json'

test.describe('SauceDemo Login Module', () => {

    for (const data of loginData) {

        test(data.testCase, async ({ loginPage, page }) => {

            await loginPage.navigateToLoginPage();

            await loginPage.login(
                data.username,
                data.password
            );

            if (data.expectedResult === 'success') {

                await expect(page).toHaveURL(/inventory.html/);

                await expect(page.locator('.title'))
                    .toHaveText('Products');

            } else {
                

                await expect(loginPage.errorMessage).toBeVisible();

                if (data.expectedResult === 'locked') {
                    await expect(loginPage.errorMessage)
                        .toContainText('user has been locked out');
                }

                if (data.expectedResult === 'usernameRequired') {
                    await expect(loginPage.errorMessage)
                        .toContainText('Username is required');
                }
                if (data.expectedResult === 'error') {
                    await expect(loginPage.errorMessage)
                        .toContainText('Username and password do not match');
                }

            }

        });

    }

});