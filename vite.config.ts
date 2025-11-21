import {defineConfig} from 'vite';
import symfonyPlugin from 'vite-plugin-symfony';
import react from '@vitejs/plugin-react';
import path from 'path';
import {tanstackRouter} from '@tanstack/router-plugin/vite';

export default defineConfig({
    plugins: [
        tanstackRouter({
            target: 'react',
            routesDirectory: path.resolve(__dirname, 'assets', 'routes'),
            generatedRouteTree: path.resolve(__dirname, 'assets', 'routeTree.gen.ts'),
            autoCodeSplitting: true,
        }),
        react(),
        symfonyPlugin({
            viteDevServerHostname: 'https://vite.web.localhost',
            enforceServerOriginAfterListening: false,
        }),
    ],
    server: {
        host: '0.0.0.0',
        port: 5173,
        strictPort: true,
        origin: 'https://vite.web.localhost',
        cors: {
            origin: ['https://php.web.localhost', 'https://php.sf74.orb.local'],
            credentials: true,
        },
        hmr: {
            protocol: 'wss',
            host: 'vite.web.localhost',
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './assets'),
            '@components': path.resolve(__dirname, './assets/components'),
            '@hooks': path.resolve(__dirname, './assets/hooks'),
            '@lib': path.resolve(__dirname, './assets/lib'),
            '@utils': path.resolve(__dirname, './assets/utils'),
            '@types': path.resolve(__dirname, './assets/types'),
        },
    },
    build: {
        rollupOptions: {
            input: {
                app: './assets/root.tsx',
            },
        },
    },
});
