import puppeteer from 'puppeteer'

const browser = await puppeteer.launch({ headless: 'new' })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 3600, deviceScaleFactor: 1 })
await page.goto('http://localhost:5174/', { waitUntil: 'networkidle0', timeout: 30000 })
await page.evaluate(() => {
  const menu = document.getElementById('menu')
  if (menu) menu.scrollIntoView({ behavior: 'instant', block: 'start' })
})
await new Promise((r) => setTimeout(r, 800))
// Scroll to force all in-view animations to settle
await page.evaluate(() => window.scrollBy(0, 0))
await page.screenshot({ path: 'scripts/shot-menu-compare.png', fullPage: false })
await browser.close()
console.log('saved')
