import express from 'express';
import path from 'path';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static('dist'));

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname + '/../../dist/login.html'));
});

app.get('/signin', (req, res) => {
  res.sendFile(path.join(__dirname + '/../../dist/signin.html'));
});

app.get('/main', (req, res) => {
  res.sendFile(path.join(__dirname + '/../../dist/main.html'));
});

app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname + '/../../dist/profile.html'));
});

app.get('/500', (req, res) => {
  res.sendFile(path.join(__dirname + '/../../dist/500.html'));
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../../dist/404.html'));
});

app.listen(PORT);
