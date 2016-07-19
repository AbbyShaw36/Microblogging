var mysql = require("mysql");
var connection = require("./mysql").connection;
var logger = require("../util/logger").logger;
var error = require("../util/error");

var dao = {};

exports.dao = dao;

dao.create = function (message,cb) {
	var content = message.getContent();
	var publishTime = new Date().getTime();
	var publisher = message.getPublisher();
	var receiver = message.getReceiver();
	var commentId = message.getCommentId();

	var sql = "INSERT INTO messages (content,publishTime,publisher,receiver,commentId) VALUES(?,?,?,?,?)";
	var inserts = [content,publishTime,publisher,receiver,commentId];

	sql = mysql.format(sql,inserts);

	connection.query(sql, function(err,result) {
		if (err) {
			logger.error("[create message error] - " + err.message);
			cb(error.internalServerErr);
			return;
		}

		cb(err,result);
	});
};

dao.getById = function (message,cb) {
	var id = message.getId();

	var sql = "SELECT messages.id,content,publishTime,publisher.name as publisher,publisher.id as publisherId,publisher.hpPath as hpPath,publisher.hp as hp,receiver.name as receiver,receiver.id as receiverId,commentId FROM messages,user as publisher,user as receiver WHERE publisher.id = messages.publisher AND receiver.id = messages.receiver AND messages.id = ?";
	var inserts = [id];

	sql = mysql.format(sql,inserts);

	connection.query(sql, function (err,result) {
		if (err) {
			logger.error("[message getById error] - " + err.message);
			cb(error.internalServerErr);
			return;
		}

		cb(null,result);
	});
};

dao.getByCommentId = function (message,cb) {
	var commentId = message.getCommentId();

	var sql = "SELECT messages.id,content,publishTime,publisher.name as publisher,publisher.id as publisherId,publisher.hpPath as hpPath,publisher.hp as hp,receiver.name as receiver,receiver.id as receiverId,commentId FROM messages,user as publisher,user as receiver WHERE publisher.id = messages.publisher AND receiver.id = messages.receiver AND commentId = ?";
	var inserts = [commentId];

	sql = mysql.format(sql,inserts);
	console.log(sql);
	connection.query(sql, function (err,result) {
		if (err) {
			logger.error("[get message by commentId error] - " + err.message);
			cb(error.internalServerErr);
			return;
		}

		cb(null,result);
	});
};

dao.delete = function (message,cb) {
	var id = message.getId();

	var sql = "DELETE FROM message WHERE messageId = ?";
	var inserts = [id];

	sql = mysql.format(sql,inserts);

	connection.query(sql, function (err,result) {
		if (err) {
			logger.error("[delete message error] - " + err.message);
			cb(error.internalServerErr);
			return;
		}

		cb(err,result);
	});
};

dao.received = function (message,cb) {
	var id = message.getId();

	var sql = "UPDATE messages SET messageReceived = '1' WHERE messageId = ?";
	var inserts = [id];

	sql = mysql.format(sql,inserts);

	connection.query(sql, function (err,result) {
		if (err) {
			logger.error("[message received error] - " + err.message);
			cb(error.internalServerErr);
			return;
		}

		cb(err,result);
	});
};