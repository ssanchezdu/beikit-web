// Build-time fetch of the two latest Instagram posts.
// Reads IG_ACCESS_TOKEN + IG_USER_ID from env (server-only — never exposed to the client bundle)
// and writes a sanitized JSON to public/instagram-posts.json, which the UI consumes at runtime.
// Soft-fails: if credentials are missing or the API is down, build continues and the UI falls back
// to placeholder cards.

import { writeFile, mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'

const TOKEN = process.env.IG_ACCESS_TOKEN
const USER_ID = process.env.IG_USER_ID
const OUT = 'public/instagram-posts.json'
const LIMIT = 2
const GRAPH_VERSION = 'v21.0'
const FIELDS = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp'

function sanitizeCaption(raw) {
  if (!raw) return ''
  const firstLine = raw.split('\n')[0].trim()
  return firstLine.length > 80 ? firstLine.slice(0, 77) + '…' : firstLine
}

async function main() {
  if (!TOKEN || !USER_ID) {
    console.warn('[fetch-ig] IG_ACCESS_TOKEN or IG_USER_ID not set — skipping. UI will use fallback cards.')
    return
  }

  const url = `https://graph.facebook.com/${GRAPH_VERSION}/${USER_ID}/media?fields=${FIELDS}&limit=${LIMIT}&access_token=${TOKEN}`

  const res = await fetch(url)
  if (!res.ok) {
    const body = await res.text()
    // Redact token from any echoed URL in error messages.
    console.warn(`[fetch-ig] Graph API returned ${res.status}: ${body.replace(TOKEN, '[REDACTED]')}`)
    return
  }

  const { data = [] } = await res.json()
  const posts = data.slice(0, LIMIT).map((p) => ({
    id: p.id,
    caption: sanitizeCaption(p.caption),
    src: p.media_type === 'VIDEO' ? p.thumbnail_url : p.media_url,
    permalink: p.permalink,
    timestamp: p.timestamp,
  }))

  await mkdir(dirname(OUT), { recursive: true })
  await writeFile(OUT, JSON.stringify(posts, null, 2))
  console.log(`[fetch-ig] wrote ${posts.length} posts → ${OUT}`)
}

main().catch((e) => {
  // Never break the build on network errors — fallback UI is acceptable.
  console.warn('[fetch-ig] soft-fail:', e.message)
})
