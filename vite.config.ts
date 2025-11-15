import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    ViteImageOptimizer({
      jpeg: { quality: 80 },
      png: { compressionLevel: 8 },
      webp: { quality: 80 },
    }),
  ],

  server: {
    allowedHosts: true,
  },
})
