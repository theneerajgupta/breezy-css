import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import breezy from 'breezy-css/vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [breezy(), react(), tailwindcss()],
})
