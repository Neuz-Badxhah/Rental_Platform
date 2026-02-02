import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(), // automatically uses paths from tsconfig.json
  ],
  resolve: {
    alias: {
      // Optional manual alias if you want to define explicitly
      '@': '/src',
    },
  },
  server: {
    port: 5173, // default dev server port
    open: true, // automatically opens browser
  },
})
