var User = require("../model/user").User;
var Cookie = require("../model/cookie").Cookie;
var service = require("../service/user").service;
var getData = require("../util/getData");
var logger = require("../util/logger").logger;
var error = require("../util/error");
var cookie = require("../util/cookie");

exports.signup = function (req,res,cb) {
	getData.byBody(req, function (err,data) {
		if (err) {
			cb(err);
			return;
		}

		var name = data.name;
		var password = data.password;

		if (!name) {
			logger.warn("[signup error] - user name not provided");
			cb(error.usernameNotProvided);
			return;
		}

		if (!password) {
			logger.warn("[signup error] - user password not provided");
			cb(error.passwordNotProvided);
			return;
		}

		var user = new User();
		user.setName(name);
		user.setPassword(password);

		service(user,cb);
	});
};


