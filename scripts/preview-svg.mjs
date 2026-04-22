// Screenshot textos.svg with ONLY top-level <g> wrapped, so we can identify which one is "cookies".
import puppeteer from 'puppeteer'
import { readFile, writeFile } from 'node:fs/promises'

const svg = await readFile('public/assets/svg/textos.svg', 'utf8')
// Only tag top-level <g> — those whose opening tag is at the start of a line (col 0).
let idx = 0
const annotated = svg.replace(/^<g>/gm, () => {
  idx += 1
  return `<g data-top="${idx}" style="outline:3px solid red">`
})

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
body { margin: 0; background: #f6eadf; padding: 16px; font-family: sans-serif; }
.label { position: absolute; background: magenta; color: white; font-size: 22px; padding: 4px 10px; font-weight: bold; }
</style></head><body>${annotated}</body></html>`

await writeFile('scripts/preview-svg.html', html)

const browser = await puppeteer.launch({ headless: 'new' })
const page = await browser.newPage()
await page.setViewport({ width: 1400, height: 1000 })
await page.goto('file:///' + process.cwd().replace(/\\/g, '/') + '/scripts/preview-svg.html')

await page.evaluate(() => {
  document.querySelectorAll('g[data-top]').forEach((g) => {
    const bbox = g.getBoundingClientRect()
    const label = document.createElement('div')
    label.className = 'label'
    label.textContent = 'TOP ' + g.getAttribute('data-top')
    label.style.left = bbox.left + 'px'
    label.style.top = bbox.top - 30 + 'px'
    document.body.appendChild(label)
  })
})

await page.screenshot({ path: 'scripts/preview-svg.png', fullPage: true })
await browser.close()
console.log('saved scripts/preview-svg.png')
