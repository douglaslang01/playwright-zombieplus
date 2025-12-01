import { expect, test } from '@playwright/test';
const { LoginPage } = require('../pages/loginPage');
const { Toast } = require('../pages/components');

let loginPage, toast;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    toast = new Toast(page);
});

test('deve logar como administrador', async ({ page }) => {
    await loginPage.visit();
    await loginPage.submit('admin@zombieplus.com', 'pwd123');
    await loginPage.isLoggedIn();
});

test('não deve logar com senha incorreta', async ({ page }) => {
    await loginPage.visit();
    await loginPage.submit('admin@zombieplus.com', '123456');

    const message = 'Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.';
    await toast.haveText(message);
});
