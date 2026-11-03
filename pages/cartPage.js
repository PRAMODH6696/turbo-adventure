class CartPage {
    constructor(page) {
        this.page = page;

        // Locators
        this.cartTitle = page.locator('.title');
        this.cartItems = page.locator('.cart_item');
        this.productNames = page.locator('.inventory_item_name');
        this.productPrices = page.locator('.inventory_item_price');
        this.removeButtons = page.locator('button[id^="remove"]');
        this.continueShoppingButton = page.locator('#continue-shopping');
        this.checkoutButton = page.locator('#checkout');
        
    }

    // Get total number of cart items
    async getCartItemCount() {
        return await this.cartItems.count();
    }

    // Get product names from cart
    async getProductNames() {
        return await this.productNames.allTextContents();
    }

    // Get product prices from cart
    async getProductPrices() {
        return await this.productPrices.allTextContents();
    }

    // Remove first product from cart
    async removeFirstProduct() {
        await this.removeButtons.first().click();
    }

    // Remove all products from cart
    async removeAllProducts() {
        while (await this.removeButtons.count() > 0) {
            await this.removeButtons.first().click();
        }
    }

    // Continue shopping
    async continueShopping() {
        await this.continueShoppingButton.click();
    }

    // Click checkout
    async clickCheckout() {
        await this.checkoutButton.click();
    
    }
}

export default CartPage;