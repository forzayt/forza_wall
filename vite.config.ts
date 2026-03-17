import { defineConfig, ViteDevServer, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";
import url from "url";
import { IncomingMessage, ServerResponse } from "http";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    {
      name: 'list-data-files',
      buildStart() {
        const dataDir = path.resolve(__dirname, 'public/data');
        const outputFile = path.resolve(__dirname, 'public/data.json');
        
        try {
          if (fs.existsSync(dataDir)) {
            const files = fs.readdirSync(dataDir).map(file => ({
              name: file,
              url: `/data/${file}`
            }));
            fs.writeFileSync(outputFile, JSON.stringify(files, null, 2));
            console.log(`Generated ${outputFile} with ${files.length} files`);
          } else {
            fs.writeFileSync(outputFile, JSON.stringify([]));
            console.log(`Generated empty ${outputFile} (data directory not found)`);
          }
        } catch (error) {
          console.error('Failed to generate data.json:', error);
        }
      },
      configureServer(server: ViteDevServer) {
        server.middlewares.use((req: IncomingMessage, res: ServerResponse, next: (err?: any) => void) => {
          const parsedUrl = url.parse(req.url || '', true);
          const pathname = parsedUrl.pathname || '';

          if (pathname === '/api/list-data' || pathname === '/data.json') {
            const dataDir = path.resolve(__dirname, 'public/data');
            try {
              if (!fs.existsSync(dataDir)) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify([]));
                return;
              }
              const files = fs.readdirSync(dataDir).map(file => ({
                name: file,
                url: `/data/${file}`
              }));
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(files));
            } catch (error) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: 'Failed to list files' }));
            }
            return;
          }

          if (pathname.startsWith('/api/data/')) {
            const fileName = pathname.replace('/api/data/', '');
            const filePath = path.resolve(__dirname, 'public/data', fileName);
            if (fs.existsSync(filePath)) {
              const fileStream = fs.createReadStream(filePath);
              const ext = path.extname(fileName).toLowerCase();
              const mimeTypes: Record<string, string> = {
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.png': 'image/png',
                '.gif': 'image/gif',
                '.webp': 'image/webp',
                '.svg': 'image/svg+xml'
              };
              
              const isDownload = parsedUrl.query.download === '1';
              
              if (isDownload) {
                res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
              } else if (mimeTypes[ext]) {
                res.setHeader('Content-Type', mimeTypes[ext]);
              } else {
                res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
              }
              fileStream.pipe(res);
              return;
            }
          }
          next();
        });
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Serve the data folder statically
  publicDir: "public",
}));
