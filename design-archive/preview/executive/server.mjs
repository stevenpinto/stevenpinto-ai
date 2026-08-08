import http from 'node:http';
import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const port = Number(process.env.PORT || 4178);
const host = '127.0.0.1';
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const apiHost = 'aqjiq7s2t8.execute-api.us-east-1.amazonaws.com';

const types = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.png', 'image/png'],
  ['.gif', 'image/gif'],
  ['.ico', 'image/x-icon'],
  ['.svg', 'image/svg+xml']
]);

function send(res, status, body, headers = {}) {
  res.writeHead(status, headers);
  res.end(body);
}

function serveStatic(req, res) {
  const url = new URL(req.url, `http://${host}:${port}`);
  const pathname = decodeURIComponent(url.pathname);
  const requested = pathname === '/' ? '/preview/executive/index.html' : pathname;
  const filePath = path.resolve(repoRoot, `.${requested}`);

  if (!filePath.startsWith(repoRoot)) {
    send(res, 403, 'Forbidden');
    return;
  }

  fs.stat(filePath, (statErr, stats) => {
    if (statErr) {
      send(res, 404, 'Not found');
      return;
    }

    const finalPath = stats.isDirectory() ? path.join(filePath, 'index.html') : filePath;
    fs.readFile(finalPath, (readErr, data) => {
      if (readErr) {
        send(res, 404, 'Not found');
        return;
      }

      const type = types.get(path.extname(finalPath).toLowerCase()) || 'application/octet-stream';
      send(res, 200, data, { 'Content-Type': type });
    });
  });
}

function proxyApi(req, res) {
  const targetPath = req.url;
  const options = {
    hostname: apiHost,
    port: 443,
    path: targetPath,
    method: req.method,
    headers: {
      ...req.headers,
      host: apiHost,
      origin: 'https://stevenpinto.com'
    }
  };

  const upstream = https.request(options, (apiRes) => {
    const headers = {
      ...apiRes.headers,
      'access-control-allow-origin': `http://${host}:${port}`,
      'access-control-allow-methods': 'GET,POST,OPTIONS',
      'access-control-allow-headers': 'content-type,authorization',
      'cache-control': 'no-cache'
    };

    res.writeHead(apiRes.statusCode || 502, headers);
    apiRes.pipe(res);
  });

  upstream.on('error', (error) => {
    send(res, 502, JSON.stringify({ error: error.message }), { 'Content-Type': 'application/json' });
  });

  req.pipe(upstream);
}

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    send(res, 204, '', {
      'Access-Control-Allow-Origin': `http://${host}:${port}`,
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'content-type,authorization'
    });
    return;
  }

  if (req.url.startsWith('/api/')) {
    proxyApi(req, res);
    return;
  }

  serveStatic(req, res);
});

server.listen(port, host, () => {
  console.log(`Executive preview running at http://${host}:${port}/preview/executive/`);
});
