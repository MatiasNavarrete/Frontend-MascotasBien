import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // Simula el navegador (DOM) en la consola
    globals: true,        // Permite usar describe, it, expect sin importarlos en cada archivo
    setupFiles: './src/setupTests.js', // Archivo que cargaremos antes de los tests
  }
})