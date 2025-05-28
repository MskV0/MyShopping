import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/MyShopping/',
  publicDir: 'public',
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/\.(svg|png|jpg|jpeg|gif)$/.test(assetInfo.name)) {
            if (assetInfo.name.startsWith('icons/payment/')) {
              return `assets/icons/payment/[name]-[hash][extname]`
            }
            if (assetInfo.name === 'favicon.svg') {
              return `[name][extname]`
            }
            return `assets/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        }
      }
    }
  }
})
