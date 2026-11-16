import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base relativa: funciona en GitHub Pages sin importar el nombre del repo
export default defineConfig({
  base: './',
  plugins: [react()],
  build: { chunkSizeWarningLimit: 1500 },
})
