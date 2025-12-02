const { test: base, expect } = require('@playwright/test');

const { LandingPage } = require('../pages/landingPage');
const { LoginPage } = require('../pages/loginPage');
const { MoviesPage } = require('../pages/moviesPage');
const { Toast } = require('../pages/components');

const test = base.extend({
    page: async ({ page }, use) => {
        const context = page;

        context['landing'] = new LandingPage(page);
        context['login'] = new LoginPage(page);
        context['movies'] = new MoviesPage(page);
        context['toast'] = new Toast(page);

        await use(context);
    }
});

export { test, expect };
