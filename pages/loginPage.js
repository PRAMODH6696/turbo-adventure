class LoginPage {
    constructor(page) {
        this.page=page;
        this.usernameInput=page.getByPlaceholder('Username');
        this.passwordInput=page.getByPlaceholder('Password');
        this.loginButton=page.getByRole('button', { name: 'Login' });
        this.errorMessage = page.locator('.error-message-container.error');
    }

    // Method to navigate to the login page
    async navigateToLoginPage() {
    await this.page.goto('/');
}
    
    
  /**
     * Login using username and password
     * @param {string} username
     * @param {string} password
     */


    // Method to perform login action
    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }       
}

export default LoginPage;