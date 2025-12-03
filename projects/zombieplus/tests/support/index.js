const { test: base, expect } = require('@playwright/test');

const { Leads } = require('./actions/leads');
const { Login } = require('./actions/login');
const { Movies } = require('./actions/movies');
const { Popup } = require('./actions/components');
const { Api } = require('./api')

const test = base.extend({
    page: async ({ page }, use) => {
        const context = page;

        context['leads'] = new Leads(page);
        context['login'] = new Login(page);
        context['movies'] = new Movies(page);
        context['popup'] = new Popup(page);

        await use(context);
    },
    request: async ({ request }, use) => {
        const context = request;

        context['api'] = new Api(request);
        await context['api'].setToken();

        await use(context);
    }
});

export { test, expect };
