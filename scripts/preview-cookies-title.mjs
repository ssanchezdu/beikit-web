import puppeteer from 'puppeteer'
import { readFile } from 'node:fs/promises'

const svg = await readFile('public/assets/svg/cookies_title.svg', 'utf8')
const browser = await puppeteer.launch({ headless: 'new' })
const page = await browser.newPage()
await page.setViewport({ width: 1200, height: 600 })
await page.setContent(`<!doctype html><html><body style="margin:0;background:#320e10;padding:40px">
  <div style="width:900px">${svg}</div>
</body></html>`)
await page.screenshot({ path: 'scripts/preview-cookies-title.png', fullPage: true })
await browser.close()
console.log('ok')
