class ProductsPage {
    constructor(page) {
        this.page = page;

        // Locators
        this.productsHeading = page.locator('.title');
        this.productCards = page.locator('.inventory_item');
        this.productNames = page.locator('.inventory_item_name');
        this.productPrices = page.locator('.inventory_item_price');
        this.sortDropdown = page.locator('.product_sort_container');
        this.addToCartButtons = page.locator('.btn_inventory');
        this.shoppingCart = page.locator('.shopping_cart_link');
        this.cartBadge = page.locator('.shopping_cart_badge');
    }

    async waitForProductsToLoad() {
        await this.productsHeading.waitFor({ state: 'visible' });
        await this.productCards.first().waitFor({ state: 'visible' });
    }

    // Get total number of products
    async getProductCount() {
        await this.waitForProductsToLoad();
        return await this.productCards.count();
    }

    // Get all product names
    async getProductNames() {
        await this.waitForProductsToLoad();
        return await this.productNames.allTextContents();
    }

    // Sort products using dropdown values
    async sortProducts(option) {
        await this.sortDropdown.waitFor({ state: 'visible' });
        await this.sortDropdown.selectOption(option);
    }

    // Get all product prices as numbers
    async getProductPrices() {
        await this.waitForProductsToLoad();
        const prices = await this.productPrices.allTextContents();

        return prices.map(price => Number(price.replace('$', '').trim()));
    }

    // Add the first product to cart
    async addFirstProductToCart() {
        await this.addToCartButtons.first().waitFor({ state: 'visible' });
        await this.addToCartButtons.first().click();
    }

    // Get cart badge count
    async getCartCount() {
        await this.cartBadge.waitFor({ state: 'visible' });
        const count = await this.cartBadge.textContent();
        return Number((count ?? '0').trim() || '0');
    }

    async addMultipleProductsToCart(count) {
        await this.addToCartButtons.first().waitFor({ state: 'visible' });
        for (let i = 0; i < count; i++) {
            await this.addToCartButtons.nth(i).click();
        }
    }

    async openShoppingCart() {
        await this.shoppingCart.waitFor({ state: 'visible' });
        await this.shoppingCart.click();
    }
}

export default ProductsPage;
