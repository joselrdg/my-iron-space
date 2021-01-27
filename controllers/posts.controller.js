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
			console.log(posts[0]);
			res.render("posts", { posts: posts, title: req.query.title });
		})
		.catch((e) => next(e));
};

module.exports.detail = (req, res, next) => {
	Post.findById(req.params.id)
		.then((post) => {
			res.render("post", post);
		})
		.catch((e) => next(e));
};