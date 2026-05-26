import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Haerin/',
  plugins: [react()],
  optimizeDeps: {
    include: ['gsap', 'gsap/ScrollTrigger'],
  },
});
