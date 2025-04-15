const path = require('path');
const express = require('express');
const app = express();
const port = 80;


app.use(express.static(path.join(__dirname, 'public', 'js')));

app.get('/', (req, res) => {
 
  const filePath = path.join(__dirname, 'public', 'js', 'index.html');
  console.log('Pfad zu index.html:', filePath); 
  res.sendFile(filePath);
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
