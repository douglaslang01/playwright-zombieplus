const { test } = require('../support');

const data = require('../support/fixtures/tvshows.json')
const { executeSQL } = require('../support/database');

test('deve poder cadastrar uma serie', async ({ page }) => {
    const tvshow = data.create;
    await executeSQL(`DELETE FROM tvshows WHERE title = '${tvshow.title}';`);

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
    await page.tvshows.create(tvshow);
    await page.popup.haveText(`A série '${tvshow.title}' foi adicionada ao catálogo.`);
});