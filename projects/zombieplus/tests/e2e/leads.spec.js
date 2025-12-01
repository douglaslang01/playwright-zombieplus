const { test, expect } = require('../support');
const { faker } = require('@faker-js/faker');

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();

  await page.landing.visit();
  await page.landing.openModal();
  await page.landing.submitLeadForm(leadName, leadEmail);

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!';
  await page.toast.containText(message);
});

test('não deve cadastrar quando o email já existe', async ({ page, request }) => {
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();

  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: leadName,
      email: leadEmail
    }
  });
  expect(newLead.ok()).toBeTruthy();

  await page.landing.visit();
  await page.landing.openModal();
  await page.landing.submitLeadForm(leadName, leadEmail);

  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.';
  await page.toast.containText(message);
});

test('não deve cadastrar um lead com email incorreto', async ({ page }) => {
  await page.landing.visit();
  await page.landing.openModal();
  await page.landing.submitLeadForm('Douglas Lang', 'gmail.com');
  await page.landing.alertHaveText('Email incorreto');
});

test('não deve cadastrar um lead quando o nome não é preenchido', async ({ page }) => {
  await page.landing.visit();
  await page.landing.openModal();
  await page.landing.submitLeadForm('', 'douglas.lang@gmail.com');
  await page.landing.alertHaveText('Campo obrigatório');
});

test('não deve cadastrar um lead quando email não é preeenchido', async ({ page }) => {
  await page.landing.visit();
  await page.landing.openModal();
  await page.landing.submitLeadForm('Douglas Lang', '');
  await page.landing.alertHaveText('Campo obrigatório');
});

test('não deve cadastrar um lead quando nenhum campo não é preeenchido', async ({ page }) => {
  await page.landing.visit();
  await page.landing.openModal();
  await page.landing.submitLeadForm('', '');
  await page.landing.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ]);
});
