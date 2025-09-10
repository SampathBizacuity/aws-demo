    // index.js
    const http = require('http');

    const hostname = '127.0.0.1';
    const port = 5000;

    const server = http.createServer((req, res) => {
      // Handle CORS preflight requests
      if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.statusCode = 200;
        res.end();
        return;
      }

      if (req.url === '/api/hello') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.end(JSON.stringify({ message: 'Hello from backend!' }));
      } else if (req.url === '/api/update' && req.method === 'PUT') {
        let body = '';
        req.on('data', chunk => {
          body += chunk;
        });
        req.on('end', () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
          res.end(JSON.stringify({ message: 'Update received', data: body }));
        });
      } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World\n');
      }
    });

    server.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });