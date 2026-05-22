import { useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../lib/i18n'
import { ProductCardCompact, type ImageShape } from '../ui/ProductCardCompact'
import { JellyWave } from '../ui/JellyWave'
import { MicroCtaContent } from '../ui/MicroCtaContent'
import { EASE_ENTRANCE } from '../../lib/motion'

const UBER_EATS_URL = 'https://www.ubereats.com/es/store/beikit-bakery/LbmFt-JFQYibr4MoySomkw'

const COOKIE_UBER_EATS_URLS: Record<string, string> = {
  'NY Classic':  'https://www.ubereats.com/es/store/beikit-bakery/LbmFt-JFQYibr4MoySomkw?mod=quickView&modctx=%257B%2522storeUuid%2522%253A%25222db985b7-e245-4188-9baf-8328c92a2693%2522%252C%2522sectionUuid%2522%253A%2522089e5020-f157-5c75-9985-d96c88550119%2522%252C%2522subsectionUuid%2522%253A%252217cb3cde-2586-5ead-b79b-e67392881687%2522%252C%2522itemUuid%2522%253A%25228383f8be-b6dc-512f-80d0-a1f0a41dc142%2522%252C%2522showSeeDetailsCTA%2522%253Atrue%257D&ps=1',
  Oreo:          'https://www.ubereats.com/es/store/beikit-bakery/LbmFt-JFQYibr4MoySomkw?diningMode=DELIVERY&mod=quickView&modctx=%257B%2522storeUuid%2522%253A%25222db985b7-e245-4188-9baf-8328c92a2693%2522%252C%2522sectionUuid%2522%253A%2522089e5020-f157-5c75-9985-d96c88550119%2522%252C%2522subsectionUuid%2522%253A%252217cb3cde-2586-5ead-b79b-e67392881687%2522%252C%2522itemUuid%2522%253A%2522406ca264-89b6-570e-a754-8f144ad00259%2522%252C%2522showSeeDetailsCTA%2522%253Atrue%257D&ps=1',
  Lotus:         'https://www.ubereats.com/es/store/beikit-bakery/LbmFt-JFQYibr4MoySomkw?diningMode=DELIVERY&mod=quickView&modctx=%257B%2522storeUuid%2522%253A%25222db985b7-e245-4188-9baf-8328c92a2693%2522%252C%2522sectionUuid%2522%253A%2522089e5020-f157-5c75-9985-d96c88550119%2522%252C%2522subsectionUuid%2522%253A%252217cb3cde-2586-5ead-b79b-e67392881687%2522%252C%2522itemUuid%2522%253A%252298553e06-f986-59ae-a261-570b55403a9e%2522%252C%2522showSeeDetailsCTA%2522%253Atrue%257D&ps=1',
  Pistacchio:    'https://www.ubereats.com/es/store/beikit-bakery/LbmFt-JFQYibr4MoySomkw?diningMode=DELIVERY&mod=quickView&modctx=%257B%2522storeUuid%2522%253A%25222db985b7-e245-4188-9baf-8328c92a2693%2522%252C%2522sectionUuid%2522%253A%2522089e5020-f157-5c75-9985-d96c88550119%2522%252C%2522subsectionUuid%2522%253A%252217cb3cde-2586-5ead-b79b-e67392881687%2522%252C%2522itemUuid%2522%253A%252278eb8d58-9618-5589-af3d-dd426aac28f0%2522%252C%2522showSeeDetailsCTA%2522%253Atrue%257D&ps=1',
  Kinder:        'https://www.ubereats.com/es/store/beikit-bakery/LbmFt-JFQYibr4MoySomkw?diningMode=DELIVERY&mod=quickView&modctx=%257B%2522storeUuid%2522%253A%25222db985b7-e245-4188-9baf-8328c92a2693%2522%252C%2522sectionUuid%2522%253A%2522089e5020-f157-5c75-9985-d96c88550119%2522%252C%2522subsectionUuid%2522%253A%252217cb3cde-2586-5ead-b79b-e67392881687%2522%252C%2522itemUuid%2522%253A%2522347a9aa9-5091-573c-bf50-e7008f9ff43c%2522%252C%2522showSeeDetailsCTA%2522%253Atrue%257D&ps=1',
  Dinosaurus:    'https://www.ubereats.com/es/store/beikit-bakery/LbmFt-JFQYibr4MoySomkw?diningMode=DELIVERY&mod=quickView&modctx=%257B%2522storeUuid%2522%253A%25222db985b7-e245-4188-9baf-8328c92a2693%2522%252C%2522sectionUuid%2522%253A%2522089e5020-f157-5c75-9985-d96c88550119%2522%252C%2522subsectionUuid%2522%253A%252217cb3cde-2586-5ead-b79b-e67392881687%2522%252C%2522itemUuid%2522%253A%2522146927de-2075-5727-8fd8-7238f843d697%2522%252C%2522showSeeDetailsCTA%2522%253Atrue%257D&ps=1',
  'Triple Choc': 'https://www.ubereats.com/es/store/beikit-bakery/LbmFt-JFQYibr4MoySomkw?diningMode=DELIVERY&mod=quickView&modctx=%257B%2522storeUuid%2522%253A%25222db985b7-e245-4188-9baf-8328c92a2693%2522%252C%2522sectionUuid%2522%253A%2522089e5020-f157-5c75-9985-d96c88550119%2522%252C%2522subsectionUuid%2522%253A%252217cb3cde-2586-5ead-b79b-e67392881687%2522%252C%2522itemUuid%2522%253A%2522964e5ace-5d5e-5fd3-8896-7a66224f917c%2522%252C%2522showSeeDetailsCTA%2522%253Atrue%257D&ps=1',
  'Red Velvet':  'https://www.ubereats.com/es/store/beikit-bakery/LbmFt-JFQYibr4MoySomkw?diningMode=DELIVERY&mod=quickView&modctx=%257B%2522storeUuid%2522%253A%25222db985b7-e245-4188-9baf-8328c92a2693%2522%252C%2522sectionUuid%2522%253A%2522089e5020-f157-5c75-9985-d96c88550119%2522%252C%2522subsectionUuid%2522%253A%252217cb3cde-2586-5ead-b79b-e67392881687%2522%252C%2522itemUuid%2522%253A%25229e53e067-fafd-5ba2-a9e4-2015d2a5577c%2522%252C%2522showSeeDetailsCTA%2522%253Atrue%257D&ps=1',
}
const FEATURED_COUNT = 3

/* Brand-consistent accent palette per category — warm, edible, non-generic. */
const ACCENTS = {
  // Kinder, Dinosaurus, NY Classic, Oreo, Red Velvet, Pistacchio, Triple Choc, Lotus
  cookies:     ['#ead7b8', '#f0d890', '#c97f3a', '#d9cfc2', '#d16a5a', '#b5c47a', '#a56b47', '#d49856'],
  // Flat list across both cheesecake subgroups in order
  cheesecakes: ['#f0e3cf', '#d9cfc2', '#b5c47a', '#d49856', '#ead7b8', '#eab0bd', '#d9cfc2', '#b5c47a', '#d49856'],
  // Oreo, Fresa, Dinosaurus, Vainilla, Chocolate, Lotus
  milkshakes:  ['#d9cfc2', '#eab0bd', '#f0d890', '#f6eadf', '#a56b47', '#d49856'],
  // Café Latte, Oreo, Matcha, French Vainilla, Lotus, Mocha, Mocha White, Chai
  otros:       ['#d9b88e', '#d9cfc2', '#b5c47a', '#ead7b8', '#d49856', '#a56b47', '#ead0c8', '#e8a45c'],
} as const

type Item = { name: string; price: string; desc: string }

/* Flatten cheesecakes (which come grouped) into a single list with group markers. */
function flattenCheesecakes(groups: { title: string; items: Item[] }[]): Item[] {
  return groups.flatMap((g) => g.items)
}

/* Definitive cookie photos, keyed by carta name (identical in ES and CA). */
const COOKIE_IMAGES: Record<string, string> = {
  'NY Classic': '/assets/images/nyclassic.webp',
  Oreo: '/assets/images/oreo.webp',
  Lotus: '/assets/images/lotus.webp',
  Pistacchio: '/assets/images/pistacchio.webp',
  Kinder: '/assets/images/kinder.webp',
  'Red Velvet': '/assets/images/redvelvet.webp',
  Dinosaurus: '/assets/images/dinosaurus.webp',
  'Triple Choc': '/assets/images/triplechoc.webp',
}

/* Latte photos keyed by carta name in both languages (ES "Café", CA "Cafè").
   Matcha and Chai have their own image; Café Mocha reuses the Chai photo and
   Café Lotus the Café Latte photo. Coffees with no entry fall back to cat.photo. */
const LATTE_IMAGES: Record<string, string> = {
  'Café Latte': '/assets/images/cafelattereg.webp',
  'Cafè Latte': '/assets/images/cafelattereg.webp',
  'Café Lotus': '/assets/images/cafelattereg.webp',
  'Cafè Lotus': '/assets/images/cafelattereg.webp',
  'Café Mocha': '/assets/images/chailatte.webp',
  'Cafè Mocha': '/assets/images/chailatte.webp',
  'Matcha Latte': '/assets/images/matcha.webp',
  'Chai Latte': '/assets/images/chailatte.webp',
}

/* Cheesecake photos — keyed by position in the flattened list (names repeat
   across the two groups, so a name key can't distinguish them).
   Indices 0-4 = "Horno cremosa" group · 5-8 = "Mousse fría" group. */
const CHEESECAKE_IMAGES: Record<number, string> = {
  0: '/assets/images/clasicaporcion.webp',
  1: '/assets/images/oreoporcion.webp',
  2: '/assets/images/pistachoporcion.webp',
  3: '/assets/images/lotusporcion.webp',
  4: '/assets/images/kinderporcion.webp',
  5: '/assets/images/fresa1.webp',
  6: '/assets/images/oreo1.webp',
  7: '/assets/images/pistacho1.webp',
  8: '/assets/images/lotus1.webp',
}

/* Milkshake photos — landscape product shots, keyed by carta name in both
   languages (ES "Chocolate"/"Fresa" · CA "Xocolata"/"Maduixa"). */
const MILKSHAKE_IMAGES: Record<string, string> = {
  Vainilla: '/assets/images/milkshake_vanilla.webp',
  Chocolate: '/assets/images/milkshake_chocolate.webp',
  Xocolata: '/assets/images/milkshake_chocolate.webp',
  Fresa: '/assets/images/milkshake_fresa.webp',
  Maduixa: '/assets/images/milkshake_fresa.webp',
  Oreo: '/assets/images/milkshake_oreo.webp',
  Lotus: '/assets/images/milkshake_lotus.webp',
  Dinosaurus: '/assets/images/milkshake_dinosaurus.webp',
}

const CHEESECAKE_UBER_EATS_URLS: Record<number, string> = {
  0: 'https://www.ubereats.com/es/store/beikit-bakery/LbmFt-JFQYibr4MoySomkw?diningMode=DELIVERY&mod=quickView&modctx=%257B%2522storeUuid%2522%253A%25222db985b7-e245-4188-9baf-8328c92a2693%2522%252C%2522sectionUuid%2522%253A%2522089e5020-f157-5c75-9985-d96c88550119%2522%252C%2522subsectionUuid%2522%253A%252250c5c103-28f6-5f6e-bee8-aaae21d2887a%2522%252C%2522itemUuid%2522%253A%2522f8305d88-c094-5cde-98ac-75355ba1fb20%2522%252C%2522showSeeDetailsCTA%2522%253Atrue%257D&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMkxhJTIwUm9jYSUyMGRlbCUyMFZhbGwlQzMlQThzJTIyJTJDJTIycmVmZXJlbmNlJTIyJTNBJTIyQ2hJSm5SaTBleVBJcEJJUk55SzZIWHBHekpRJTIyJTJDJTIycmVmZXJlbmNlVHlwZSUyMiUzQSUyMmdvb2dsZV9wbGFjZXMlMjIlMkMlMjJsYXRpdHVkZSUyMiUzQTQxLjU4MzQxNTIlMkMlMjJsb25naXR1ZGUlMjIlM0EyLjMyNTU5ODU5OTk5OTk5OTclN0Q%3D&ps=1',
  2: 'https://www.ubereats.com/es/store/beikit-bakery/LbmFt-JFQYibr4MoySomkw?diningMode=DELIVERY&mod=quickView&modctx=%257B%2522storeUuid%2522%253A%25222db985b7-e245-4188-9baf-8328c92a2693%2522%252C%2522sectionUuid%2522%253A%2522089e5020-f157-5c75-9985-d96c88550119%2522%252C%2522subsectionUuid%2522%253A%252250c5c103-28f6-5f6e-bee8-aaae21d2887a%2522%252C%2522itemUuid%2522%253A%25229d0f90dd-635e-5fe2-849d-c3c5f75d1e95%2522%252C%2522showSeeDetailsCTA%2522%253Atrue%257D&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMkxhJTIwUm9jYSUyMGRlbCUyMFZhbGwlQzMlQThzJTIyJTJDJTIycmVmZXJlbmNlJTIyJTNBJTIyQ2hJSm5SaTBleVBJcEJJUk55SzZIWHBHekpRJTIyJTJDJTIycmVmZXJlbmNlVHlwZSUyMiUzQSUyMmdvb2dsZV9wbGFjZXMlMjIlMkMlMjJsYXRpdHVkZSUyMiUzQTQxLjU4MzQxNTIlMkMlMjJsb25naXR1ZGUlMjIlM0EyLjMyNTU5ODU5OTk5OTk5OTclN0Q%3D&ps=1',
  3: 'https://www.ubereats.com/es/store/beikit-bakery/LbmFt-JFQYibr4MoySomkw?diningMode=DELIVERY&mod=quickView&modctx=%257B%2522storeUuid%2522%253A%25222db985b7-e245-4188-9baf-8328c92a2693%2522%252C%2522sectionUuid%2522%253A%2522089e5020-f157-5c75-9985-d96c88550119%2522%252C%2522subsectionUuid%2522%253A%252250c5c103-28f6-5f6e-bee8-aaae21d2887a%2522%252C%2522itemUuid%2522%253A%2522e53e29fd-c575-53c6-94d1-67dfca219c4f%2522%252C%2522showSeeDetailsCTA%2522%253Atrue%257D&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMkxhJTIwUm9jYSUyMGRlbCUyMFZhbGwlQzMlQThzJTIyJTJDJTIycmVmZXJlbmNlJTIyJTNBJTIyQ2hJSm5SaTBleVBJcEJJUk55SzZIWHBHekpRJTIyJTJDJTIycmVmZXJlbmNlVHlwZSUyMiUzQSUyMmdvb2dsZV9wbGFjZXMlMjIlMkMlMjJsYXRpdHVkZSUyMiUzQTQxLjU4MzQxNTIlMkMlMjJsb25naXR1ZGUlMjIlM0EyLjMyNTU5ODU5OTk5OTk5OTclN0Q%3D&ps=1',
  5: 'https://www.ubereats.com/es/store/beikit-bakery/LbmFt-JFQYibr4MoySomkw?diningMode=DELIVERY&mod=quickView&modctx=%257B%2522storeUuid%2522%253A%25222db985b7-e245-4188-9baf-8328c92a2693%2522%252C%2522sectionUuid%2522%253A%2522089e5020-f157-5c75-9985-d96c88550119%2522%252C%2522subsectionUuid%2522%253A%25221e0b4bd0-c81e-50fa-be4a-a5eaee8a742b%2522%252C%2522itemUuid%2522%253A%2522f73b1f5d-baf3-5058-b9f7-1f867895859e%2522%252C%2522showSeeDetailsCTA%2522%253Atrue%257D&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMkxhJTIwUm9jYSUyMGRlbCUyMFZhbGwlQzMlQThzJTIyJTJDJTIycmVmZXJlbmNlJTIyJTNBJTIyQ2hJSm5SaTBleVBJcEJJUk55SzZIWHBHekpRJTIyJTJDJTIycmVmZXJlbmNlVHlwZSUyMiUzQSUyMmdvb2dsZV9wbGFjZXMlMjIlMkMlMjJsYXRpdHVkZSUyMiUzQTQxLjU4MzQxNTIlMkMlMjJsb25naXR1ZGUlMjIlM0EyLjMyNTU5ODU5OTk5OTk5OTclN0Q%3D&ps=1',
  6: 'https://www.ubereats.com/es/store/beikit-bakery/LbmFt-JFQYibr4MoySomkw?diningMode=DELIVERY&mod=quickView&modctx=%257B%2522storeUuid%2522%253A%25222db985b7-e245-4188-9baf-8328c92a2693%2522%252C%2522sectionUuid%2522%253A%2522089e5020-f157-5c75-9985-d96c88550119%2522%252C%2522subsectionUuid%2522%253A%25221e0b4bd0-c81e-50fa-be4a-a5eaee8a742b%2522%252C%2522itemUuid%2522%253A%252206d6cba8-c73d-5521-94d5-a36110561a46%2522%252C%2522showSeeDetailsCTA%2522%253Atrue%257D&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMkxhJTIwUm9jYSUyMGRlbCUyMFZhbGwlQzMlQThzJTIyJTJDJTIycmVmZXJlbmNlJTIyJTNBJTIyQ2hJSm5SaTBleVBJcEJJUk55SzZIWHBHekpRJTIyJTJDJTIycmVmZXJlbmNlVHlwZSUyMiUzQSUyMmdvb2dsZV9wbGFjZXMlMjIlMkMlMjJsYXRpdHVkZSUyMiUzQTQxLjU4MzQxNTIlMkMlMjJsb25naXR1ZGUlMjIlM0EyLjMyNTU5ODU5OTk5OTk5OTclN0Q%3D&ps=1',
  7: 'https://www.ubereats.com/es/store/beikit-bakery/LbmFt-JFQYibr4MoySomkw?diningMode=DELIVERY&mod=quickView&modctx=%257B%2522storeUuid%2522%253A%25222db985b7-e245-4188-9baf-8328c92a2693%2522%252C%2522sectionUuid%2522%253A%2522089e5020-f157-5c75-9985-d96c88550119%2522%252C%2522subsectionUuid%2522%253A%25221e0b4bd0-c81e-50fa-be4a-a5eaee8a742b%2522%252C%2522itemUuid%2522%253A%2522a4b074a2-37d8-56c6-aec5-4a95f89603c1%2522%252C%2522showSeeDetailsCTA%2522%253Atrue%257D&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMkxhJTIwUm9jYSUyMGRlbCUyMFZhbGwlQzMlQThzJTIyJTJDJTIycmVmZXJlbmNlJTIyJTNBJTIyQ2hJSm5SaTBleVBJcEJJUk55SzZIWHBHekpRJTIyJTJDJTIycmVmZXJlbmNlVHlwZSUyMiUzQSUyMmdvb2dsZV9wbGFjZXMlMjIlMkMlMjJsYXRpdHVkZSUyMiUzQTQxLjU4MzQxNTIlMkMlMjJsb25naXR1ZGUlMjIlM0EyLjMyNTU5ODU5OTk5OTk5OTclN0Q%3D&ps=1',
  8: 'https://www.ubereats.com/es/store/beikit-bakery/LbmFt-JFQYibr4MoySomkw?diningMode=DELIVERY&mod=quickView&modctx=%257B%2522storeUuid%2522%253A%25222db985b7-e245-4188-9baf-8328c92a2693%2522%252C%2522sectionUuid%2522%253A%2522089e5020-f157-5c75-9985-d96c88550119%2522%252C%2522subsectionUuid%2522%253A%25221e0b4bd0-c81e-50fa-be4a-a5eaee8a742b%2522%252C%2522itemUuid%2522%253A%2522f6659b0a-79f9-5560-a2ac-3c2b2a1637f4%2522%252C%2522showSeeDetailsCTA%2522%253Atrue%257D&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMkxhJTIwUm9jYSUyMGRlbCUyMFZhbGwlQzMlQThzJTIyJTJDJTIycmVmZXJlbmNlJTIyJTNBJTIyQ2hJSm5SaTBleVBJcEJJUk55SzZIWHBHekpRJTIyJTJDJTIycmVmZXJlbmNlVHlwZSUyMiUzQSUyMmdvb2dsZV9wbGFjZXMlMjIlMkMlMjJsYXRpdHVkZSUyMiUzQTQxLjU4MzQxNTIlMkMlMjJsb25naXR1ZGUlMjIlM0EyLjMyNTU5ODU5OTk5OTk5OTclN0Q%3D&ps=1',
}

const MILKSHAKE_UBER_EATS_URLS: Record<string, string> = {
  Vainilla:   'https://www.ubereats.com/es/store/beikit-bakery/LbmFt-JFQYibr4MoySomkw?diningMode=DELIVERY&mod=quickView&modctx=%257B%2522storeUuid%2522%253A%25222db985b7-e245-4188-9baf-8328c92a2693%2522%252C%2522sectionUuid%2522%253A%2522089e5020-f157-5c75-9985-d96c88550119%2522%252C%2522subsectionUuid%2522%253A%25221c757037-1f85-5160-b794-a454c23b9b6c%2522%252C%2522itemUuid%2522%253A%25221d937f3a-866f-5965-ae96-3155a5285f53%2522%252C%2522showSeeDetailsCTA%2522%253Atrue%257D&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMkxhJTIwUm9jYSUyMGRlbCUyMFZhbGwlQzMlQThzJTIyJTJDJTIycmVmZXJlbmNlJTIyJTNBJTIyQ2hJSm5SaTBleVBJcEJJUk55SzZIWHBHekpRJTIyJTJDJTIycmVmZXJlbmNlVHlwZSUyMiUzQSUyMmdvb2dsZV9wbGFjZXMlMjIlMkMlMjJsYXRpdHVkZSUyMiUzQTQxLjU4MzQxNTIlMkMlMjJsb25naXR1ZGUlMjIlM0EyLjMyNTU5ODU5OTk5OTk5OTclN0Q%3D&ps=1',
  Chocolate:  'https://www.ubereats.com/es/store/beikit-bakery/LbmFt-JFQYibr4MoySomkw?diningMode=DELIVERY&mod=quickView&modctx=%257B%2522storeUuid%2522%253A%25222db985b7-e245-4188-9baf-8328c92a2693%2522%252C%2522sectionUuid%2522%253A%2522089e5020-f157-5c75-9985-d96c88550119%2522%252C%2522subsectionUuid%2522%253A%25221c757037-1f85-5160-b794-a454c23b9b6c%2522%252C%2522itemUuid%2522%253A%252242e8be06-139c-57d0-9b85-2fcf89067f21%2522%252C%2522showSeeDetailsCTA%2522%253Atrue%257D&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMkxhJTIwUm9jYSUyMGRlbCUyMFZhbGwlQzMlQThzJTIyJTJDJTIycmVmZXJlbmNlJTIyJTNBJTIyQ2hJSm5SaTBleVBJcEJJUk55SzZIWHBHekpRJTIyJTJDJTIycmVmZXJlbmNlVHlwZSUyMiUzQSUyMmdvb2dsZV9wbGFjZXMlMjIlMkMlMjJsYXRpdHVkZSUyMiUzQTQxLjU4MzQxNTIlMkMlMjJsb25naXR1ZGUlMjIlM0EyLjMyNTU5ODU5OTk5OTk5OTclN0Q%3D&ps=1',
  Xocolata:   'https://www.ubereats.com/es/store/beikit-bakery/LbmFt-JFQYibr4MoySomkw?diningMode=DELIVERY&mod=quickView&modctx=%257B%2522storeUuid%2522%253A%25222db985b7-e245-4188-9baf-8328c92a2693%2522%252C%2522sectionUuid%2522%253A%2522089e5020-f157-5c75-9985-d96c88550119%2522%252C%2522subsectionUuid%2522%253A%25221c757037-1f85-5160-b794-a454c23b9b6c%2522%252C%2522itemUuid%2522%253A%252242e8be06-139c-57d0-9b85-2fcf89067f21%2522%252C%2522showSeeDetailsCTA%2522%253Atrue%257D&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMkxhJTIwUm9jYSUyMGRlbCUyMFZhbGwlQzMlQThzJTIyJTJDJTIycmVmZXJlbmNlJTIyJTNBJTIyQ2hJSm5SaTBleVBJcEJJUk55SzZIWHBHekpRJTIyJTJDJTIycmVmZXJlbmNlVHlwZSUyMiUzQSUyMmdvb2dsZV9wbGFjZXMlMjIlMkMlMjJsYXRpdHVkZSUyMiUzQTQxLjU4MzQxNTIlMkMlMjJsb25naXR1ZGUlMjIlM0EyLjMyNTU5ODU5OTk5OTk5OTclN0Q%3D&ps=1',
  Fresa:      'https://www.ubereats.com/es/store/beikit-bakery/LbmFt-JFQYibr4MoySomkw?diningMode=DELIVERY&mod=quickView&modctx=%257B%2522storeUuid%2522%253A%25222db985b7-e245-4188-9baf-8328c92a2693%2522%252C%2522sectionUuid%2522%253A%2522089e5020-f157-5c75-9985-d96c88550119%2522%252C%2522subsectionUuid%2522%253A%25221c757037-1f85-5160-b794-a454c23b9b6c%2522%252C%2522itemUuid%2522%253A%25228374b889-6844-585a-b833-d70e64e4d87d%2522%252C%2522showSeeDetailsCTA%2522%253Atrue%257D&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMkxhJTIwUm9jYSUyMGRlbCUyMFZhbGwlQzMlQThzJTIyJTJDJTIycmVmZXJlbmNlJTIyJTNBJTIyQ2hJSm5SaTBleVBJcEJJUk55SzZIWHBHekpRJTIyJTJDJTIycmVmZXJlbmNlVHlwZSUyMiUzQSUyMmdvb2dsZV9wbGFjZXMlMjIlMkMlMjJsYXRpdHVkZSUyMiUzQTQxLjU4MzQxNTIlMkMlMjJsb25naXR1ZGUlMjIlM0EyLjMyNTU5ODU5OTk5OTk5OTclN0Q%3D&ps=1',
  Maduixa:    'https://www.ubereats.com/es/store/beikit-bakery/LbmFt-JFQYibr4MoySomkw?diningMode=DELIVERY&mod=quickView&modctx=%257B%2522storeUuid%2522%253A%25222db985b7-e245-4188-9baf-8328c92a2693%2522%252C%2522sectionUuid%2522%253A%2522089e5020-f157-5c75-9985-d96c88550119%2522%252C%2522subsectionUuid%2522%253A%25221c757037-1f85-5160-b794-a454c23b9b6c%2522%252C%2522itemUuid%2522%253A%25228374b889-6844-585a-b833-d70e64e4d87d%2522%252C%2522showSeeDetailsCTA%2522%253Atrue%257D&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMkxhJTIwUm9jYSUyMGRlbCUyMFZhbGwlQzMlQThzJTIyJTJDJTIycmVmZXJlbmNlJTIyJTNBJTIyQ2hJSm5SaTBleVBJcEJJUk55SzZIWHBHekpRJTIyJTJDJTIycmVmZXJlbmNlVHlwZSUyMiUzQSUyMmdvb2dsZV9wbGFjZXMlMjIlMkMlMjJsYXRpdHVkZSUyMiUzQTQxLjU4MzQxNTIlMkMlMjJsb25naXR1ZGUlMjIlM0EyLjMyNTU5ODU5OTk5OTk5OTclN0Q%3D&ps=1',
  Oreo:       'https://www.ubereats.com/es/store/beikit-bakery/LbmFt-JFQYibr4MoySomkw?diningMode=DELIVERY&mod=quickView&modctx=%257B%2522storeUuid%2522%253A%25222db985b7-e245-4188-9baf-8328c92a2693%2522%252C%2522sectionUuid%2522%253A%2522089e5020-f157-5c75-9985-d96c88550119%2522%252C%2522subsectionUuid%2522%253A%25221c757037-1f85-5160-b794-a454c23b9b6c%2522%252C%2522itemUuid%2522%253A%2522ed540052-0f55-5adc-9b22-d36d746668c5%2522%252C%2522showSeeDetailsCTA%2522%253Atrue%257D&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMkxhJTIwUm9jYSUyMGRlbCUyMFZhbGwlQzMlQThzJTIyJTJDJTIycmVmZXJlbmNlJTIyJTNBJTIyQ2hJSm5SaTBleVBJcEJJUk55SzZIWHBHekpRJTIyJTJDJTIycmVmZXJlbmNlVHlwZSUyMiUzQSUyMmdvb2dsZV9wbGFjZXMlMjIlMkMlMjJsYXRpdHVkZSUyMiUzQTQxLjU4MzQxNTIlMkMlMjJsb25naXR1ZGUlMjIlM0EyLjMyNTU5ODU5OTk5OTk5OTclN0Q%3D&ps=1',
  Lotus:      'https://www.ubereats.com/es/store/beikit-bakery/LbmFt-JFQYibr4MoySomkw?diningMode=DELIVERY&mod=quickView&modctx=%257B%2522storeUuid%2522%253A%25222db985b7-e245-4188-9baf-8328c92a2693%2522%252C%2522sectionUuid%2522%253A%2522089e5020-f157-5c75-9985-d96c88550119%2522%252C%2522subsectionUuid%2522%253A%25221c757037-1f85-5160-b794-a454c23b9b6c%2522%252C%2522itemUuid%2522%253A%2522ae7587b4-f939-55e2-b9e4-987c2e8b6373%2522%252C%2522showSeeDetailsCTA%2522%253Atrue%257D&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMkxhJTIwUm9jYSUyMGRlbCUyMFZhbGwlQzMlQThzJTIyJTJDJTIycmVmZXJlbmNlJTIyJTNBJTIyQ2hJSm5SaTBleVBJcEJJUk55SzZIWHBHekpRJTIyJTJDJTIycmVmZXJlbmNlVHlwZSUyMiUzQSUyMmdvb2dsZV9wbGFjZXMlMjIlMkMlMjJsYXRpdHVkZSUyMiUzQTQxLjU4MzQxNTIlMkMlMjJsb25naXR1ZGUlMjIlM0EyLjMyNTU5ODU5OTk5OTk5OTclN0Q%3D&ps=1',
  Dinosaurus: 'https://www.ubereats.com/es/store/beikit-bakery/LbmFt-JFQYibr4MoySomkw?diningMode=DELIVERY&mod=quickView&modctx=%257B%2522storeUuid%2522%253A%25222db985b7-e245-4188-9baf-8328c92a2693%2522%252C%2522sectionUuid%2522%253A%2522089e5020-f157-5c75-9985-d96c88550119%2522%252C%2522subsectionUuid%2522%253A%25221c757037-1f85-5160-b794-a454c23b9b6c%2522%252C%2522itemUuid%2522%253A%25227113faae-8193-5452-8087-be8f1210dafd%2522%252C%2522showSeeDetailsCTA%2522%253Atrue%257D&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMkxhJTIwUm9jYSUyMGRlbCUyMFZhbGwlQzMlQThzJTIyJTJDJTIycmVmZXJlbmNlJTIyJTNBJTIyQ2hJSm5SaTBleVBJcEJJUk55SzZIWHBHekpRJTIyJTJDJTIycmVmZXJlbmNlVHlwZSUyMiUzQSUyMmdvb2dsZV9wbGFjZXMlMjIlMkMlMjJsYXRpdHVkZSUyMiUzQTQxLjU4MzQxNTIlMkMlMjJsb25naXR1ZGUlMjIlM0EyLjMyNTU5ODU5OTk5OTk5OTclN0Q%3D&ps=1',
}

/* Latte CTA links — keyed by carta name in both languages (ES "Café", CA "Cafè").
   Several coffees intentionally share an Uber Eats item (e.g. the flavoured
   coffees point to the same listing). */
const LATTE_UBER_EATS_URLS: Record<string, string> = {
  'Café Latte':           'https://www.ubereats.com/es/store/beikit-bakery/LbmFt-JFQYibr4MoySomkw?diningMode=DELIVERY&mod=quickView&modctx=%257B%2522storeUuid%2522%253A%25222db985b7-e245-4188-9baf-8328c92a2693%2522%252C%2522sectionUuid%2522%253A%2522089e5020-f157-5c75-9985-d96c88550119%2522%252C%2522subsectionUuid%2522%253A%25229f1c3eda-63fe-5497-9327-6dfe0d642c47%2522%252C%2522itemUuid%2522%253A%252244bb6bfc-c41c-5f3d-93aa-efdd180e9a45%2522%252C%2522showSeeDetailsCTA%2522%253Atrue%257D&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMkxhJTIwUm9jYSUyMGRlbCUyMFZhbGwlQzMlQThzJTIyJTJDJTIycmVmZXJlbmNlJTIyJTNBJTIyQ2hJSm5SaTBleVBJcEJJUk55SzZIWHBHekpRJTIyJTJDJTIycmVmZXJlbmNlVHlwZSUyMiUzQSUyMmdvb2dsZV9wbGFjZXMlMjIlMkMlMjJsYXRpdHVkZSUyMiUzQTQxLjU4MzQxNTIlMkMlMjJsb25naXR1ZGUlMjIlM0EyLjMyNTU5ODU5OTk5OTk5OTclN0Q%3D&ps=1',
  'Cafè Latte':           'https://www.ubereats.com/es/store/beikit-bakery/LbmFt-JFQYibr4MoySomkw?diningMode=DELIVERY&mod=quickView&modctx=%257B%2522storeUuid%2522%253A%25222db985b7-e245-4188-9baf-8328c92a2693%2522%252C%2522sectionUuid%2522%253A%2522089e5020-f157-5c75-9985-d96c88550119%2522%252C%2522subsectionUuid%2522%253A%25229f1c3eda-63fe-5497-9327-6dfe0d642c47%2522%252C%2522itemUuid%2522%253A%252244bb6bfc-c41c-5f3d-93aa-efdd180e9a45%2522%252C%2522showSeeDetailsCTA%2522%253Atrue%257D&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMkxhJTIwUm9jYSUyMGRlbCUyMFZhbGwlQzMlQThzJTIyJTJDJTIycmVmZXJlbmNlJTIyJTNBJTIyQ2hJSm5SaTBleVBJcEJJUk55SzZIWHBHekpRJTIyJTJDJTIycmVmZXJlbmNlVHlwZSUyMiUzQSUyMmdvb2dsZV9wbGFjZXMlMjIlMkMlMjJsYXRpdHVkZSUyMiUzQTQxLjU4MzQxNTIlMkMlMjJsb25naXR1ZGUlMjIlM0EyLjMyNTU5ODU5OTk5OTk5OTclN0Q%3D&ps=1',
  'Café French Vainilla': 'https://www.ubereats.com/es/store/beikit-bakery/LbmFt-JFQYibr4MoySomkw?diningMode=DELIVERY&mod=quickView&modctx=%257B%2522storeUuid%2522%253A%25222db985b7-e245-4188-9baf-8328c92a2693%2522%252C%2522sectionUuid%2522%253A%2522089e5020-f157-5c75-9985-d96c88550119%2522%252C%2522subsectionUuid%2522%253A%25229f1c3eda-63fe-5497-9327-6dfe0d642c47%2522%252C%2522itemUuid%2522%253A%2522f77eada7-67d7-5397-a7b4-d24cf310d8a2%2522%252C%2522showSeeDetailsCTA%2522%253Atrue%257D&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMkxhJTIwUm9jYSUyMGRlbCUyMFZhbGwlQzMlQThzJTIyJTJDJTIycmVmZXJlbmNlJTIyJTNBJTIyQ2hJSm5SaTBleVBJcEJJUk55SzZIWHBHekpRJTIyJTJDJTIycmVmZXJlbmNlVHlwZSUyMiUzQSUyMmdvb2dsZV9wbGFjZXMlMjIlMkMlMjJsYXRpdHVkZSUyMiUzQTQxLjU4MzQxNTIlMkMlMjJsb25naXR1ZGUlMjIlM0EyLjMyNTU5ODU5OTk5OTk5OTclN0Q%3D&ps=1',
  'Cafè French Vainilla': 'https://www.ubereats.com/es/store/beikit-bakery/LbmFt-JFQYibr4MoySomkw?diningMode=DELIVERY&mod=quickView&modctx=%257B%2522storeUuid%2522%253A%25222db985b7-e245-4188-9baf-8328c92a2693%2522%252C%2522sectionUuid%2522%253A%2522089e5020-f157-5c75-9985-d96c88550119%2522%252C%2522subsectionUuid%2522%253A%25229f1c3eda-63fe-5497-9327-6dfe0d642c47%2522%252C%2522itemUuid%2522%253A%2522f77eada7-67d7-5397-a7b4-d24cf310d8a2%2522%252C%2522showSeeDetailsCTA%2522%253Atrue%257D&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMkxhJTIwUm9jYSUyMGRlbCUyMFZhbGwlQzMlQThzJTIyJTJDJTIycmVmZXJlbmNlJTIyJTNBJTIyQ2hJSm5SaTBleVBJcEJJUk55SzZIWHBHekpRJTIyJTJDJTIycmVmZXJlbmNlVHlwZSUyMiUzQSUyMmdvb2dsZV9wbGFjZXMlMjIlMkMlMjJsYXRpdHVkZSUyMiUzQTQxLjU4MzQxNTIlMkMlMjJsb25naXR1ZGUlMjIlM0EyLjMyNTU5ODU5OTk5OTk5OTclN0Q%3D&ps=1',
  'Café Oreo':            'https://www.ubereats.com/es/store/beikit-bakery/LbmFt-JFQYibr4MoySomkw?diningMode=DELIVERY&mod=quickView&modctx=%257B%2522storeUuid%2522%253A%25222db985b7-e245-4188-9baf-8328c92a2693%2522%252C%2522sectionUuid%2522%253A%2522089e5020-f157-5c75-9985-d96c88550119%2522%252C%2522subsectionUuid%2522%253A%25229f1c3eda-63fe-5497-9327-6dfe0d642c47%2522%252C%2522itemUuid%2522%253A%2522f77eada7-67d7-5397-a7b4-d24cf310d8a2%2522%252C%2522showSeeDetailsCTA%2522%253Atrue%257D&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMkxhJTIwUm9jYSUyMGRlbCUyMFZhbGwlQzMlQThzJTIyJTJDJTIycmVmZXJlbmNlJTIyJTNBJTIyQ2hJSm5SaTBleVBJcEJJUk55SzZIWHBHekpRJTIyJTJDJTIycmVmZXJlbmNlVHlwZSUyMiUzQSUyMmdvb2dsZV9wbGFjZXMlMjIlMkMlMjJsYXRpdHVkZSUyMiUzQTQxLjU4MzQxNTIlMkMlMjJsb25naXR1ZGUlMjIlM0EyLjMyNTU5ODU5OTk5OTk5OTclN0Q%3D&ps=1',
  'Cafè Oreo':            'https://www.ubereats.com/es/store/beikit-bakery/LbmFt-JFQYibr4MoySomkw?diningMode=DELIVERY&mod=quickView&modctx=%257B%2522storeUuid%2522%253A%25222db985b7-e245-4188-9baf-8328c92a2693%2522%252C%2522sectionUuid%2522%253A%2522089e5020-f157-5c75-9985-d96c88550119%2522%252C%2522subsectionUuid%2522%253A%25229f1c3eda-63fe-5497-9327-6dfe0d642c47%2522%252C%2522itemUuid%2522%253A%2522f77eada7-67d7-5397-a7b4-d24cf310d8a2%2522%252C%2522showSeeDetailsCTA%2522%253Atrue%257D&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMkxhJTIwUm9jYSUyMGRlbCUyMFZhbGwlQzMlQThzJTIyJTJDJTIycmVmZXJlbmNlJTIyJTNBJTIyQ2hJSm5SaTBleVBJcEJJUk55SzZIWHBHekpRJTIyJTJDJTIycmVmZXJlbmNlVHlwZSUyMiUzQSUyMmdvb2dsZV9wbGFjZXMlMjIlMkMlMjJsYXRpdHVkZSUyMiUzQTQxLjU4MzQxNTIlMkMlMjJsb25naXR1ZGUlMjIlM0EyLjMyNTU5ODU5OTk5OTk5OTclN0Q%3D&ps=1',
  'Café Lotus':           'https://www.ubereats.com/es/store/beikit-bakery/LbmFt-JFQYibr4MoySomkw?diningMode=DELIVERY&mod=quickView&modctx=%257B%2522storeUuid%2522%253A%25222db985b7-e245-4188-9baf-8328c92a2693%2522%252C%2522sectionUuid%2522%253A%2522089e5020-f157-5c75-9985-d96c88550119%2522%252C%2522subsectionUuid%2522%253A%25229f1c3eda-63fe-5497-9327-6dfe0d642c47%2522%252C%2522itemUuid%2522%253A%252244bb6bfc-c41c-5f3d-93aa-efdd180e9a45%2522%252C%2522showSeeDetailsCTA%2522%253Atrue%257D&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMkxhJTIwUm9jYSUyMGRlbCUyMFZhbGwlQzMlQThzJTIyJTJDJTIycmVmZXJlbmNlJTIyJTNBJTIyQ2hJSm5SaTBleVBJcEJJUk55SzZIWHBHekpRJTIyJTJDJTIycmVmZXJlbmNlVHlwZSUyMiUzQSUyMmdvb2dsZV9wbGFjZXMlMjIlMkMlMjJsYXRpdHVkZSUyMiUzQTQxLjU4MzQxNTIlMkMlMjJsb25naXR1ZGUlMjIlM0EyLjMyNTU5ODU5OTk5OTk5OTclN0Q%3D&ps=1',
  'Cafè Lotus':           'https://www.ubereats.com/es/store/beikit-bakery/LbmFt-JFQYibr4MoySomkw?diningMode=DELIVERY&mod=quickView&modctx=%257B%2522storeUuid%2522%253A%25222db985b7-e245-4188-9baf-8328c92a2693%2522%252C%2522sectionUuid%2522%253A%2522089e5020-f157-5c75-9985-d96c88550119%2522%252C%2522subsectionUuid%2522%253A%25229f1c3eda-63fe-5497-9327-6dfe0d642c47%2522%252C%2522itemUuid%2522%253A%252244bb6bfc-c41c-5f3d-93aa-efdd180e9a45%2522%252C%2522showSeeDetailsCTA%2522%253Atrue%257D&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMkxhJTIwUm9jYSUyMGRlbCUyMFZhbGwlQzMlQThzJTIyJTJDJTIycmVmZXJlbmNlJTIyJTNBJTIyQ2hJSm5SaTBleVBJcEJJUk55SzZIWHBHekpRJTIyJTJDJTIycmVmZXJlbmNlVHlwZSUyMiUzQSUyMmdvb2dsZV9wbGFjZXMlMjIlMkMlMjJsYXRpdHVkZSUyMiUzQTQxLjU4MzQxNTIlMkMlMjJsb25naXR1ZGUlMjIlM0EyLjMyNTU5ODU5OTk5OTk5OTclN0Q%3D&ps=1',
  'Café Mocha':           'https://www.ubereats.com/es/store/beikit-bakery/LbmFt-JFQYibr4MoySomkw?diningMode=DELIVERY&mod=quickView&modctx=%257B%2522storeUuid%2522%253A%25222db985b7-e245-4188-9baf-8328c92a2693%2522%252C%2522sectionUuid%2522%253A%2522089e5020-f157-5c75-9985-d96c88550119%2522%252C%2522subsectionUuid%2522%253A%25229f1c3eda-63fe-5497-9327-6dfe0d642c47%2522%252C%2522itemUuid%2522%253A%2522f77eada7-67d7-5397-a7b4-d24cf310d8a2%2522%252C%2522showSeeDetailsCTA%2522%253Atrue%257D&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMkxhJTIwUm9jYSUyMGRlbCUyMFZhbGwlQzMlQThzJTIyJTJDJTIycmVmZXJlbmNlJTIyJTNBJTIyQ2hJSm5SaTBleVBJcEJJUk55SzZIWHBHekpRJTIyJTJDJTIycmVmZXJlbmNlVHlwZSUyMiUzQSUyMmdvb2dsZV9wbGFjZXMlMjIlMkMlMjJsYXRpdHVkZSUyMiUzQTQxLjU4MzQxNTIlMkMlMjJsb25naXR1ZGUlMjIlM0EyLjMyNTU5ODU5OTk5OTk5OTclN0Q%3D&ps=1',
  'Cafè Mocha':           'https://www.ubereats.com/es/store/beikit-bakery/LbmFt-JFQYibr4MoySomkw?diningMode=DELIVERY&mod=quickView&modctx=%257B%2522storeUuid%2522%253A%25222db985b7-e245-4188-9baf-8328c92a2693%2522%252C%2522sectionUuid%2522%253A%2522089e5020-f157-5c75-9985-d96c88550119%2522%252C%2522subsectionUuid%2522%253A%25229f1c3eda-63fe-5497-9327-6dfe0d642c47%2522%252C%2522itemUuid%2522%253A%2522f77eada7-67d7-5397-a7b4-d24cf310d8a2%2522%252C%2522showSeeDetailsCTA%2522%253Atrue%257D&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMkxhJTIwUm9jYSUyMGRlbCUyMFZhbGwlQzMlQThzJTIyJTJDJTIycmVmZXJlbmNlJTIyJTNBJTIyQ2hJSm5SaTBleVBJcEJJUk55SzZIWHBHekpRJTIyJTJDJTIycmVmZXJlbmNlVHlwZSUyMiUzQSUyMmdvb2dsZV9wbGFjZXMlMjIlMkMlMjJsYXRpdHVkZSUyMiUzQTQxLjU4MzQxNTIlMkMlMjJsb25naXR1ZGUlMjIlM0EyLjMyNTU5ODU5OTk5OTk5OTclN0Q%3D&ps=1',
  'Café Mocha White':     'https://www.ubereats.com/es/store/beikit-bakery/LbmFt-JFQYibr4MoySomkw?diningMode=DELIVERY&mod=quickView&modctx=%257B%2522storeUuid%2522%253A%25222db985b7-e245-4188-9baf-8328c92a2693%2522%252C%2522sectionUuid%2522%253A%2522089e5020-f157-5c75-9985-d96c88550119%2522%252C%2522subsectionUuid%2522%253A%25229f1c3eda-63fe-5497-9327-6dfe0d642c47%2522%252C%2522itemUuid%2522%253A%2522f77eada7-67d7-5397-a7b4-d24cf310d8a2%2522%252C%2522showSeeDetailsCTA%2522%253Atrue%257D&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMkxhJTIwUm9jYSUyMGRlbCUyMFZhbGwlQzMlQThzJTIyJTJDJTIycmVmZXJlbmNlJTIyJTNBJTIyQ2hJSm5SaTBleVBJcEJJUk55SzZIWHBHekpRJTIyJTJDJTIycmVmZXJlbmNlVHlwZSUyMiUzQSUyMmdvb2dsZV9wbGFjZXMlMjIlMkMlMjJsYXRpdHVkZSUyMiUzQTQxLjU4MzQxNTIlMkMlMjJsb25naXR1ZGUlMjIlM0EyLjMyNTU5ODU5OTk5OTk5OTclN0Q%3D&ps=1',
  'Cafè Mocha White':     'https://www.ubereats.com/es/store/beikit-bakery/LbmFt-JFQYibr4MoySomkw?diningMode=DELIVERY&mod=quickView&modctx=%257B%2522storeUuid%2522%253A%25222db985b7-e245-4188-9baf-8328c92a2693%2522%252C%2522sectionUuid%2522%253A%2522089e5020-f157-5c75-9985-d96c88550119%2522%252C%2522subsectionUuid%2522%253A%25229f1c3eda-63fe-5497-9327-6dfe0d642c47%2522%252C%2522itemUuid%2522%253A%2522f77eada7-67d7-5397-a7b4-d24cf310d8a2%2522%252C%2522showSeeDetailsCTA%2522%253Atrue%257D&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMkxhJTIwUm9jYSUyMGRlbCUyMFZhbGwlQzMlQThzJTIyJTJDJTIycmVmZXJlbmNlJTIyJTNBJTIyQ2hJSm5SaTBleVBJcEJJUk55SzZIWHBHekpRJTIyJTJDJTIycmVmZXJlbmNlVHlwZSUyMiUzQSUyMmdvb2dsZV9wbGFjZXMlMjIlMkMlMjJsYXRpdHVkZSUyMiUzQTQxLjU4MzQxNTIlMkMlMjJsb25naXR1ZGUlMjIlM0EyLjMyNTU5ODU5OTk5OTk5OTclN0Q%3D&ps=1',
  'Matcha Latte':         'https://www.ubereats.com/es/store/beikit-bakery/LbmFt-JFQYibr4MoySomkw?diningMode=DELIVERY&mod=quickView&modctx=%257B%2522storeUuid%2522%253A%25222db985b7-e245-4188-9baf-8328c92a2693%2522%252C%2522sectionUuid%2522%253A%2522089e5020-f157-5c75-9985-d96c88550119%2522%252C%2522subsectionUuid%2522%253A%25229f1c3eda-63fe-5497-9327-6dfe0d642c47%2522%252C%2522itemUuid%2522%253A%2522a1594486-e8a5-5d65-9e1b-d989cd1ec0b4%2522%252C%2522showSeeDetailsCTA%2522%253Atrue%257D&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMkxhJTIwUm9jYSUyMGRlbCUyMFZhbGwlQzMlQThzJTIyJTJDJTIycmVmZXJlbmNlJTIyJTNBJTIyQ2hJSm5SaTBleVBJcEJJUk55SzZIWHBHekpRJTIyJTJDJTIycmVmZXJlbmNlVHlwZSUyMiUzQSUyMmdvb2dsZV9wbGFjZXMlMjIlMkMlMjJsYXRpdHVkZSUyMiUzQTQxLjU4MzQxNTIlMkMlMjJsb25naXR1ZGUlMjIlM0EyLjMyNTU5ODU5OTk5OTk5OTclN0Q%3D&ps=1',
  'Chai Latte':           'https://www.ubereats.com/es/store/beikit-bakery/LbmFt-JFQYibr4MoySomkw?diningMode=DELIVERY&mod=quickView&modctx=%257B%2522storeUuid%2522%253A%25222db985b7-e245-4188-9baf-8328c92a2693%2522%252C%2522sectionUuid%2522%253A%2522089e5020-f157-5c75-9985-d96c88550119%2522%252C%2522subsectionUuid%2522%253A%25229f1c3eda-63fe-5497-9327-6dfe0d642c47%2522%252C%2522itemUuid%2522%253A%25226e792c6d-29d2-592a-84fa-c38142830d1c%2522%252C%2522showSeeDetailsCTA%2522%253Atrue%257D&pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMkxhJTIwUm9jYSUyMGRlbCUyMFZhbGwlQzMlQThzJTIyJTJDJTIycmVmZXJlbmNlJTIyJTNBJTIyQ2hJSm5SaTBleVBJcEJJUk55SzZIWHBHekpRJTIyJTJDJTIycmVmZXJlbmNlVHlwZSUyMiUzQSUyMmdvb2dsZV9wbGFjZXMlMjIlMkMlMjJsYXRpdHVkZSUyMiUzQTQxLjU4MzQxNTIlMkMlMjJsb25naXR1ZGUlMjIlM0EyLjMyNTU5ODU5OTk5OTk5OTclN0Q%3D&ps=1',
}

export function MenuSection() {
  const { t } = useLanguage()
  const m = t.menu

  const cheesecakeItems = flattenCheesecakes(m.items.cheesecakes)

  const categories = [
    {
      key: 'cookies' as const,
      titleType: 'svg' as const,
      eyebrow: 'Heartmade',
      title: m.cookies.title,
      description: m.cookies.description,
      items: m.items.cookies,
      photo: '/assets/svg/sticker_cookies.svg',
      itemImages: COOKIE_IMAGES,
      itemUrls: COOKIE_UBER_EATS_URLS,
      imageShape: 'square' as const,
    },
    {
      key: 'cheesecakes' as const,
      titleType: 'svg' as const,
      eyebrow: 'Creamy',
      title: m.cheesecakes.title,
      description: m.cheesecakes.description,
      items: cheesecakeItems,
      photo: '/assets/svg/sticker_cheesecake.svg',
      itemImagesByIndex: CHEESECAKE_IMAGES,
      itemUrlsByIndex: CHEESECAKE_UBER_EATS_URLS,
      imageShape: 'landscape' as const,
    },
    {
      key: 'milkshakes' as const,
      titleType: 'text' as const,
      eyebrow: 'Heartmade',
      title: m.milkshakes.title,
      description: m.milkshakes.description,
      items: m.items.milkshakes,
      photo: '/assets/images/milkshake_vanilla.webp',
      itemImages: MILKSHAKE_IMAGES,
      itemUrls: MILKSHAKE_UBER_EATS_URLS,
      imageShape: 'tall' as const,
    },
    {
      key: 'otros' as const,
      titleType: 'text' as const,
      eyebrow: 'Heartmade',
      title: m.otros.title,
      description: m.otros.description,
      items: m.items.otros,
      photo: '/assets/images/cafelatte.webp',
      itemImages: LATTE_IMAGES,
      itemUrls: LATTE_UBER_EATS_URLS,
      imageShape: 'tall' as const,
    },
  ]

  return (
    <section
      id="menu"
      className="relative overflow-hidden"
      style={{ backgroundColor: '#320e10' }}
    >
      {/* Section eyebrow */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-12 md:pt-16 pb-10 md:pb-14">
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="block w-10 h-[3px] bg-orange rounded-full" />
          <span className="font-body font-bold text-[11px] tracking-[0.28em] uppercase text-orange">
            Nuestra carta
          </span>
        </motion.div>
      </div>

      {/* Categories — each as a section block with featured grid + expand */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pb-16 sm:pb-24 md:pb-32 flex flex-col gap-16 sm:gap-20 md:gap-28">
        {categories.map((cat) => (
          <CategoryBlock
            key={cat.key}
            cat={cat}
            verTodos={m.verTodos}
            verMenos={m.verMenos}
            masPedidoLabel={m.masPedido}
            pideYaLabel={m.pideYa}
            accents={ACCENTS[cat.key]}
          />
        ))}
      </div>

      <JellyWave fill="#f6eadf" height={140} />
    </section>
  )
}

interface CategoryBlockProps {
  cat: {
    key: 'cookies' | 'cheesecakes' | 'milkshakes' | 'otros'
    titleType: 'svg' | 'text'
    eyebrow: string
    title: string
    description: string
    items: Item[]
    photo: string
    itemImages?: Record<string, string>
    itemImagesByIndex?: Record<number, string>
    itemUrls?: Record<string, string>
    itemUrlsByIndex?: Record<number, string>
    imageShape: ImageShape
  }
  verTodos: (n: number) => string
  verMenos: string
  masPedidoLabel: string
  pideYaLabel: string
  accents: readonly string[]
}

function CategoryBlock({ cat, verTodos, verMenos, masPedidoLabel, pideYaLabel, accents }: CategoryBlockProps) {
  const [expanded, setExpanded] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  // Snapshot of the toggle's viewport-top captured just before a collapse —
  // used to re-anchor scroll so the button stays under the user's finger.
  const collapseAnchor = useRef<number | null>(null)

  function handleToggle() {
    if (expanded && toggleRef.current) {
      collapseAnchor.current = toggleRef.current.getBoundingClientRect().top
    }
    setExpanded((v) => !v)
  }

  // After collapse, the rest grid is gone; the button has shifted up in the
  // document. Compensate scrollY so the button stays put in the viewport —
  // before paint, no flicker.
  useLayoutEffect(() => {
    if (collapseAnchor.current === null || !toggleRef.current) return
    const delta = toggleRef.current.getBoundingClientRect().top - collapseAnchor.current
    if (delta !== 0) window.scrollBy(0, delta)
    collapseAnchor.current = null
  }, [expanded])

  const featured = cat.items.slice(0, FEATURED_COUNT)
  const rest = cat.items.slice(FEATURED_COUNT)
  const hasRest = rest.length > 0

  const gridCols = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-5 md:gap-x-6'
  const featuredGrid = `${gridCols} gap-y-4 sm:gap-y-5 md:gap-y-6`
  const expandedGrid = `${gridCols} gap-y-4 sm:gap-y-5 md:gap-y-6 pt-1`

  return (
    <div className="flex flex-col gap-7 sm:gap-9 md:gap-12">
      {/* Category header */}
      <motion.header
        className="flex flex-col max-w-2xl"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, ease: EASE_ENTRANCE }}
      >
        {cat.titleType === 'svg' ? (
          <img
            src={`/assets/svg/${cat.key}_title.svg`}
            alt={`${cat.eyebrow} ${cat.title}`}
            className="w-auto h-[48px] sm:h-[64px] md:h-[96px] lg:h-[120px] self-start mb-3 sm:mb-4 md:mb-6"
          />
        ) : (
          <>
            <span className="font-display text-[18px] md:text-[22px] leading-none text-orange -rotate-3 -mb-3 md:-mb-4 self-start pl-2 md:pl-4">
              {cat.eyebrow}
            </span>
            <h3 className="font-gulp font-normal lowercase text-[56px] sm:text-[72px] md:text-[104px] lg:text-[128px] leading-[0.9] tracking-[-0.02em] text-cream mb-3 sm:mb-4 md:mb-6">
              {cat.title}
            </h3>
          </>
        )}
        <p className="font-body text-[14px] md:text-[16px] leading-[1.65] text-cream/65 max-w-[58ch] text-pretty">
          {cat.description}
        </p>
      </motion.header>

      {/* Featured grid — 3 cards */}
      <div className={featuredGrid}>
        {featured.map((item, i) => {
          const accent = accents[i % accents.length]
          return (
            <motion.div
              key={`${cat.key}-featured-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: EASE_ENTRANCE,
              }}
            >
              <ProductCardCompact
                name={item.name}
                description={item.desc}
                photo={cat.itemImagesByIndex?.[i] ?? cat.itemImages?.[item.name] ?? cat.photo}
                accent={accent}
                pideYaLabel={pideYaLabel}
                orderHref={cat.itemUrlsByIndex?.[i] ?? cat.itemUrls?.[item.name] ?? UBER_EATS_URL}
                bestseller={i === 0}
                bestsellerLabel={masPedidoLabel}
                imageShape={cat.imageShape}
                framedPhoto={cat.key === 'milkshakes'}
                noImageShadowOnHover={cat.key !== 'cheesecakes' && cat.key !== 'milkshakes'}
              />
            </motion.div>
          )
        })}
      </div>

      {/* Expanded grid — rest of items. Expansion animates; collapse is
          instant + scroll-anchored to keep the button under the user's finger
          (the prior exit-height animation caused content above the button to
          shrink mid-scroll, teleporting users to the next section). */}
      {expanded && hasRest && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.45, ease: EASE_ENTRANCE }}
          className="overflow-hidden"
        >
          <div className={expandedGrid}>
            {rest.map((item, i) => {
              const accent = accents[(FEATURED_COUNT + i) % accents.length]
              return (
                <motion.div
                  key={`${cat.key}-rest-${i}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                >
                  <ProductCardCompact
                    name={item.name}
                    description={item.desc}
                    photo={cat.itemImagesByIndex?.[FEATURED_COUNT + i] ?? cat.itemImages?.[item.name] ?? cat.photo}
                    accent={accent}
                    pideYaLabel={pideYaLabel}
                    orderHref={cat.itemUrlsByIndex?.[FEATURED_COUNT + i] ?? cat.itemUrls?.[item.name] ?? UBER_EATS_URL}
                    imageShape={cat.imageShape}
                    framedPhoto={cat.key === 'milkshakes'}
                    noImageShadowOnHover={cat.key !== 'cheesecakes' && cat.key !== 'milkshakes'}
                  />
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* Expand toggle */}
      {hasRest && (
        <div className="flex justify-center pt-2">
          <button
            ref={toggleRef}
            type="button"
            onClick={handleToggle}
            aria-expanded={expanded}
            className="group/cta press focus-ring inline-flex items-center gap-2 font-body font-bold uppercase tracking-[0.16em] text-[11px] md:text-[12px] px-6 py-3 rounded-full border-2 border-cream/20 text-cream hover:border-orange hover:text-orange"
            style={{
              transition:
                'border-color 240ms var(--ease-out), color 240ms var(--ease-out), transform 180ms var(--ease-out)',
            }}
          >
            <MicroCtaContent
              label={expanded ? verMenos : verTodos(cat.items.length)}
              arrow={
                <span
                  className="inline-flex"
                  style={{
                    transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 320ms var(--ease-out)',
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              }
            />
          </button>
        </div>
      )}
    </div>
  )
}
