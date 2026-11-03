
import { test, expect } from '../fixtures/baseTest.js';
import ProductsPage from '../pages/productsPage.js';
import CartPage from '../pages/cartPage.js';
import CheckoutPage from '../pages/checkoutPage.js';

let productsPage;
let cartPage;
let checkoutPage;

test.describe('Checkout Module', () => {

    test.beforeEach(async ({ loginPage, page }) => {
        // Login
        await loginPage.navigateToLoginPage();
        await loginPage.login('standard_user', 'secret_sauce');

        // Add product to cart
        productsPage = new ProductsPage(page);
        await productsPage.addFirstProductToCart();
        await productsPage.openShoppingCart();

        // Open cart
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);
    });

    // CHK_001 - Verify checkout navigation
    test('CHK_001 - Verify checkout navigation @smoke @regression', async ({ page }) => {
        await cartPage.clickCheckout();

        await expect(page).toHaveURL(/checkout-step-one.html/);
        await expect(page.locator('.title'))
            .toHaveText('Checkout: Your Information');
    });

    // CHK_002 - Submit valid customer details
    test('CHK_002 - Submit valid customer details @smoke @regression', async ({ page }) => {
        await cartPage.clickCheckout();

        await checkoutPage.fillCustomerDetails(
            'Pramodh',
            'S',
            '560001'
        );

        await checkoutPage.continueCheckout();

        await expect(page).toHaveURL(/checkout-step-two.html/);
        await expect(page.locator('.title'))
            .toHaveText('Checkout: Overview');
    });

    // CHK_003 - Verify empty first name validation
    test('CHK_003 - Verify empty first name @regression', async ({ page }) => {
        await cartPage.clickCheckout();

        await checkoutPage.fillCustomerDetails('', 'S', '560001');
        await checkoutPage.continueCheckout();

        await expect(checkoutPage.errorMessage)
            .toHaveText('Error: First Name is required');
    });

    // CHK_004 - Verify empty last name validation
    test('CHK_004 - Verify empty last name @regression', async ({ page }) => {
        await cartPage.clickCheckout();

        await checkoutPage.fillCustomerDetails('Pramodh', '', '560001');
        await checkoutPage.continueCheckout();

        await expect(checkoutPage.errorMessage)
            .toHaveText('Error: Last Name is required');
    });

    // CHK_005 - Verify empty postal code validation
    test('CHK_005 - Verify empty postal code @regression', async ({ page }) => {
        await cartPage.clickCheckout();

        await checkoutPage.fillCustomerDetails('Pramodh', 'S', '');
        await checkoutPage.continueCheckout();

        await expect(checkoutPage.errorMessage)
            .toHaveText('Error: Postal Code is required');
    });

    // CHK_006 - Verify product in order summary
    test('CHK_006 - Verify product in order summary @regression', async ({ page }) => {
        await cartPage.clickCheckout();

        await checkoutPage.fillCustomerDetails('Pramodh', 'S', '560001');
        await checkoutPage.continueCheckout();

        await expect(checkoutPage.productNames.first())
            .toHaveText('Sauce Labs Backpack');

        await expect(checkoutPage.productPrices.first())
            .toHaveText('$29.99');
    });

    // CHK_007 - Verify item total
    test('CHK_007 - Verify item total @regression', async ({ page }) => {

    await cartPage.clickCheckout();

    await checkoutPage.fillCustomerDetails('Pramodh', 'S', '560001');
    await checkoutPage.continueCheckout();

    const prices = await checkoutPage.getProductPrices();

    const expectedItemTotal = Number(
        prices.reduce((sum, price) => sum + price, 0).toFixed(2)
    );

    const actualItemTotal = await checkoutPage.getItemTotal();

    console.log('Product prices:', prices);
    console.log('Expected item total:', expectedItemTotal);
    console.log('Actual item total:', actualItemTotal);

    expect(actualItemTotal).toBe(expectedItemTotal);
});

    // CHK_008 - Verify tax calculation
    test('CHK_008 - Verify tax calculation @regression', async ({ page }) => {
        await cartPage.clickCheckout();

        await checkoutPage.fillCustomerDetails('Pramodh', 'S', '560001');
        await checkoutPage.continueCheckout();

        const itemTotal = await checkoutPage.getItemTotal();
        const actualTax = await checkoutPage.getTax();

        const expectedTax = Number((itemTotal * 0.08).toFixed(2));

        expect(actualTax).toBe(expectedTax);
    });

    // CHK_009 - Verify final total
    test('CHK_009 - Verify final total @regression', async ({ page }) => {
        await cartPage.clickCheckout();

        await checkoutPage.fillCustomerDetails('Pramodh', 'S', '560001');
        await checkoutPage.continueCheckout();

        const itemTotal = await checkoutPage.getItemTotal();
        const tax = await checkoutPage.getTax();
        const actualTotal = await checkoutPage.getTotal();

        const expectedTotal = Number((itemTotal + tax).toFixed(2));

        expect(actualTotal).toBe(expectedTotal);
    });

    // CHK_010 - Finish checkout
    test('CHK_010 - Finish checkout @regression', async ({ page }) => {
        await cartPage.clickCheckout();

        await checkoutPage.fillCustomerDetails('Pramodh', 'S', '560001');
        await checkoutPage.continueCheckout();
        await checkoutPage.finishCheckout();

        await expect(page).toHaveURL(/checkout-complete.html/);
        await expect(checkoutPage.confirmationMessage)
            .toHaveText('Thank you for your order!');
    });

    // CHK_011 - Cancel checkout from overview
    test('CHK_011 - Cancel checkout from overview @regression', async ({ page }) => {
        await cartPage.clickCheckout();

        await checkoutPage.fillCustomerDetails('Pramodh', 'S', '560001');
        await checkoutPage.continueCheckout();
        await checkoutPage.cancelCheckout();

        await expect(page).toHaveURL(/inventory.html/);
        await expect(page.locator('.title')).toHaveText('Products');
    });

    // CHK_012 - Return home after successful order
    test('CHK_012 - Return home after successful order @regression', async ({ page }) => {
        await cartPage.clickCheckout();

        await checkoutPage.fillCustomerDetails('Pramodh', 'S', '560001');
        await checkoutPage.continueCheckout();
        await checkoutPage.finishCheckout();
        await checkoutPage.backHome();

        await expect(page).toHaveURL(/inventory.html/);
        await expect(page.locator('.title')).toHaveText('Products');
    });
});
