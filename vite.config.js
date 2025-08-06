import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Polyfills for Solana wallet adapters
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import rollupNodePolyFill from 'rollup-plugin-node-polyfills'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Solana wallet adapter fixes
      util: 'rollup-plugin-node-polyfills/polyfills/util',
      stream: 'rollup-plugin-node-polyfills/polyfills/stream',
      events: 'rollup-plugin-node-polyfills/polyfills/events',
      crypto: 'crypto-browserify',
      assert: 'assert',
      https: 'agent-base',
      os: 'os-browserify',
      buffer: 'buffer',
      path: 'path-browserify',
      process: 'process/browser',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        // Enable rollup polyfills plugin
        rollupNodePolyFill(),
      ],
    },
    commonjsOptions: {
      transformMixedEsModules: true, // Required for wallet adapters
    },
  },
  define: {
    // Global environment variables
    'process.env': {
      VITE_SOLANA_RPC: JSON.stringify(process.env.VITE_SOLANA_RPC),
      VITE_HONEYCOMB_API_URL: JSON.stringify(process.env.VITE_HONEYCOMB_API_URL),
    },
  },
})
