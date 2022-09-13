const { exec } = require('child_process');
const express = require('express');
const path = require('path');

const PORT = 3000;
const app = express();

app.use(express.static('dist'));

// app.get('/login', (req, res) => {
//   res.sendFile(
//     path.join(__dirname + '/../../dist/login.html')
//   );
// })

app.get('/signin', (req, res) => {
  res.sendFile(
    path.join(__dirname + '/../../dist/signin.html')
  );
})

app.get('/main', (req, res) => {
  res.sendFile(
    path.join(__dirname + '/../../dist/main.html')
  );
})

app.get('/profile', (req, res) => {
  res.sendFile(
    path.join(__dirname + '/../../dist/profile.html')
  );
})

app.get('/500', (req, res) => {
  res.sendFile(
    path.join(__dirname + '/../../dist/500.html')
  );
})

app.get('/', (req, res) => {
  res.redirect('/login')
})

app.get('/404', (req, res) => {
  res.sendFile(
    path.join(__dirname + '/../../dist/404.html')
  );
})

app.listen(3000, () => {
  exec(`start http://localhost:${PORT}`);
});