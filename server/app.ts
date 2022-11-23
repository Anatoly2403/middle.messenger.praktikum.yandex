import express from 'express';
import path from 'path';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static('dist'));

app.listen(PORT);

app.get('/*', (_, res) => {
  res.sendFile(path.join(__dirname + './../dist/index.html'));
});
