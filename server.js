const path = require('path');
const express = require('express');
const app = express();
const port = 80;

// Statische Dateien bereitstellen (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Root-Route: Landing Page (landing.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'landing.html'));
});

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});