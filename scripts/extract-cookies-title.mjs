// Extracts "Heartmade" (top-level <g> #4) + "cookies" (top-level <g> #1) from textos.svg,
// computes a tight viewBox, and writes public/assets/svg/cookies_title.svg.
import puppeteer from 'puppeteer'
import { readFile, writeFile } from 'node:fs/promises'

const svg = await readFile('public/assets/svg/textos.svg', 'utf8')

// Tag only top-level <g> (those at column 0) with data-top index so we can identify them in the DOM.
let idx = 0
const tagged = svg.replace(/^<g>/gm, () => {
  idx += 1
  return `<g data-top="${idx}">`
})

// Load into puppeteer to compute bounding boxes in the SVG's own user-coordinate space.
await writeFile('scripts/_tmp-tagged.svg', tagged)
const browser = await puppeteer.launch({ headless: 'new' })
const page = await browser.newPage()
await page.setContent(`<!doctype html><html><body style="margin:0">${tagged}</body></html>`)

const result = await page.evaluate(() => {
  // For each tagged top-level group, read its getBBox() in user units.
  const boxes = {}
  document.querySelectorAll('g[data-top]').forEach((g) => {
    const b = g.getBBox()
    boxes[g.getAttribute('data-top')] = { x: b.x, y: b.y, w: b.width, h: b.height }
  })
  return boxes
})

await browser.close()
console.log('bboxes:', result)

// TOP 1 = "cookies" (big dark), TOP 4 = "Heartmade" (small orange eyebrow). Union them.
const a = result['1']
const b = result['4']
const minX = Math.min(a.x, b.x)
const minY = Math.min(a.y, b.y)
const maxX = Math.max(a.x + a.w, b.x + b.w)
const maxY = Math.max(a.y + a.h, b.y + b.h)
const pad = 8 // tiny padding around the glyph extents
const vbX = minX - pad
const vbY = minY - pad
const vbW = maxX - minX + pad * 2
const vbH = maxY - minY + pad * 2

// Build a standalone SVG containing only the two groups.
// Preserve the <style> from the original so .st0 / .st1 colors still apply.
const styleMatch = svg.match(/<style[\s\S]*?<\/style>/)
const style = styleMatch ? styleMatch[0] : ''

// Extract the raw text of each top-level <g> by line ranges we already know.
// From earlier inspection: group 1 = lines 9..150, group 4 = lines 376..430.
const lines = svg.split('\n')
const group1 = lines.slice(8, 150).join('\n')      // cookies
const group4 = lines.slice(375, 430).join('\n')    // Heartmade

const out = `<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vbX.toFixed(2)} ${vbY.toFixed(2)} ${vbW.toFixed(2)} ${vbH.toFixed(2)}" preserveAspectRatio="xMidYMid meet">
${style}
${group1}
${group4}
</svg>
`

await writeFile('public/assets/svg/cookies_title.svg', out)
console.log('wrote public/assets/svg/cookies_title.svg')
console.log(`viewBox: ${vbX.toFixed(2)} ${vbY.toFixed(2)} ${vbW.toFixed(2)} ${vbH.toFixed(2)}`)
console.log(`aspect ratio: ${(vbW / vbH).toFixed(3)}`)
