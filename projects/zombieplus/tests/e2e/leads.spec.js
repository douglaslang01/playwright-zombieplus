import { test, expect } from '@playwright/test';
const { LandingPage } = require('../pages/landingPage');

let landingPage;

test.beforeEach(async ({ page }) => {
  landingPage = new LandingPage(page);
});

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  await landingPage.visit();

  await landingPage.openModal();

  await landingPage.submitLeadForm('Douglas Lang', 'douglas.lang@gmail.com');

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!';
  await landingPage.toastToHaveText(message);
});

test('não deve cadastrar um lead com email incorreto', async ({ page }) => {
  await landingPage.visit();

  await landingPage.openModal();

  await landingPage.submitLeadForm('Douglas Lang', 'gmail.com');

  await landingPage.alertToHaveText('Email incorreto');
});

test('não deve cadastrar um lead quando o nome não é preenchido', async ({ page }) => {
  await landingPage.visit();

  await landingPage.openModal();

  await landingPage.submitLeadForm('', 'douglas.lang@gmail.com');

  await landingPage.alertToHaveText('Campo obrigatório');
});

test('não deve cadastrar um lead quando email não é preeenchido', async ({ page }) => {
  await landingPage.visit();

  await landingPage.openModal();

  await landingPage.submitLeadForm('Douglas Lang', '');

  await landingPage.alertToHaveText('Campo obrigatório');
});

test('não deve cadastrar um lead quando nenhum campo não é preeenchido', async ({ page }) => {
  await landingPage.visit();
  await landingPage.openModal();
  await landingPage.submitLeadForm('', '');
  await landingPage.alertToHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ]);
});
