const path = require('path');
const express = require('express');
const app = express();
const port = 80;

// Root-Route: Landing Page zuerst definieren
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'html', 'landing.html'));
});

// Danach statische Dateien
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
