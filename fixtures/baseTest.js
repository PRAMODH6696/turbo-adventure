// @ts-ignore
import { test as base, expect } from '@playwright/test';
import LoginPage from '../pages/loginPage.js';

/** @typedef {import('../pages/loginPage.js').default} LoginPageType */

/** @typedef {{ loginPage: LoginPageType }} CustomFixtures */

const test = base.extend({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    }
});

export { test, expect };