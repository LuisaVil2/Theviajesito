import { createServer } from 'node:http'
import { createReadStream, existsSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'

const root = process.argv[2] || '.'
const port = Number(process.env.PORT || 4173)
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml' }

createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost')
  let file = join(root, url.pathname === '/' ? 'index.html' : url.pathname)
  if (!existsSync(file) || statSync(file).isDirectory()) file = join(root, 'index.html')
  res.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream' })
  createReadStream(file).pipe(res)
}).listen(port, '0.0.0.0', () => console.log(`Preview running at http://localhost:${port}`))
