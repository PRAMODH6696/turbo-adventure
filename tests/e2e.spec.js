
import { test, expect } from '../fixtures/baseTest.js';
import ProductsPage from '../pages/productsPage.js';
import CartPage from '../pages/cartPage.js';
import CheckoutPage from '../pages/checkoutPage.js';

test('E2E_001 - Complete E-Commerce Purchase Journey',
    async ({ loginPage, page }) => {

        // STEP 1: Login
        await loginPage.navigateToLoginPage();

        await loginPage.login(
            'standard_user',
            'secret_sauce'
        );

        // STEP 2: Verify Products page
        const productsPage = new ProductsPage(page);

        await expect(productsPage.productsHeading)
            .toHaveText('Products');

        await expect(productsPage.productCards)
            .toHaveCount(6);

        // STEP 3: Add two products to cart
        await productsPage.addMultipleProductsToCart(2);

        await expect(productsPage.cartBadge)
            .toHaveText('2');

        // STEP 4: Open shopping cart
        await productsPage.openShoppingCart();

        const cartPage = new CartPage(page);

        await expect(cartPage.cartItems)
            .toHaveCount(2);

        const cartProductNames =
            await cartPage.getProductNames();

        expect(cartProductNames).toContain('Sauce Labs Backpack');
        expect(cartProductNames).toContain('Sauce Labs Bike Light');

        // STEP 5: Checkout
        const checkoutPage = new CheckoutPage(page);

        await cartPage.clickCheckout();

        await checkoutPage.fillCustomerDetails(
            'Pramodh',
            'S',
            '560001'
        );

        await checkoutPage.continueCheckout();

        await expect(page).toHaveURL(/checkout-step-two.html/);

        // STEP 6: Verify order summary
        const productPrices =
            await checkoutPage.getProductPrices();

        const expectedItemTotal = Number(
            productPrices.reduce((sum, price) => sum + price, 0).toFixed(2)
        );

        const actualItemTotal =
            await checkoutPage.getItemTotal();

        expect(actualItemTotal).toBe(expectedItemTotal);

        const actualTax = await checkoutPage.getTax();
        const actualTotal = await checkoutPage.getTotal();

        expect(actualTotal).toBe(
            Number((actualItemTotal + actualTax).toFixed(2))
        );

        // STEP 7: Finish order
        await checkoutPage.finishCheckout();

        await expect(page).toHaveURL(/checkout-complete.html/);

        await expect(checkoutPage.confirmationMessage)
            .toHaveText('Thank you for your order!');

        await expect(checkoutPage.confirmationDescription)
            .toContainText('Your order has been dispatched');

        console.log('E2E purchase journey completed successfully!');
    }
);
