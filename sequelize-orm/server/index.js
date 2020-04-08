const express = require('express');
const Sequelize = require('sequelize');

const app = express();
const port = 9090;

const connection = new Sequelize('db', 'user', 'pass', {
  host: 'localhost',
  dialect: 'sqlite',
  storage: 'db.sqlite',
  operatorsAliases: 0,
  define: {
    freezeTableName: true,
  },
});

const User = connection.define('User', {
  uuid: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  name: {
    type: Sequelize.STRING,
    validate: {
      len: [3],
    }
  },
  bio: {
    type: Sequelize.TEXT,
    validate: {
      contains: {
        args: ['foo'],
        msg: 'DataError: Field must contain foo',
      } 
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'DataError: You can not have null email',
      },
      isEmail: true,
    },
  }
});

connection
  .sync({
    logging: console.log,
    force: true,
  }).then(() => {
    User.create({
      name: 'Sabin Raj Dangol',
      bio: 'lorem ipsum bio foo',
      email: 'sabin.dangol@hotmail.com',
    });
  }).then(() => {
    console.log('Connected to database.')
  });


app.listen(port, () => {
  console.log('Runnign server on port', port);
});