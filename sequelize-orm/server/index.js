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
const Post = require('./models/Post')(connection);

Post.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Post, { foreignKey: 'userId' });

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


    Post.create({
      title: 'Hello',
      content: 'Lorem ipsum content which is long and used by everyone',
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

app.put('/users/:uuid', (req, res) => {
  const { uuid }  = req.params;
  User.findByPk(uuid).then(user => {
    if(!user) {
      res.status(404).send('User not found');
      return;
    }
    user.update({
      firstName: 'Sabin Raj',
      lastName: 'Dangol',
      email: 'sabin.dangol@hotmail.com',
      bio: 'Javascript foo bar Developer',
    }).then(() => {
      res.json('User updated');
    }).catch(err => {
      res.status(500).send(err);
    });

  }).catch(err => {
    res.status(500).send(err);
  });
});

app.delete('/users/:uuid', (req, res) => {
  const { uuid } = req.params;
  User.destroy({
    where: {
      uuid,
    },
  }).then(() => {
    res.send('User deleted');
  }).catch(err => {
    console.log(err);
    res.status(404).send(err);
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


app.get('/posts', (_, res) => {
  Post.findAll({
    include: [User],
  }).then(posts => {
    console.log(posts);
    res.json(posts);
  }).catch(err => {
    res.status(404).send(err);
  });
});

app.listen(port, () => {
  console.log('Runnign server on port', port);
});
