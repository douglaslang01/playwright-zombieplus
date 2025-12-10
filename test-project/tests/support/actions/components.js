const { expect } = require('@playwright/test');

export class Popup {

    constructor(page) {
        this.page = page;
    }

    async haveText(message) {
        const element = this.page.locator('.swal2-html-container');

        await expect(element).toHaveText(message);
    }


}

export class BaseActions {
    constructor(page) {
        this.page = page;
    }

    async search(target) {
        await this.page.getByPlaceholder('Busque pelo nome').fill(target); //input[placeholder="Busque pelo nome"]
        await this.page.click('.actions button');
    }

    async tableHave(content) {
        const rows = this.page.getByRole('row');
        await expect(rows).toContainText(content);
    }

    async alertHaveText(target) {
        await expect(this.page.locator('.alert')).toHaveText(target);
    }

    async remove(title) {
        await this.page.getByRole('row', { name: title }).getByRole('button').click();
        await this.page.click('.confirm-removal');
    }

}