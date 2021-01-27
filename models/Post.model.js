const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		validate: {
			validator: (text) => {
				return text.startsWith("http");
			},
			message: "URL must start with HTTP/HTTPS"
		},
	},
	tags: [String],
});

const Post = mongoose.model("Post", postSchema); // -> posts

module.exports = Post;
