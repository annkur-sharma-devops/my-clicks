const express = require('express');
const next = require('next');
const path = require('path');
const fs = require('fs');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: '.' });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // ✅ Ensure uploads folder exists
  const uploadsDir = path.join(__dirname, 'public', 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // ✅ Serve static files from /uploads (public/uploads)
  server.use('/uploads', express.static(uploadsDir));

  // ✅ Handle everything else with Next.js
  server.all('*', (req, res) => handle(req, res));

  // ✅ Start server
  const host = process.env.HOST || '0.0.0.0';

  server.listen(port, host, () => {
  console.log(`> Ready on http://${host}:${port}`);
});
});
