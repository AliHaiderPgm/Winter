import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
    // Deliberately not splitting by package name: that forced every antd module
    // into one chunk, so needing a single antd component dragged the whole
    // library in, even the parts only the lazily loaded dashboard uses. Only the
    // few libraries that never change with app code get their own cached chunk;
    // everything else follows the real import graph.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          const stable = /[\\/]node_modules[\\/](react|react-dom|scheduler|react-router|react-router-dom|axios)[\\/]/
          if (stable.test(id)) return 'vendor'
        }
      }
    }
  },
})
