var logger = require("../util/logger").logger;
var error = require("../util/error");
var sessionDao = require("../dao/session").dao;
var dao = require("../dao/comments").dao;
var blogsDao = require("../dao/blogs").dao;
var Blog = require("../model/blog").Blog;
var Comment = require("../model/comment").Comment;

var service = {};

exports.service = service;

service.create = function (comment,sessionId,cb) {
	sessionDao.get(sessionId, function (err,result) {
		if (err) {
			cb(err);
			return;
		}

		if (result.length === 0) {
			logger.warn("[create comment error] - " + error.unauthorized.discription);
			cb(error.unauthorized);
			return;
		}

		var publiser = result[0].userId;
		comment.setPublisher(publiser);

		dao.create(comment,function (err,result) {
			if (err) {
				cb(err);
				return;
			}

			var commentId = result.insertId;

			var blog = new Blog();
			blog.setId(comment.getBlogId());
			blog.setComment(1);

			blogsDao.updateComment(blog,function (err,result) {
				if (err) {
					cb(err);
					return;
				}

				var comment = new Comment();
				comment.setId(commentId);

				service.getById(comment,cb);
			});
		});
	});
};

service.getById = function (comment,cb) {
	dao.getById(comment, function (err,result) {
		if (err) {
			cb(err);
			return;
		}
		
		if (result.length === 0) {
			logger.warn("[get comment by id error] - " + error.commentNotExists.discription);
			cb(error.commentNotExists);
			return;
		}

		cb(null,{comment: result[0]});
	});
}

service.getByBlogId = function (comment,cb) {
	dao.getByBlogId(comment, function (err,result) {
		if (err) {
			cb(err);
			return;
		}

		cb(null,{comments: result});
	});
};