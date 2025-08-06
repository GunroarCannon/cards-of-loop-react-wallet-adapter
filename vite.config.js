import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '.',
    emptyOutDir: false,
    rollupOptions: {
      input: './main.jsx',
      output: {
        format: 'esm', // Explicit ES modules
        entryFileNames: 'main.js',
        assetFileNames: '[name][extname]'
      }
    }
  },
  server: {
    headers: {
      'Content-Type': 'application/javascript'
    }
  }
})
