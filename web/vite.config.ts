import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

export default defineConfig({
  plugins: [
    react(),
    // Serve ../data/ directory as /data/ during development
    {
      name: 'serve-data',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && req.url.startsWith('/data/')) {
            const cleanUrl = req.url.split('?')[0]
            const relativePath = cleanUrl.replace('/data/', '')
            const filePath = path.resolve(__dirname, '..', 'data', relativePath)
            if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
              res.setHeader('Content-Type', 'application/json')
              res.setHeader('Access-Control-Allow-Origin', '*')
              fs.createReadStream(filePath).pipe(res)
              return
            }
          }
          next()
        })
      },
    },
  ],
  base: process.env.GITHUB_PAGES ? '/ai-news-aggregator/' : '/',
  server: {
    port: 3000,
    open: false,
    fs: {
      allow: ['..']
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    copyPublicDir: false,
  },
})

