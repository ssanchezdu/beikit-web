/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Formspree form endpoint, e.g. https://formspree.io/f/xxxxxxxx */
  readonly VITE_FORMSPREE_ENDPOINT?: string
  /** Google Analytics 4 Measurement ID, e.g. G-XXXXXXXXXX */
  readonly VITE_GA_MEASUREMENT_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface Window {
  dataLayer?: unknown[]
}
