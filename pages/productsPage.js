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

    // Get total number of products
    

    // Get all product names
    async getProductNames() {
        return await this.productNames.allTextContents();
    }

    // Sort products using dropdown values
    async sortProducts(option) {
        await this.sortDropdown.selectOption(option);
    }

    // Get all product prices as numbers
    async getProductPrices() {
        const prices = await this.productPrices.allTextContents();

        return prices.map(price => Number(price.replace('$', '')));
    }

    // Add the first product to cart
    async addFirstProductToCart() {
        await this.addToCartButtons.first().click();
    }

    // Get cart badge count
    async getCartCount() {
        return await this.cartBadge.textContent();
    }


    async addFirstProductToCart() {
    await this.addToCartButtons.first().click();
}

    async addMultipleProductsToCart(count) {
    for (let i = 0; i < count; i++) {
        await this.addToCartButtons.nth(i).click();
    }
}

      async openShoppingCart() {
    await this.shoppingCart.click();
}
}




export default ProductsPage;