// One-off: grabs the og:image thumbnail for an Instagram reel and saves it locally.
// Usage: node scripts/grab-reel-thumb.mjs <reel-url> <output-filename>

import puppeteer from 'puppeteer'
import { writeFile } from 'node:fs/promises'

const url = process.argv[2] || 'https://www.instagram.com/reel/DW6wMOQiJdF/'
const out = process.argv[3] || 'public/ig-reel-DW6wMOQiJdF.jpg'

const browser = await puppeteer.launch({ headless: 'new' })
try {
  const page = await browser.newPage()
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  )
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 })

  const imgUrl = await page.evaluate(() => {
    const og = document.querySelector('meta[property="og:image"]')
    return og ? og.getAttribute('content') : null
  })

  if (!imgUrl) {
    console.error('[grab-reel-thumb] No og:image meta tag found.')
    process.exit(1)
  }

  console.log('[grab-reel-thumb] og:image →', imgUrl)
  const res = await fetch(imgUrl)
  if (!res.ok) {
    console.error('[grab-reel-thumb] Download failed:', res.status)
    process.exit(1)
  }
  const buf = Buffer.from(await res.arrayBuffer())
  await writeFile(out, buf)
  console.log(`[grab-reel-thumb] saved → ${out} (${buf.length} bytes)`)
} finally {
  await browser.close()
}
