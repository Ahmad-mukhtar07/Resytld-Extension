/**
 * Vite config for the content script only.
 * Builds a single IIFE bundle so Chrome can run it as a classic script (no ES modules).
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    outDir: 'build',
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, 'src/content/content.jsx'),
      name: 'ReStyldContent',
      fileName: () => 'content.js',
      formats: ['iife'],
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        intro: 'var process = { env: { NODE_ENV: "production" }, emit: function() {} };',
      },
    },
  },
})
