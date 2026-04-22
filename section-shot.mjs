import puppeteer from 'puppeteer';
const url = process.argv[2] || 'http://localhost:5173';
const selector = process.argv[3] || '#menu';
const name = process.argv[4] || 'section';
const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
await page.addStyleTag({ content: `*, *::before, *::after { animation-duration: 0.001s !important; transition-duration: 0.001s !important; }` });
const y = await page.evaluate((s) => {
  const el = document.querySelector(s);
  if (!el) return 0;
  const top = el.getBoundingClientRect().top + window.scrollY;
  window.scrollTo(0, top);
  return top;
}, selector);
await new Promise(r => setTimeout(r, 1200));
await page.screenshot({
  path: `./temporary screenshots/${name}.png`,
  captureBeyondViewport: false,
  clip: { x: 0, y, width: 1440, height: 700 }
});
await browser.close();
console.log('saved', name, 'at y=', y);
