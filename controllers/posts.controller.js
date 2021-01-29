const Post = require("../models/Post.model");

module.exports.list = (req, res, next) => {
  Post.find(
    req.query.title
      ? {
          title: { $regex: req.query.title, $options: "i" },
        }
      : {}
  )
    .then((posts) => {
      res.render("posts/posts", { posts: posts, title: req.query.title });
    })
    .catch((e) => next(e));
};

module.exports.detail = (req, res, next) => {
  Post.findById(req.params.id)
    .then((post) => {
      res.render("posts/post", { ...post.toJSON(), delete: false });
    })
    .catch((e) => next(e));
};

module.exports.create = (req, res, next) => {
  res.render("posts/postForm");
};

module.exports.doCreate = (req, res, next) => {
  if (req.body.tags) {
    req.body.tags = req.body.tags.split(",");
  }
  Post.create(req.body)
    .then((post) => res.render("posts/post", post))
    .catch((e) => next(e));
};

module.exports.edit = (req, res, next) => {
  Post.findById(req.params.id)
    .then((p) => res.render("posts/postForm", p))
    .catch((e) => next(e));
};

module.exports.doEdit = (req, res, next) => {
  if (req.body.tags) {
    req.body.tags = req.body.tags.split(",");
  }
  Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((post) => res.render("posts/post", post))
    .catch((e) => next(e));
};

module.exports.delete = (req, res, next) => {
  Post.findById(req.params.id)
    .then((p) => res.render("posts/post", { ...p.toJSON(), delete: true }))
    .catch((e) => next(e));
};

module.exports.doDelete = (req, res, next) => {
  Post.findByIdAndDelete(req.params.id)
    .then(() => res.render("home"))
    .catch((e) => next(e));
};
