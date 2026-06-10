import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    modulePreload: { polyfill: false },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'motion-vendor'
            if (id.includes('react-router') || id.includes('/react-dom/') || id.includes('/react/') || id.includes('react-helmet')) return 'react-vendor'
          }
        },
      },
    },
  },
})
