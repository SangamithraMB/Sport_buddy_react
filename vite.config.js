import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allow all hosts
    allowedHosts: ['sport-buddy-app-render.onrender.com'], // Add Render domain to allowed hosts
  },
});