var dao = require("../dao/user").dao;
var sessionDao = require("../dao/session").dao;
var logger = require("../util/logger").logger;
var error = require("../util/error");

var service = {};

exports.service = service;

service.signup = function (user,cb) {
	dao.create(user, function (err,result) {
		if (err) {
			cb(err);
			return;
		}
		
		var userId = result.insertId;

		cb(err,{userId : userId});
	});
};
