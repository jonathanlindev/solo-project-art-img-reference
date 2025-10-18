import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  root: './client',
  plugins: [react()],
  server: {
    host: true,
    port: 5177,
    proxy: {
      '/api': 'http://localhost:3002',
    },
  },
});
