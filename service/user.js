var dao = require("../dao/user").dao;
var sessionDao = require("../dao/session").dao;
var logger = require("../util/logger").logger;
var error = require("../util/error");
var User = require("../model/user").User;

var service = {};

exports.service = service;

service.signup = function (user,cb) {
	dao.getByName(user, function (err,result) {
		if (err) {
			cb(err);
			return;
		}
		
		if (result.length > 0) {
			logger.warn("[signup error] - user already exists");
			cb(error.usernameAlreadyExists);
			return;
		}

		dao.create(user, function (err,result) {
			if (err) {
				cb(err);
				return;
			}

			var userId = result.insertId;

			cb(null,{userId : userId});
		});
	});
};

service.signin = function (user,cb) {
	dao.getByNameAndPw(user, function (err,result) {
		if (err) {
			cb(err);
			return;
		}

		if (result.length === 0) {
			logger.warn("[signin error] - user not exists");
			cb(error.userNotExists);
			return;
		}

		user.setId(result[0].id);

		sessionDao.create(user, function (err,result) {
			if (err) {
				cb(err);
				return;
			}

			cb(null, {sessionId: result.id, userId: result.userId});
		});
	});
};

service.signout = function (sessionId,cb) {
	sessionDao.delete(sessionId, function (err,result) {
		if (err) {
			cb(err);
			return;
		}
		
		if (result.length === 0) {
			logger.warn("[signout error] - user not exists");
			cb(error.userNotExists);
			return;
		}

		cb(null);
	});
}

service.isSignedIn = function (sessionId,cb) {
	sessionDao.get(sessionId, function (err,result) {
		if (err) {
			cb(err);
			return;
		}

		if (result.length === 0) {
			logger.trace("user is not signed in");
			cb(null,false);
			return;
		}

		logger.trace("user is signed in");
		cb(null,true);
	});
}

service.isExists = function(user,cb) {
	dao.getByName(user, function(err,result) {
		if (err) {
			cb(err);
			return;
		}

		if (result.length === 0) {
			cb(null,false);
			return;
		}

		cb(null,true);
	})
};

service.getOwner = function (sessionId,cb) {
	sessionDao.get(sessionId, function (err,result) {
		if (err) {
			cb(err);
			return;
		}

		if (result.length === 0) {
			logger.warn("[get user error] - " + error.unauthorized.discription);
			cb(error.unauthorized);
		}

		var userId = result[0].userId;
		var user = new User();
		user.setId(userId);

		dao.getById(user, function (err,result) {
			if (err) {
				cb(err);
				return;
			}

			if (result.length === 0) {
				logger.warn("[get user error] - " + error.userNotExists.discription);
				cb(error.userNotExists);
				return;
			}

			cb(null,result[0]);
		});
	});
};