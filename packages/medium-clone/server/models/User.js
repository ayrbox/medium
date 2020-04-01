const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  provider: String,
  token: String,
  provider_pic: String,
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
});

UserSchema.methods.follow = function(user_id) {
  if (this.follwing.indexOf(user_id) === -1) {
    this.following.push(user_id);
  }
  return this.save();
};

UserSchema.methods.addFollower = function(fs) {
  this.followers.push(fs);
};

module.exports = mongoose.model('users', UserSchema);
