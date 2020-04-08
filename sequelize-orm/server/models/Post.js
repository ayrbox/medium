const Sequelize = require('sequelize');

module.exports = (connection) => {
  return connection.define('Post', {
    uuid: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false, 
    },
    content: Sequelize.TEXT,
  });
}
