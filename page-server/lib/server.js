const path = require('path');
const express = require('express');
const compression = require('compression');
const app = express();
const hsts = require('hsts');

const basePath = "/dist";
const indexHtmlPath = path.join(basePath, 'index.html');

app.use((req, res, next) => {
  if (process.env.STAGING) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  }
  next();
});

app.use(compression());
app.use(express.json());


app.use(hsts({
  maxAge: 15552000  // 180 days in seconds
}));

// Point static path to dist
app.use(express.static(basePath));

// server-sent event stream
// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(indexHtmlPath);
});

app.post('*/logs', (req, res) => {
  const bodyAsString = JSON.stringify(req.body,  null , '\t'); // '\t' is the space
  console.log({message: bodyAsString}); // 'Write' to kubernetes logger
  res.sendStatus(200);
});

// PORT
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
