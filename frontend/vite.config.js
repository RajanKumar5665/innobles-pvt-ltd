import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Listen on ALL interfaces (IPv4 + IPv6) so the site opens on
    // http://localhost:5173 AND http://127.0.0.1:5173 (also from mobile on LAN).
    host: true,
    port: 5173,
    strictPort: true,
    open: false,
  },
  preview: {
    host: true,
    port: 4173,
    strictPort: true,
  },
})

