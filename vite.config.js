// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  define: {
    // CORRECTED: Use direct import.meta.env references
    'import.meta.env.VITE_SOLANA_RPC': JSON.stringify(process.env.VITE_SOLANA_RPC),
    'import.meta.env.VITE_BACKEND_URL': JSON.stringify(process.env.VITE_BACKEND_URL)
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'esnext',
    // Add these to fix Solana wallet adapter issues
    commonjsOptions: {
      transformMixedEsModules: true
    },
    rollupOptions: 
      input: path.resolve(__dirname, 'index.html'),
      plugins: [
        // Fix buffer/process polyfills
        {
          name: 'polyfill-node',
          resolveId(source) {
            if (source === 'buffer') return { id: 'buffer', external: true };
            if (source === 'process') return { id: 'process', external: true };
            return null;
          }
        }
      ]
    }
  },
  optimizeDeps: {
    // Required for Solana dependencies
    include: [
      '@solana/web3.js',
      '@solana/wallet-adapter-base',
      'buffer',
      'process'
    ],
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis'
      }
    }
  }
});
