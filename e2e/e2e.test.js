import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(40000);


describe('Credit Card Validator form', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`); // Не работает с webpack-dev-server@5. Нужна @4
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });
    browser = await puppetteer.launch({
      // headless: true, // Без открытия браузера
      // slowMo: 100,
      // devtools: true, // show devTools
    });
  });

  test('create new item', async () => {
    page = await browser.newPage();
    await page.goto(baseUrl);
    await page.click('.create')
    await page.type('#name', 'Text')
    await page.type('#price', '235.50')
    await page.click('#add')
    await page.waitForSelector('#edit-data3')
  });

  test('update item', async () => {
    page = await browser.newPage();
    await page.goto(baseUrl);
    await page.click('[for="edit-data2"]')
    await page.type('#name', '')
    for (let index = 0; index < 7; index++) {
      await page.keyboard.press('Backspace')
    }
    await page.type('#name', 'Ролтон')
    await page.click('#update')
    await page.waitForSelector('#edit-data2')
  });

  test('alternately calling validation', async () => {
    page = await browser.newPage();
    await page.goto(baseUrl);
    await page.click('.create')
    await page.click('#add')
    await page.type('#name', 'Телохранитель')
    await page.click('#add')
    await page.type('#price', '300 dollars')
    await page.click('#add')
    await page.type('#price', '')
    for (let index = 0; index < '300 dollars'.length; index++) {
      await page.keyboard.press('Backspace')
    }
    await page.type('#price', '300')
    await page.click('#cancel')
    await page.waitForSelector('table')
  });

  test('delete item', async () => {
    page = await browser.newPage();
    await page.goto(baseUrl);
    await page.click('.delete')
    await page.click('#no')
    await page.click('.delete')
    await page.click('#yes')
    await page.waitForSelector('table')
  });

  test('popup click test', async () => {
    page = await browser.newPage();
    await page.goto(baseUrl);
    await page.click('.popup-button')
    await page.waitForSelector('.popup-text')
  });

  afterAll(async () => {
    await browser.close();
    server.kill()
  });
});