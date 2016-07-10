var sha1 = require("sha1");
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

		service.signup(user,cb);
	});
};

exports.signin = function (req,res,cb) {
	getData.byBody(req, function (err,data) {
		if (err) {
			cb(err);
			return;
		}

		var name = data.name;
		var password = data.password;

		if (!name) {
			logger.warn("[singin error] - user name not provided");
			cb(error.usernameNotProvided);
			return;
		}

		if (!password) {
			logger.warn("[signin error] - user password not provided");
			cb(error.passwordNotProvided);
			return;
		}

		var user = new User();
		user.setName(name);
		user.setPassword(sha1(password));

		service.signin(user, function (err,result) {
			if (err) {
				cb(err);
				return;
			}

			var sessionId = result.sessionId;

			var cookieObj = new Cookie();
			cookieObj.setKey("sessionId");
			cookieObj.setValue(sessionId);
			cookieObj.setPath("/");
			cookieObj.setHttpOnly(true);
			cookieObj.setExdays(1);

			cookie.setCookie(res,cookieObj);
			cb(null,{userId : result.userId});
		});
	});
};

exports.signout = function (req,res,cb) {
	var sessionId = cookie.getCookie(req,"sessionId");

	service.signout(sessionId, function (err) {
		if (err) {
			cb(err);
			return;
		}

		var cookieObj = new Cookie();
		cookieObj.setKey("sessionId");
		cookieObj.setValue("");
		cookieObj.setPath("/");
		cookieObj.httpOnly(true);
		cookieObj.maxAge("0");

		cookie.setCookie(res,cookieObj);
		cb(null);
	});
};

exports.isSignedIn = function (req,res,cb) {
	var sessionId = cookie.getCookie(req,"sessionId");

	if (!sessionId) {
		cb(null, {isSignedIn : false});
		return;
	}

	service.isSignedIn(sessionId, function (err,result) {
		if (err) {
			cb(err);
			return;
		}

		cb(null, {isSignedIn : result});
	});
};

exports.isExists = function(req,res,cb) {
	getData.byUrl(req, function(err,data) {
		if (err) {
			cb(err);
			return;
		}
		
		var name = data.name;

		if (!name) {
			logger.warn("[isExists error] - user name not provided");
			cb(error.usernameNotProvided);
			return;
		}

		var user = new User();
		user.setName(name);

		service.isExists(user, function(err,result) {
			if (err) {
				cb(err);
				return;
			}

			cb(null,{isExists: result});
		});
	});
}