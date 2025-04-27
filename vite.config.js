import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
<<<<<<< HEAD
=======
  server:{
    proxy:{
      'api':'http://http://localhost:5173/'
    }
  },
>>>>>>> dad47bb924503c61478279d586d54e4940e4f6fc
  plugins: [react()],
})
