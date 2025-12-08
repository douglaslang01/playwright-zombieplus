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

test('deve poder remover uma serie', async ({ page, request }) => {
    const tvshow = data.to_remove;
    await executeSQL(`DELETE FROM tvshows WHERE title = '${tvshow.title}';`);
    await request.api.postTvShow(tvshow);

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
    await page.tvshows.remove(tvshow.title);

    await page.popup.haveText('Série removida com sucesso.');
});

test('não deve cadastrar quando o titulo é duplicado', async ({ page, request }) => {
    const tvshow = data.duplicate;
    await executeSQL(`DELETE FROM tvshows WHERE title = '${tvshow.title}';`);
    await request.api.postTvShow(tvshow);

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
    await page.tvshows.create(tvshow);
    await page.popup.haveText(`O título '${tvshow.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`);
});

test('não deve cadastrar quando os campos obrigatórios não são preenchidos', async ({ page }) => {
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin');
    await page.tvshows.goForm();
    await page.tvshows.submit();

    await page.tvshows.alertHaveText([
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório (apenas números)'
    ])
});