const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  name: {
    type: String,
    require: [true, 'Mandatory field'],
  },
});

const User = model('User', UserSchema);

module.exports = User;