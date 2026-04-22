import puppeteer from 'puppeteer'

const url = process.argv[2] || 'http://localhost:5174/#menu'
const out = process.argv[3] || 'scripts/shot-menu.png'

const browser = await puppeteer.launch({ headless: 'new' })
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })
await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 })
// Scroll to the first category header (cookies) area
await page.evaluate(() => {
  const menu = document.getElementById('menu')
  if (menu) menu.scrollIntoView({ behavior: 'instant', block: 'start' })
})
await new Promise((r) => setTimeout(r, 800))
await page.screenshot({ path: out, fullPage: false })
await browser.close()
console.log('saved', out)
