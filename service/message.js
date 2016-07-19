var logger = require("../util/logger").logger;
var error = require("../util/error");
var dao = require("../dao/messages").dao;
var sessionDao = require("../dao/session").dao;
var commentDao = require("../dao/comments").dao;
var Comment = require("../model/comment").Comment;

var service = {};

exports.service = service;

service.create = function (message,sessionId,cb) {
	sessionDao.get(sessionId, function (err,result) {
		if (err) {
			cb(err);
			return;
		}

		if (result.length === 0) {
			logger.warn("[create message error] - " + error.unauthorized.discription);
			cb(error.unauthorized);
			return;
		}

		var publisher = result[0].userId;
		message.setPublisher(publisher);

		dao.create(message, function (err,result) {
			if (err) {
				cb(err);
				return;
			}

			var id = result.insertId;
			message.setId(id);

			var comment = new Comment();
			comment.setMessage(1);
			comment.setId(message.getCommentId());

			commentDao.updateMessage(comment, function (err,result) {
				if (err) {
					cb(err);
					return;
				}

				dao.getById(message, function (err,result) {
					if (err) {
						cb(err);
						return;
					}

					cb(null,{message: result[0]});
				});
			});
		});
	});
}

service.getByCommentId = function (message,cb) {
	dao.getByCommentId(message, function (err,result) {
		if (err) {
			cb(err);
			return;
		}

		cb(null, {messageList: result});
	});
};