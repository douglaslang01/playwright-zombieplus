const { test: base, expect } = require('@playwright/test');

const { Leads } = require('./actions/leads');
const { Login } = require('./actions/login');
const { Movies } = require('./actions/movies');
const { Toast } = require('./actions/components');

const test = base.extend({
    page: async ({ page }, use) => {
        const context = page;

        context['leads'] = new Leads(page);
        context['login'] = new Login(page);
        context['movies'] = new Movies(page);
        context['toast'] = new Toast(page);

        await use(context);
    }
});

export { test, expect };
