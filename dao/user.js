var mysql = require("mysql");
var connection = require("./mysql");
var logger = require("./util/logger");
var error = require("./util/error");

var dao = {};

exports.dao = dao;

dao.create = function(user,cb) {
	var name = user.getName();
	var password = user.getPassword();
	var age = user.getAge();
	var sex = user.getSex();
	var email = user.getEmail();

	var sql = "INSERT INTO user (name,password,age,sex,email) VALUES (?,?,?,?,?)";
	var inserts = [name,password,age,sex,email];

	sql = mysql.format(sql,inserts);
	
	connection.query(sql, function(err,result) {
		if (err) {
			logger.error("[create user error] - " + err.message);
			cb(error.internalServerErr);
			return;
		}

		cb(err,result);
	});
}

dao.get = function(user,cb) {
	var id = user.getId();

	var sql = "FIND * FROM user WHERE userId = ?";
	var inserts = [id];

	sql = mysql.format(sql,inserts);

	connection.query(sql, function(err,result) {
		if (err) {
			logger.error("[get user error] - " + err.message);
			cb(error.internalServerErr);
			return;
		}

		cb(err,result);
	});
}

dao.update = function(user,cb) {
	var id = user.getId();
	var name = user.getName();
	var password = user.getPassword();
	var age = user.getAge();
	var sex = user.getSex();
	var email = user.email();

	var sql = "UPDATE user SET name = ?, password = ?, age = ?, sex = ?, email = ? WHERE userId = ?";
	var inserts = [name,password,age,sex,email,id];

	sql = mysql.format(sql,inserts);

	connection.query(sql, function(err,result) {
		if (err) {
			logger.error("[update user error] - " + err.message);
			cb(error.internalServerErr);
			return;
		}

		cb(err,result);
	});
}