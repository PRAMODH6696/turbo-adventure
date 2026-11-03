import { test, expect } from '../fixtures/baseTest.js';
import ProductsPage from '../pages/productsPage.js';

test.describe('SauceDemo Product Module', () => {

    /** @type {ProductsPage} */
    let productsPage;


    // Runs before each test
    test.beforeEach(async ({ loginPage, page }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login('standard_user', 'secret_sauce');

        productsPage = new ProductsPage(page);
    });

    // PRD_001 - Verify Products page
    test('PRD_001 - Verify Products page @smoke @regression', async ({ page }) => {
        await expect(page).toHaveURL(/inventory.html/);
        await expect(productsPage.productsHeading).toHaveText('Products');
    });

    // PRD_002 - Verify product count
    test('PRD_002 - Verify product count @regression', async ({ page }) => {
        await expect(page).toHaveURL(/inventory.html/);

        const count = await productsPage.getProductCount();

    expect(count).toBe(6);

    console.log(`Total number of products: ${count}`);
    });

    // PRD_003 - Verify product names
    test('PRD_003 - Verify product names', async () => {
        const names = await productsPage.getProductNames();

        expect(names).toHaveLength(6);

        for (const name of names) {
            expect(name.trim()).not.toBe('');
            console.log(`Product Name: ${name}`);
        }
    });

    // PRD_004 - Sort products A-Z
    test('PRD_004 - Sort products A-Z @regression', async () => {
        await productsPage.sortProducts('az');

        const actualNames = await productsPage.getProductNames();
        const expectedNames = [...actualNames].sort((a, b) =>
            a.localeCompare(b)
        );

        expect(actualNames).toEqual(expectedNames);
        console.log('Products sorted A-Z successfully');
    });

    // PRD_005 - Sort products Z-A
    test('PRD_005 - Sort products Z-A @regression', async () => {
        await productsPage.sortProducts('za');

        const actualNames = await productsPage.getProductNames();
        const expectedNames = [...actualNames].sort((a, b) =>
            b.localeCompare(a)
        );

        expect(actualNames).toEqual(expectedNames);
    });

    // PRD_006 - Sort price low to high
    test('PRD_006 - Sort price low to high @regression', async () => {
        await productsPage.sortProducts('lohi');

        const prices = await productsPage.getProductPrices();

        const expectedPrices = [...prices].sort((a, b) => a - b);

        expect(prices).toEqual(expectedPrices);
    });

    // PRD_007 - Sort price high to low
    test('PRD_007 - Sort price high to low @regression', async () => {
        await productsPage.sortProducts('hilo');

        const prices = await productsPage.getProductPrices();

        const expectedPrices = [...prices].sort((a, b) => b - a);

        expect(prices).toEqual(expectedPrices);
    });

    // PRD_008 - Add product to cart
    test('PRD_008 - Add product to cart @smoke @regression', async () => {
        await productsPage.addFirstProductToCart();

        await expect(productsPage.cartBadge).toHaveText('1');
    });

});