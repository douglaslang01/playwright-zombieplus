import { expect, test } from '@playwright/test';
const { LoginPage } = require('../pages/loginPage');

let loginPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
});

test('deve logar como administrador', async ({ page }) => {
    await loginPage.visit();
    await loginPage.submit('admin@zombieplus.com', 'pwd123');
    await loginPage.isLoggedIn();
});
