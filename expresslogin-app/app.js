const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('combined'));

// Statische Dateien bereitstellen
app.use(express.static(path.join(__dirname, 'public')));

// Routen
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/data', (req, res) => {
  res.json({ message: 'GET request to /data' });
});

app.post('/data', (req, res) => {
  res.json({ message: 'POST request to /data', data: req.body });
});

app.put('/data', (req, res) => {
  res.json({ message: 'PUT request to /data', data: req.body });
});

app.delete('/data', (req, res) => {
  res.json({ message: 'DELETE request to /data' });
});

// Middleware zum Loggen von Anfragedetails
app.use((req, res, next) => {
  console.log(`HTTP Method: ${req.method}`);
  console.log(`Path: ${req.path}`);
  console.log(`Status Code: ${res.statusCode}`);
  console.log(`Headers: ${JSON.stringify(req.headers)}`);
  next();
});

// Zentrale Fehlerbehandlungsmiddleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// 404-Handler
app.use((req, res) => {
  res.status(404).send('Page not found');
});

app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});