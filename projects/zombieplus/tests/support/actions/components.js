import { expect } from '@playwright/test';

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

    async remove(title) {
        await this.page.getByRole('row', { name: title }).getByRole('button').click();
        await this.page.click('.confirm-removal');
    }
}