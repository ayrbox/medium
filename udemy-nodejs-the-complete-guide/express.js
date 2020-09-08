const express = require('express');
const app = express();

const users = ['User 1', 'User 2', 'User 3', 'User 4'];

app.use('/users', (_, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html',
  });

  res.write('<html><body><h1>Users List</h1><ul>');
  users.forEach(user => {
    res.write(`<li>${user}</li>`);
  });
  res.write('</ul></body><html>');

  res.end();
});

app.use('/', (_, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html',
  });

  res.write(`<html><body><h1>Hello from Express.js</h1></body></html>`);
  res.end();
});

app.use((_, res) => {
  console.log('Dummay Response');
  res.write('Dummy Response');
  res.end();
});

app.listen(3000, () => {
  console.log('Listening to 3000');
});
