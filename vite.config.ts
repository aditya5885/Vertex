import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Three.js and React Three Fiber
            if (id.includes('three') || id.includes('@react-three') || id.includes('scheduler')) {
              return 'vendor-three';
            }
            // Animations and smooth scrolls
            if (id.includes('framer-motion') || id.includes('gsap') || id.includes('lenis')) {
              return 'vendor-animation';
            }
            // React Icons (Very heavy, isolate to keep framework chunk small)
            if (id.includes('react-icons')) {
              return 'vendor-icons';
            }
            // Core React framework dependencies
            const isReactCore = id.includes('/react/') || 
                                id.includes('/react-dom/') || 
                                id.includes('/react-router/') || 
                                id.includes('/react-router-dom/');
            if (isReactCore) {
              return 'vendor-react';
            }
            return 'vendor-others';
          }
        }
      }
    }
  }
})
