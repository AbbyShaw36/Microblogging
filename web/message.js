var getData = require("../util/getData");
var cookie = require("../util/cookie");
var error = require("../util/error");
var logger = require("../util/logger").logger;
var Message = require("../model/message").Message;
var service = require("../service/message").service;

exports.create = function (req,res,cb) {
	getData.byBody(req, function (err,data) {
		if (err) {
			cb(err);
			return;
		}

		var content = decodeURIComponent(data.content);
		var receiver = data.receiver;
		var commentId = data.commentId;
		var sessionId = cookie.getCookie(req,"sessionId");
		
		if (!content) {
			logger.warn("[create message error] - " + error.messageContentNotProvided.discription);
			cb(error.messageContentNotProvided);
			return;
		}

		if (!receiver) {
			logger.warn("[create message error] - " + error.messageReceiverNotProvided.discription);
			cb(error.messageReceiverNotProvided);
			return;
		}

		if (!commentId) {
			logger.warn("[create message error] - " + error.commentIdNotProvided.discription);
			cb(error.commentIdNotProvided);
			return;
		}

		var message = new Message();
		message.setContent(content);
		message.setCommentId(commentId);
		message.setReceiver(receiver);

		service.create(message,sessionId,cb);
	});
};

exports.getByCommentId = function (req,res,cb) {
	getData.byUrl(req, function (err,data) {
		if (err) {
			cb(err);
			return;
		}

		var commentId = data.commentId;

		if (!commentId) {
			logger.warn("[get message by commentId error] - " + error.commentIdNotProvided.discription);
			cb(error.commentIdNotProvided);
			return;
		}

		var message = new Message();
		message.setCommentId(commentId);

		service.getByCommentId(message,cb);
	});
};