import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/task12-mini-paint/',
  plugins: [react()],
  server: {
    open: true,
  },
});
