import { test, expect } from '../fixtures/baseTest.js';
import ProductsPage from '../pages/productsPage.js';
import CartPage from '../pages/CartPage.js';

test.describe('SauceDemo Shopping Cart Module', () => {


    let productsPage;
    let cartPage;

    test.beforeEach(async ({ loginPage, page }) => {
        // Login
        await loginPage.navigateToLoginPage();
        await loginPage.login('standard_user', 'secret_sauce');

        // Initialize Page Objects
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);
    });

    // CART_001 - Verify shopping cart page
    test('CART_001 - Verify shopping cart page @smoke @regression', async ({ page }) => {
        await productsPage.openShoppingCart();

        await expect(page).toHaveURL(/cart.html/);
        await expect(cartPage.cartTitle).toHaveText('Your Cart');

    });

    // CART_002 - Add one product to cart
    test('CART_002 - Add one product to cart @regression', async () => {
        await productsPage.addFirstProductToCart();

        await expect(productsPage.cartBadge).toHaveText('1');
    });

    // CART_003 - Add multiple products
    test('CART_003 - Add multiple products @regression', async () => {
        await productsPage.addMultipleProductsToCart(3);

        await expect(productsPage.cartBadge).toHaveText('3');
    });

    // CART_004 - Verify product in cart
    test('CART_004 - Verify product in cart @regression', async () => {
        await productsPage.addFirstProductToCart();
        await productsPage.openShoppingCart();

        await expect(cartPage.productNames)
            .toHaveText(['Sauce Labs Backpack']);
    });

    // CART_005 - Verify product price
    test('CART_005 - Verify product price', async () => {
        await productsPage.addFirstProductToCart();
        await productsPage.openShoppingCart();

        await expect(cartPage.productPrices)
            .toHaveText(['$29.99']);
    });

    // CART_006 - Remove product from cart
    test('CART_006 - Remove product from cart @regression', async () => {
        await productsPage.addMultipleProductsToCart(2);
        await productsPage.openShoppingCart();

        await cartPage.removeFirstProduct();

        await expect(cartPage.cartItems).toHaveCount(1);
    });

    // CART_007 - Remove all products
    test('CART_007 - Remove all products @regression', async () => {
        await productsPage.addMultipleProductsToCart(3);
        await productsPage.openShoppingCart();

        await cartPage.removeAllProducts();

        await expect(cartPage.cartItems).toHaveCount(0);
    });

    // CART_008 - Continue shopping
    test('CART_008 - Continue shopping @regression', async ({ page }) => {
        await productsPage.addFirstProductToCart();
        await productsPage.openShoppingCart();

        await cartPage.continueShopping();

        await expect(page).toHaveURL(/inventory.html/);
        await expect(productsPage.productsHeading).toHaveText('Products');
    });

});