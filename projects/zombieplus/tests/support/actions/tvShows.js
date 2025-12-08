import { BaseActions } from './components';

export class TvShows extends BaseActions {

    constructor(page) {
        super(page);
        this.page = page;
    }

    async visit() {
        await this.page.locator('a[href$="/tvshows"]').click();
    }

    async goForm() {
        await this.visit();
        await this.page.locator('a[href$="/register"]').click();
    }

    async submit() {
        await this.page.getByRole('button', { name: 'Cadastrar' }).click();
    }

    async create(tvshow) {
        await this.goForm();

        await this.page.getByLabel('Titulo da série').fill(tvshow.title);
        await this.page.locator('#overview').fill(tvshow.overview);

        await this.page.locator('#select_company_id .react-select__indicator')
            .click();

        await this.page.locator('.react-select__option')
            .filter({ hasText: tvshow.company })
            .click()

        await this.page.locator('#select_year .react-select__indicator')
            .click();

        await this.page.locator('.react-select__option')
            .filter({ hasText: tvshow.release_year })
            .click();

        await this.page.getByLabel('Temporadas').fill(String(tvshow.seasons));

        await this.page.locator('input[name=cover]')
            .setInputFiles(`tests/support/fixtures/${tvshow.cover}`);

        if (tvshow.featured) {
            await this.page.locator('.featured  .react-switch').click();
        }

        await this.submit();
    }

    async remove(title) {
        await this.visit();
        super.remove(title);
    }
}
