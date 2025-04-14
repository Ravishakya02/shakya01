import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy:{
      'api':'http://http://localhost:5173/'
    }
  },
  plugins: [react()],
})
