var getData = require("../util/getData");
var logger = require("../util/logger").logger;
var error = require("../util/error");
var cookie = require("../util/cookie");
var Comment = require("../model/comment").Comment;
var service = require("../service/comment").service;

exports.create = function (req,res,cb) {
	getData.byBody(req, function (err,result) {
		if (err) {
			cb(err);
			return;
		}

		var content = decodeURIComponent(result.content);
		var receiver = result.receiver;
		var blogId = result.blogId;
		var sessionId = cookie.getCookie(req,"sessionId");

		if (!sessionId) {
			logger.warn("[create comment error] - " + error.unauthorized.discription);
			cb(error.unauthorized);
			return;
		}
		
		if (!content) {
			logger.warn("[create comment error] - " + error.commentContentNotProvided.discription);
			cb(error.commentContentNotProvided);
			return;
		}

		if (!receiver) {
			logger.warn("[create comment error] - " + error.receiverNotProvided.discription);
			cb(error.receiverNotProvided);
			return;
		}

		if (!blogId) {
			logger.warn("[create comment error] - " + error.blogIdNotProvided.discription);
			cb(error.blogIdNotProvided);
			return;
		}

		var comment = new Comment();
		comment.setContent(content);
		comment.setReceiver(receiver);
		comment.setBlogId(blogId);

		service.create(comment,sessionId,cb);
	});
};

exports.getByBlogId = function (req,res,cb) {
	getData.byUrl(req, function (err,data) {
		if (err) {
			cb(err);
			return;
		}

		var blogId = data.blogId;

		if (!blogId) {
			logger.warn("[get comments by blogId error] - " + error.blogIdNotProvided.discription);
			cb(error.blogIdNotProvided);
			return;
		}

		var comment = new Comment();
		comment.setBlogId(blogId);

		service.getByBlogId(comment,cb);
	});
};
