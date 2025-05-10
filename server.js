const express = require('express');
const path = require('path');
const app = express();
const port = 80;

// MIME-Typ für CSS erzwingen
app.use((req, res, next) => {
  if (req.url.endsWith('.css')) {
    res.setHeader('Content-Type', 'text/css');
  }
  next();
});

// Statische Dateien aus public/ ausliefern
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});