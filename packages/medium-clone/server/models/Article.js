const mongoose = require('mongoose');


const ArticleSchema = new mongoose.Schema({
  text: String,
  title: String,
  description: String, 
  feature_img: String,
  claps: Number,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: [{
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    text: String,
  }],
});


ArticleSchema.methods.claps = function() {
  this.claps++;
  return this.save();
}

ArticleSchema.method.comments = function(comment) {
  this.comments.push(comment);
  return this.save();
}

ArticleSchema.methods.addAuthor = function(author_id) {
  this.author = author_id;
  return this.save();
}

ArticleSchema.methods.getUserArticle = async function(_id) {
  return await ArticleSchema.find({ author: _id });
}

module.exports = mongoose.model('articles', ArticleSchema);
