/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Formspree form endpoint, e.g. https://formspree.io/f/xxxxxxxx */
  readonly VITE_FORMSPREE_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
