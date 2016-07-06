var mysql = require("mysql");
var connection = require("./mysql").connection;
var logger = require("../util/logger").logger;
var error = require("../util/error");

var dao = {};

exports.dao = dao;

dao.create = function(blog,cb) {
	var content = blog.getContent();
	var publishTime = new Date().getTime();
	var publisher = blog.getPublisher();

	var sql = "INSERT INTO blogs (content,publishTime,publisher) VALUES(?,?,?)";
	var inserts = [content,publishTime,publisher];

	sql = mysql.format(sql,inserts);

	connection.query(sql, function(err,result) {
		if (err) {
			logger.error("[create blog error] - " + err.message);
			cb(error.internalServerErr);
			return;
		}

		cb(err,result);
	});
};

dao.getById = function(blog,cb) {
	var id = blog.getId();

	var sql = "SELECT * FROM blogs WHERE blogId = ?";
	var inserts = [id];

	sql = mysql.format(sql,inserts);

	connection.query(sql, function(err,result) {
		if (err) {
			logger.error("[getById error - ]" + err.message);
			cb(error.internalServerErr);
			return;
		}

		cb(err,result);
	});
};

dao.getList = function() {

};

dao.delete = function(blog,cb) {
	var id = blog.getId();

	var sql = "DELETE FROM blogs WHERE blogId = ?";
	var inserts = [id];

	sql = mysql.format(sql,inserts);

	connection.query(sql, function(err,result) {
		if (err) {
			logger.error("[delete blog error] - " + err.message);
			cb(error.internalServerErr);
			return;
		}

		cb(err,result);
	});
}

dao.updateComment = function(blog,cb) {
	this.getById(blog, function(err,result) {
		if (err) {
			cb(err);
			return;
		}

		var id = blog.getId();
		var comment = blog.getComment();
		var comments = result[0].comments + comment;

		var sql = "UPDATE blogs SET comments = ? WHERE blogId = ?";
		var inserts = [comments,id];

		sql = mysql.format(sql,inserts);

		connection.query(sql, function(err,result) {
			if (err) {
				logger.error("[addComment error] - " + err.message);
				cb(error.internalServerErr);
				return;
			}

			cb(err,result);
		});
	});
};