const express = require('express');
const path = require('path');
const PORT = 3000;

const app = express();

app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.sendFile(
    path.join(__dirname + '/../../dist/login.html')
  );
})

app.listen(PORT);