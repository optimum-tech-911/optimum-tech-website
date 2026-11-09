import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    {
      name: 'monaco-static-pages',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = new URL(req.url || '/', 'http://localhost');
          if (url.pathname === '/monaco-rush' || url.pathname === '/monaco-rush/play') {
            res.writeHead(307, { Location: `${url.pathname}/${url.search}` });
            res.end();
            return;
          }
          if (url.pathname === '/monaco-rush/' || url.pathname === '/monaco-rush/play/') {
            req.url = `${url.pathname}index.html${url.search}`;
          }
          next();
        });
      },
    },
  ],
  ssr: {
    noExternal: ['react-helmet-async'],
  },
});
