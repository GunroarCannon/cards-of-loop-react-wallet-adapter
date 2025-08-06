// vite.config.js (Optimized for Render)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // Expose environment variables to your frontend
    'process.env': {
      VITE_SOLANA_RPC: JSON.stringify(import.meta.env.VITE_SOLANA_RPC),
      VITE_BACKEND_URL: JSON.stringify(import.meta.env.VITE_BACKEND_URL)
    }
  },
  build: {
    // Render-specific optimizations
    outDir: 'dist',
    emptyOutDir: true,
    target: 'esnext' // For modern browsers
  }
});
