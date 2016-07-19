var mysql = require("mysql");
var connection = require("./mysql").connection;
var logger = require("../util/logger").logger;
var error = require("../util/error");

var dao = {};

exports.dao = dao;

dao.create = function(comment,cb) {
	var content = comment.getContent();
	var publisher = comment.getPublisher();
	var publishTime = new Date().getTime();
	var receiver = comment.getReceiver();
	var blogId = comment.getBlogId();
	
	var sql = "INSERT INTO comments (content,publisher,publishTime,receiver,blogId) VALUES(?,?,?,?,?)";
	var inserts = [content,publisher,publishTime,receiver,blogId];

	sql = mysql.format(sql,inserts);

	connection.query(sql, function(err,result) {
		if (err) {
			logger.error("[create comment error] - " + err.message);
			cb(error.internalServerErr);
			return;
		}

		cb(err,result);
	});
};

dao.received = function(comment,cb) {
	var id = comment.getId();

	var sql = "UPDATE comments SET commentReceived = '1' WHERE commentId = ?";
	var inserts = [id];

	sql = mysql.format(sql,inserts);

	connection.query(sql, function (err,result) {
		if (err) {
			logger.error("[comment received error] - " + err.message);
			cb(error.internalServerErr);
			return;
		}

		cb(err,result);
	});
};

dao.getById = function(comment,cb) {
	var id = comment.getId();

	var sql = "SELECT comments.id,content,publisher.name as publisher,publisher.id as publisherId,publishTime,receiver.id as reciverId,receiver.name as receiver,messages,publisher.hpPath,publisher.hp FROM comments,user as publisher,user as receiver WHERE publisher.id = comments.publisher AND receiver.id = comments.receiver AND comments.id = ? ORDER BY publishTime DESC";
	var inserts = [id];

	sql = mysql.format(sql,inserts);

	connection.query(sql, function(err,result) {
		if (err) {
			logger.error("[comment getById error] - " + err.message);
			cb(error.internalServerErr);
			return;
		}

		cb(err,result);
	});
};

dao.getByBlogId = function (comment,cb) {
	var blogId =  comment.getBlogId();

	var sql = "SELECT comments.id,content,publisher.name as publisher,publisher.id as publisherId,publishTime,receiver.id as reciverId,receiver.name as receiver,messages,publisher.hpPath,publisher.hp FROM comments,user as publisher,user as receiver WHERE publisher.id = comments.publisher AND receiver.id = comments.receiver AND blogId = ? ORDER BY publishTime DESC";
	var inserts = [blogId];

	sql = mysql.format(sql,inserts);
	console.log(sql);

	connection.query(sql, function (err,result) {
		if (err) {
			logger.error("[get comment by blogId error] - " + err.message);
			cb(error.internalServerErr);
			return;
		}

		cb(null,result);
	});
};

dao.delete = function(comment,cb) {
	var id = comment.getId();

	var sql = "DELETE FROM comments WHERE commentId = ?";
	var inserts = [id];

	sql = mysql.format(sql,inserts);

	connection.query(sql, function(err,result) {
		if (err) {
			logger.error("[delete comment error] - " + err.message);
			cb(error.internalServerErr);
			return;
		}

		cb(err,result);
	});
};

dao.updateMessage = function(comment,cb) {
	this.getById(comment,function(err,result) {
		if (err) {
			cb(err);
			return;
		}

		var id = comment.getId();
		var message = comment.getMessage();
		var messages = result[0].messages + message;

		var sql = "UPDATE comments SET messages = ? WHERE id = ?";
		var inserts = [messages,id];

		sql = mysql.format(sql,inserts);

		connection.query(sql, function(err,result) {
			if (err) {
				logger.error("[comment update messages error] - " + err.message);
				cb(error.internalServerErr);
				return;
			}

			cb(err,result);
		});
	});
};