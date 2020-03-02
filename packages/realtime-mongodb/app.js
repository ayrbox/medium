// require('./socket').connectMongoDB('mongodb://localhost/realtime-db');
const express = require('express');
const path = require('path');

const dbURI = 'mongodb://localhost:27017/userdb'

const mongoose = require('mongoose');
mongoose
  .connect(dbURI, { useNewUrlParser: true })
  .then(() => console.log('Database connected')) // eslint-disable-line
  .catch(err => console.log(err)); // eslint-disable-line


const app = express();

app.get('/hello', (req, res) => {
  res.end('Hello Realtime DB');
});


app.use(express.static('static'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'static', 'index.html'));
});

module.exports = app;