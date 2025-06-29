import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: 'https://p2p-energy-trading.sekgus.site/',
  plugins: [tailwindcss(), react()],
  server: {
    host: true
  }
})
