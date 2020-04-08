const express = require('express');
const Sequelize = require('sequelize');


const usersData = require('./users.json');

const app = express();
const port = 9090;

const connection = new Sequelize('db', 'user', 'pass', {
  host: 'localhost',
  dialect: 'sqlite',
  storage: 'db.sqlite',
  operatorsAliases: 0,
});

const User = require('./models/User')(connection);
connection
  .sync({
    logging: console.log,
    force: true,
  }).then(() => {
    User.bulkCreate(usersData).then(() => {
      console.log('Users created');
    }).catch((err) => {
      console.log('Error', err);
    });
  }).then(() => {
    console.log('Connected to database.')
  });

app.get('/users/:uuid', (req, res) => {
  const { uuid } = req.params;
  console.log(uuid);
  User.findByPk(uuid).then(user => {
    if(!user) {
      res.status(404).json('User not found');
      return;
    }
    res.json(user);
  }).catch(err => {
    console.log('Error getting user', err);
    res.status(500).json(err);
  });
});

app.get('/users', (_, res) => {
  User.findAll().then(users => {
    res.json(users);
  }).catch(err => {
    console.log('Error getting all user', err);
    res.json(err);
  });
});



app.listen(port, () => {
  console.log('Runnign server on port', port);
});