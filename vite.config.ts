import { defineConfig } from 'vite';
import symfonyPlugin from 'vite-plugin-symfony';
import react from '@vitejs/plugin-react';
import path from 'path';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import { exec } from 'node:child_process';

export default defineConfig({
  plugins: [
    {
      name: 'run-script-on-change',
      handleHotUpdate({ file }) {
        // if in src/ or config/
        if (file.includes('src/') || file.includes('config/')) {
          exec('npm run openapi:generate', (err, stdout, stderr) => {
            if (err) {
              console.error('Command failed:', err);
              return;
            }
            console.log(stdout);
          });
        }
      },
    },
    tanstackRouter({
      target: 'react',
      routesDirectory: path.resolve(import.meta.dirname, 'assets', 'routes'),
      generatedRouteTree: path.resolve(import.meta.dirname, 'assets', 'routeTree.gen.ts'),
      autoCodeSplitting: true,
    }),
    react(),
    symfonyPlugin({
      viteDevServerHostname: 'https://symfony-perso-vite.web.localhost',
      enforceServerOriginAfterListening: false,
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    origin: 'https://symfony-perso-vite.web.localhost',
    cors: {
      origin: ['https://symfony-perso.web.localhost'],
      credentials: true,
    },
    hmr: {
      protocol: 'wss',
      host: 'symfony-perso-vite.web.localhost',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './assets'),
      '@components': path.resolve(import.meta.dirname, './assets/components'),
      '@hooks': path.resolve(import.meta.dirname, './assets/hooks'),
      '@lib': path.resolve(import.meta.dirname, './assets/lib'),
      '@utils': path.resolve(import.meta.dirname, './assets/utils'),
      '@types': path.resolve(import.meta.dirname, './assets/types'),
    },
  },
  build: {
    rolldownOptions: {
      input: {
        app: './assets/root.tsx',
      },
    },
  },
});
