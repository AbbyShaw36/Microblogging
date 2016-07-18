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

		cb(null,result);
	});
};

dao.getById = function(blog,cb) {
	var id = blog.getId();

	var sql = "SELECT * FROM blogs WHERE id = ?";
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

dao.getList = function(params,cb) {
	var limit = Number(params.limit);
	var offset = Number(params.offset);
	var time = Number(params.time);
	var idList = params.idList;

	var sql = "SELECT blogs.id,content,user.name as publisher,user.id as publisherId,publishTime,comments,hpPath,hp FROM blogs,user WHERE";
	var inserts = [];

	for (var i=0; i < idList; i++) {
		if (i === 0) {
			sql += " publisher = ?";
		} else {
			sql += " OR publisher = ?";
		}
		inserts.push(idList[i]);
	}

	sql += " AND publishTime < ? AND user.id = blogs.publisher LIMIT ? OFFSET ?";
	inserts = inserts.concat([time,limit,offset]);
	sql = mysql.format(sql,inserts);

	console.log(sql);

	connection.query(sql, function (err,result) {
		if (err) {
			logger.error("[get blog list error] - " + err.message);
			cb(error.internalServerErr);
			return;
		}

		cb(null,result);
	});
};

dao.getListTotalCount = function (params,cb) {
	var time = Number(params.time);
	var idList = params.idList;

	var sql = "SELECT COUNT(*) AS totalCount FROM blogs WHERE ";
	var inserts = [];

	for (var i=0; i < idList; i++) {
		if (i === 0) {
			sql += " publisher = ?";
		} else {
			sql += " OR publisher = ?";
		}
		inserts.push(idList[i]);
	}

	sql += " AND publishTIme < ?";
	inserts.push(time);
	sql = mysql.format(sql,inserts);

	connection.query(sql, function (err,result) {
		if (err) {
			logger.error("[get blog list total count error] - " + err.message);
			cb(error.internalServerErr);
			return;
		}

		cb(null,result);
	});
}

dao.delete = function(blog,cb) {
	var id = blog.getId();

	var sql = "DELETE FROM blogs WHERE id = ?";
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

		var sql = "UPDATE blogs SET comments = ? WHERE id = ?";
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