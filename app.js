const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('<h1>DevOps Project Successful!</h1><p>Running on Kubernetes.</p>');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});