// Extracts "Creamy" (top-level <g> #2) + "cheesecake" (floating <path> lines 151-258) from textos.svg.
import puppeteer from 'puppeteer'
import { readFile, writeFile } from 'node:fs/promises'

const svg = await readFile('public/assets/svg/textos.svg', 'utf8')

// Tag top-level <g> to find "Creamy" bbox, and temporarily wrap the floating cheesecake path to measure it too.
let idx = 0
let tagged = svg.replace(/^<g>/gm, () => {
  idx += 1
  return `<g data-top="${idx}">`
})
// Wrap the floating path that spans lines 151..258 in a measurable group.
tagged = tagged.replace(
  /^<path class="st0" d="M158\.39,248\.72[\s\S]*?"\/>\n/m,
  (match) => `<g data-top="cheese">${match}</g>\n`,
)

const browser = await puppeteer.launch({ headless: 'new' })
const page = await browser.newPage()
await page.setContent(`<!doctype html><html><body style="margin:0">${tagged}</body></html>`)
const boxes = await page.evaluate(() => {
  const out = {}
  document.querySelectorAll('[data-top]').forEach((el) => {
    const b = el.getBBox()
    out[el.getAttribute('data-top')] = { x: b.x, y: b.y, w: b.width, h: b.height }
  })
  return out
})
await browser.close()
console.log('bboxes:', boxes)

const creamy = boxes['2']
const cheese = boxes['cheese']
const minX = Math.min(creamy.x, cheese.x)
const minY = Math.min(creamy.y, cheese.y)
const maxX = Math.max(creamy.x + creamy.w, cheese.x + cheese.w)
const maxY = Math.max(creamy.y + creamy.h, cheese.y + cheese.h)
const pad = 8
const vbX = minX - pad
const vbY = minY - pad
const vbW = maxX - minX + pad * 2
const vbH = maxY - minY + pad * 2

const styleMatch = svg.match(/<style[\s\S]*?<\/style>/)
const style = styleMatch ? styleMatch[0] : ''

const lines = svg.split('\n')
const cheesePath = lines.slice(150, 258).join('\n')  // floating cheesecake path
const creamyGroup = lines.slice(258, 335).join('\n') // Creamy group

// Recolor st0 (main text) to cream, st1 (eyebrow) to brand orange — consistent with cookies_title.svg.
const recoloredStyle = style
  .replace(/#46130E/gi, '#f6eadf')
  .replace(/#FF5C1E/gi, '#e8511b')

const out = `<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vbX.toFixed(2)} ${vbY.toFixed(2)} ${vbW.toFixed(2)} ${vbH.toFixed(2)}" preserveAspectRatio="xMidYMid meet">
${recoloredStyle}
${cheesePath}
${creamyGroup}
</svg>
`

await writeFile('public/assets/svg/cheesecakes_title.svg', out)
console.log('wrote public/assets/svg/cheesecakes_title.svg')
console.log(`viewBox: ${vbX.toFixed(2)} ${vbY.toFixed(2)} ${vbW.toFixed(2)} ${vbH.toFixed(2)}`)
console.log(`aspect ratio: ${(vbW / vbH).toFixed(3)}`)
