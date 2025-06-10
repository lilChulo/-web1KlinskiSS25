const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const atob = require('atob');

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

// User-Liste im Speicher
const userList = new Map();
userList.set("admin", {
  userId: "admin",
  password: "123",
  firstName: "Udo",
  lastName: "Müller"
});

// Middleware
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Expose-Headers", "Authorization");
  next();
});

// ===== REST-API START =====

// POST /api/login (von deiner Anwendung benötigt!)
app.post('/api/login', (req, res) => {
  const { userId, password } = req.body;

  if (!userId || !password) {
    return res.status(400).send({ error: 'Missing login data' });
  }

  const userObject = userList.get(userId);
  if (!userObject || userObject.password !== password) {
    return res.status(401).send({ error: 'Invalid login data' });
  }

  console.log(`Login success: ${userId}`);
  return res.status(200).send({
    userId: userId,
    firstName: userObject.firstName,
    lastName: userObject.lastName
  });
});

// Optionaler GET /api/login (falls Basic Auth nötig ist)
app.get('/api/login', (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ error: 'No auth header' });
  }

  const base64String = req.headers.authorization.split(" ")[1];
  const credentials = atob(base64String);
  const [userId, password] = credentials.split(":");

  const userObject = userList.get(userId);
  if (!userObject || userObject.password !== password) {
    return res.status(401).send({ error: 'Invalid login data' });
  }

  return res.status(200).send({
    userId: userId,
    firstName: userObject.firstName,
    lastName: userObject.lastName
  });
});

// POST /api/users – neuen User registrieren
app.post('/api/users', (req, res) => {
  const { userId, password, firstName, lastName } = req.body;

  if (!userId || !password) {
    return res.status(400).send({ error: 'userId and password are required' });
  }

  if (userList.has(userId)) {
    return res.status(400).send({ error: 'User already exists' });
  }

  userList.set(userId, { userId, password, firstName, lastName });
  return res.status(200).send({ message: `User ${userId} added.` });
});

// GET /api/users – alle Nutzer
app.get('/api/users', (req, res) => {
  const users = Array.from(userList.values());
  res.status(200).json(users);
});

// GET /api/users/count
app.get('/api/users/count', (req, res) => {
  res.status(200).json({ userCount: userList.size });
});

// GET /api/users/:id
app.get('/api/users/:id', (req, res) => {
  const user = userList.get(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
});

// PUT /api/users/:id – User aktualisieren
app.put('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;

  if (!updatedUser.userId || !updatedUser.password) {
    return res.status(400).json({ message: 'userId and password are required' });
  }

  const currentUser = userList.get(userId);
  if (!currentUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  userList.set(userId, { ...currentUser, ...updatedUser });
  res.status(200).json(userList.get(userId));
});

// DELETE /api/users/:id – User löschen
app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  if (!userList.has(userId)) {
    return res.status(404).json({ message: 'User not found' });
  }

  userList.delete(userId);
  res.status(204).send(); // Kein Inhalt, nur OK
});

// ===== REST-API ENDE =====

// Server starten
app.listen(port, () => {
  console.log(` Server läuft unter http://localhost:${port}`);
});
