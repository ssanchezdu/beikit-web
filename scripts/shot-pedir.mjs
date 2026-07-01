import puppeteer from 'puppeteer';
const url = process.argv[2] || 'http://localhost:5173';
const name = process.argv[3] || 'pedir';
const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
// iPhone-ish mobile viewport
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
await page.addStyleTag({ content: `*, *::before, *::after { animation-duration: 0.001s !important; transition-duration: 0.001s !important; scroll-behavior: auto !important; }` });
// Reproduce the BottomNav "Pedir" tap: scrollIntoView honors scroll-margin-top.
await page.evaluate(() => {
  const el = document.getElementById('delivery');
  el.scrollIntoView({ block: 'start' });
});
await new Promise(r => setTimeout(r, 800));
const info = await page.evaluate(() => {
  const el = document.getElementById('delivery');
  const r = el.getBoundingClientRect();
  return { sectionTopFromViewport: Math.round(r.top), scrollY: Math.round(window.scrollY) };
});
await page.screenshot({ path: `./temporary screenshots/${name}.png` });
await browser.close();
console.log('saved', name, JSON.stringify(info));
