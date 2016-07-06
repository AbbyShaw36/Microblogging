var mysql = require("mysql");
var connection = require("./mysql").connection;
var logger = require("./util/logger").logger;
var error = require("./util/error");

var dao = {};

exports.dao = dao;

dao.create = function(follow,cb) {
	var uId = follow.getUId();
	var fuId = follow.getFuId();

	var sql = "INSERTS INTO follow (uId,fuId) VALUES(?,?)";
	var inserts = [uId,fuId];

	sql = mysql.format(sql,inserts);

	connection.query(sql, function(err,result) {
		if (err) {
			logger.error("[create follow error] - " + err.message);
			cb(error.internalServerErr);
			return;
		}

		cb(err,result);
	});
}

dao.getByUId = function(follow,cb) {
	var uId = follow.getUId();

	var sql = "SELECT * FROM follow WHERE uId = ?";
	var inserts = [uId];

	sql = mysql.format(sql,inserts);

	connection.query(sql, function (err,result) {
		if (err) {
			logger.error("[getByUId error] - " + err.message);
			cb(error.internalServerErr);
			return;
		}

		cb(err,result);
	});
}

dao.getByFuId = function(follow,cb) {
	var fuId = follow.getFuId();

	var sql = "SELECT * FROM follow WHERE FuId = ?";
	var inserts = [fuId];

	sql = mysql.format(sql,inserts);

	connection.query(sql, function (err,result) {
		if (err) {
			logger.error("[getByFuId error] - " + err.message);
			cb(error.internalServerErr);
			return;
		}

		cb(err,result);
	});
}

dao.delete = function(follow,cb) {
	var uId = follow.getUId();
	var fuId = follow.getFuId();

	var sql = "DELETE FROM follow WHERE uId = ? AND fuId = ?";
	var inserts = [uId,fuId];

	sql = mysql.format(sql,inserts);

	connection.query(sql, function(err,result) {
		if (err) {
			logger.error("[delete follow error] - " + err.message);
			cb(error.internalServerErr);
			return;
		}

		cb(err,result);
	});
}
