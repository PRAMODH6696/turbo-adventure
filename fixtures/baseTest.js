import { test as base, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';

/** @typedef {import('../pages/LoginPage.js').default} LoginPageType */

/** @typedef {{ loginPage: LoginPageType }} CustomFixtures */

/** @type {import('@playwright/test').TestType<CustomFixtures, {}>} */

const test = base.extend({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    }
});

export { test, expect };