
class CheckoutPage {
    constructor(page) {
        this.page = page;

        // Checkout information locators
        this.firstNameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.postalCodeInput = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
        this.cancelButton = page.locator('#cancel');
        this.errorMessage = page.locator('[data-test="error"]');

        // Checkout overview locators
        this.cartItems = page.locator('.cart_item');
        this.productNames = page.locator('.inventory_item_name');
        this.productPrices = page.locator('.inventory_item_price');
        this.itemTotal = page.locator('.summary_subtotal_label');
        this.tax = page.locator('.summary_tax_label');
        this.total = page.locator('.summary_total_label');
        this.finishButton = page.locator('#finish');

        // Checkout confirmation locators
        this.confirmationMessage = page.locator('.complete-header');
        this.backHomeButton = page.locator('#back-to-products');
        this.confirmationDescription = this.page.locator('.complete-text');

    }



    async fillCustomerDetails(firstName, lastName, postalCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async continueCheckout() {
        await this.continueButton.click();
    }

    async cancelCheckout() {
        await this.cancelButton.click();
    }

    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }

    async getProductNames() {
        return await this.productNames.allTextContents();
    }


    async getProductPrices() {
    const prices = await this.page
        .locator('.inventory_item_price')
        .allTextContents();

    return prices.map(price =>
        Number(price.replace('$', '').trim())
    );
}


    async getItemTotal() {
    const itemTotal = await this.page
        .locator('.summary_subtotal_label')
        .textContent();

    return Number(itemTotal.replace('Item total: $', '').trim());
}

    async getTax() {
        const text = await this.tax.textContent();
        return Number(text.replace('Tax: $', ''));
    }

    async getTotal() {
        const text = await this.total.textContent();
        return Number(text.replace('Total: $', ''));
    }

    async finishCheckout() {
        await this.finishButton.click();
    }

    async getConfirmationMessage() {
    return await this.confirmationMessage.textContent();
    }

    async getConfirmationDescription() {
    return await this.confirmationDescription.textContent();
    }

    async backHome() {
        await this.backHomeButton.click();
    }
}

export default CheckoutPage;
