import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  // Base path for cPanel deployment
  // If deploying to root domain: use '/'
  // If deploying to subdirectory: use '/subdirectory-name/'
  base: '/',
  build: {
    // Output directory for production build
    outDir: 'dist',
    // Generate sourcemaps for debugging (set to false for smaller bundle)
    sourcemap: false,
    // Optimize chunks
    rollupOptions: {
      output: {
        manualChunks: {
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei', 'maath'],
          'vendor': ['react', 'react-dom', 'framer-motion'],
        },
      },
    },
  },
})
