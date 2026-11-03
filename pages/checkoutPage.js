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
        await this.firstNameInput.waitFor({ state: 'visible' });
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async continueCheckout() {
        await this.continueButton.waitFor({ state: 'visible' });
        await this.continueButton.click();
    }

    async cancelCheckout() {
        await this.cancelButton.waitFor({ state: 'visible' });
        await this.cancelButton.click();
    }

    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }

    async getProductNames() {
        await this.productNames.first().waitFor({ state: 'visible' });
        return await this.productNames.allTextContents();
    }


    async getProductPrices() {
        await this.productPrices.first().waitFor({ state: 'visible' });
        const prices = await this.productPrices.allTextContents();
        return prices.map(price => Number(price.replace('$', '').trim()));
    }

    async getItemTotal() {
        await this.itemTotal.waitFor({ state: 'visible' });
        const text = await this.itemTotal.textContent();
        return Number((text ?? '').replace(/^[^$]*\$/, '').trim());
    }

    async getTax() {
        await this.tax.waitFor({ state: 'visible' });
        const text = await this.tax.textContent();
        return Number((text ?? '').replace(/^[^$]*\$/, '').trim());
    }

    async getTotal() {
        await this.total.waitFor({ state: 'visible' });
        const text = await this.total.textContent();
        return Number((text ?? '').replace(/^[^$]*\$/, '').trim());
    }

    async finishCheckout() {
        await this.finishButton.waitFor({ state: 'visible' });
        await this.finishButton.click();
    }

    async getConfirmationMessage() {
        await this.confirmationMessage.waitFor({ state: 'visible' });
        return await this.confirmationMessage.textContent();
    }

    async getConfirmationDescription() {
        await this.confirmationDescription.waitFor({ state: 'visible' });
        return await this.confirmationDescription.textContent();
    }

    async backHome() {
        await this.backHomeButton.waitFor({ state: 'visible' });
        await this.backHomeButton.click();
    }
}

export default CheckoutPage;
