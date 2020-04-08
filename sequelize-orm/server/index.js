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
  firstName: {
    type: Sequelize.STRING,
    validate: {
      len: [3],
    }
  },
  lastName: {
    type: Sequelize.STRING,
  },
  fullName: Sequelize.STRING,
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
}, {
  hooks: {
    beforeCreate: (user) => {
      user.fullName = `${user.firstName} ${user.lastName}`;
    }, 
  }
});

connection
  .sync({
    logging: console.log,
    force: true,
  }).then(() => {
    User.create({
      firstName: 'Sabin Raj',
      lastName: 'Dangol',
      bio: 'lorem ipsum bio foo',
      email: 'sabin.dangol@hotmail.com',
    });
  }).then(() => {
    console.log('Connected to database.')
  });


app.listen(port, () => {
  console.log('Runnign server on port', port);
});