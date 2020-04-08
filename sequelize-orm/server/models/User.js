const Sequelize = require('sequelize');

const updateFullName = (user) => {
  const { firstName, lastName } = user;
  user.fullName = `${firstName} ${lastName}`;
  console.log('Sequalize Hooks');
};

module.exports = (sequelizeConnection) => {
  return sequelizeConnection.define('User', { 
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
      beforeSave: updateFullName,
    },
  });
};
