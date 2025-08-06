import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_SOLANA_RPC': JSON.stringify(process.env.VITE_SOLANA_RPC),
    'import.meta.env.VITE_BACKEND_URL': JSON.stringify(process.env.VITE_BACKEND_URL)
  },
  build: {
    outDir: '.',
    emptyOutDir: true,
    target: 'esnext',
    rollupOptions: {
      input: path.resolve(__dirname, 'main.jsx'), // Explicit JSX entry
      output: {
        entryFileNames: 'bundle.js', // Fixed output name
        chunkFileNames: 'chunks/[name]-[hash].js', // Organized chunks
        assetFileNames: 'assets/[name]-[hash][extname]' // Organized assets
      },
      plugins: [
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
    include: [
      '@solana/web3.js',
      '@solana/wallet-adapter-base',
      'buffer',
      'process'
    ],
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  }
});
