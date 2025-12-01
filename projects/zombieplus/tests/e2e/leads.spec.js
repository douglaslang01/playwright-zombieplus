import { test, expect } from '@playwright/test';
const { faker } = require('@faker-js/faker');

const { LandingPage } = require('../pages/landingPage');
const { Toast } = require('../pages/components');

let landingPage, toast;

test.beforeEach(async ({ page }) => {
  landingPage = new LandingPage(page);
  toast = new Toast(page);
});

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();

  await landingPage.visit();
  await landingPage.openModal();
  await landingPage.submitLeadForm(leadName, leadEmail);

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!';
  await toast.haveText(message);
});


test('não deve cadastrar quando o email já existe', async ({ page }) => {
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();

  for (let index = 0; index <= 1; index++) {
    await landingPage.visit();
    await landingPage.openModal();
    await landingPage.submitLeadForm(leadName, leadEmail);
  }

  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.';
  await toast.haveText(message);
});

test('não deve cadastrar um lead com email incorreto', async ({ page }) => {
  await landingPage.visit();
  await landingPage.openModal();
  await landingPage.submitLeadForm('Douglas Lang', 'gmail.com');
  await landingPage.alertHaveText('Email incorreto');
});

test('não deve cadastrar um lead quando o nome não é preenchido', async ({ page }) => {
  await landingPage.visit();
  await landingPage.openModal();
  await landingPage.submitLeadForm('', 'douglas.lang@gmail.com');
  await landingPage.alertHaveText('Campo obrigatório');
});

test('não deve cadastrar um lead quando email não é preeenchido', async ({ page }) => {
  await landingPage.visit();
  await landingPage.openModal();
  await landingPage.submitLeadForm('Douglas Lang', '');
  await landingPage.alertHaveText('Campo obrigatório');
});

test('não deve cadastrar um lead quando nenhum campo não é preeenchido', async ({ page }) => {
  await landingPage.visit();
  await landingPage.openModal();
  await landingPage.submitLeadForm('', '');
  await landingPage.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ]);
});
