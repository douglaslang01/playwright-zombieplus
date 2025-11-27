// @ts-check
import { test, expect } from '@playwright/test';

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  await page.goto('http://localhost:3000');

  //await page.click('//button[text() = "Aperte o play... se tiver coragem"]');
  await page.getByRole('button', { name: /Aperte o play/ }).click();

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera');

  await page.locator('#name').fill('Douglas Lang'); //Preencehndo pelo ID
  //await page.locator('input[name=name]').fill('Douglas Lang'); // Preenchendo pela propriedade name
  //await page.locator('input[placeholder="Seu nome completo"]').fill('Douglas Lang'); // Preenchendo pela proriedade de placeholder
  //await page.getByPlaceholder('Seu nome completo').fill('Douglas Lang');

  await page.locator('#email').fill('douglas.lang@gmail.com');

  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click();

  // await page.getByText('seus dados conosco').click();
  // const content = await page.content();
  // console.log(content);
  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!';
  await expect(page.locator('.toast')).toHaveText(message);

  await expect(page.locator('.toast')).toBeHidden({ timeout: 5000 });
});


test('não deve cadastrar um lead com email incorreto', async ({ page }) => {
  await page.goto('http://localhost:3000');

  //await page.click('//button[text() = "Aperte o play... se tiver coragem"]');
  await page.getByRole('button', { name: /Aperte o play/ }).click();

  await expect(
    page.getByTestId('modal').getByRole('heading')
  ).toHaveText('Fila de espera');

  await page.locator('#name').fill('Douglas Lang'); //Preencehndo pelo ID

  await page.locator('#email').fill('gmail.com');

  await page.getByTestId('modal')
    .getByText('Quero entrar na fila!').click();

  await expect(
    page.getByTestId('modal').locator('.alert')
  ).toHaveText('Email incorreto');
});
