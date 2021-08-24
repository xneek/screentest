const puppeteer = require('puppeteer');

describe('interaction', () => {
  let browser;

  beforeAll(async () => {
    browser = await puppeteer.launch();
  });

  it('works-interaction', async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setViewport({width: 1920, height: 1080})
    await page.goto('https://www.google.com', { waitUntil: 'networkidle0' })
    await page.type('input[title="Поиск"]', 'Пенза', { delay: 100 })

    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
  });

  afterAll(async () => {
    await browser.close();
  });
});