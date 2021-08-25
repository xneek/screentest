const puppeteer = require('puppeteer');

describe('jest-image-snapshot usage with an image received from puppeteer', () => {
  let browser;

  beforeAll(async () => {
    browser = await puppeteer.launch();
  });

  it('works', async () => {
    const page = await browser.newPage();
    await page.goto('https://kubernetes.shtormtech.ru/b2x-dev1/app/client/1-1');
    await page.setViewport({ width: 1920, height: 1080 });
    await page.evaluate(async() => {
        await new Promise(function(resolve) { 
           setTimeout(resolve, 1000)
        });
   });
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      customDiffConfig: { threshold: 0.7 }
    });

  });

  afterAll(async () => {
    await browser.close();
  });
});
