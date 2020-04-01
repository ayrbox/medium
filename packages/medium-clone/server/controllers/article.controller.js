const fs = require('fs');
const cloudinary = require('cloudinary');

const Article = require('./../models/Article');
const User = require('./../models/User');


module.exports = {
  addArticle: (req, res, next) => {
    const { author_id, text, title, claps, description } = req.body;

    // if(!req.files.image) {
    //   // should upload image to coludinary or something and pass image url
    // } 

    saveArticle({ text, title, claps, description, feature_img: ''});

    function saveArticle(articleObject) {
      new Article(articleObject).save((err, article) => {
        if (err) {
          res.send(err);
        } else if (!article) {
          res.send(400);
        } else {
          return article.addAuthor(author_id).then((article_) => {
            return res.send(article_);
          });
        }
      });
      next();
    }
  },
  getAll: (req, res, next) => {
    Article.find(req.params.id)
      .populate('author')
      .populate('comments.author').exec((err, articles) => {
        if(err) {
          res.send(err);
        } else if(!articles) {
          res.send(404);
        } else {
          res.send(articles);
        }
        next();
      });
  },
  clapArticle: (req, res, next) => {
    Article.findById(req.bofy.article_id).then((article) => {
      return article.clap().then(() => {
        return res.json({ msg: 'Done '});
      });
    }).catch(next);
  },
  commentArticle: (req, res, next) => {
    Article.findById(req.body.article_id).then((article) => {
      return article.comment({
        author: req.body.author_id,
        text: req.body.commmand,
      }).then(() => {
        return res.json({ msg: 'Done' });
      });
    }).catch(next);
  },
  getArticle: (req, res, next) => {
    Article.findById(req.params.id)
      .populate('author')
      .populate('comments.author').exec((err, article) => {
        if (err) {
          res.send(err);
        } else if(!article) {
          res.send(404);
        } else {
          res.send(article);
        }
      });
  },
}


