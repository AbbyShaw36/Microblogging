var Session = require("./model").Session;
var logger = require("../util/logger").logger;
var error = require("../util/error");

var dao = {};

exports.dao = dao;

dao.create = function (user,cb) {
	var session = new Session({userId : user.getId()});

	session.save(function (err,result) {
		if (err) {
			logger.error("[create session error] - " + err.message);
			cb(error.internalServerErr);
			return;
		}

		cb(err,{userId: result.userId, id: result._id});
	});
},

dao.get = function (sessionId,cb) {
	Session.find({_id : sessionId}, function (err,result) {
		if (err) {
			logger.error("[get session error] - " + err.message);
			cb(error.internalServerErr);
			return;
		}

		cb(err,result);
	});
};

dao.delete = function (sessionId,cb) {
	Session.remove({_id: sessionId}, function (err,result) {
		if (err) {
			logger.error("[delete session error] - " + err.message);
			cb(error.internalServerErr);
			return;
		}

		cb(err,{length: result.result.n});
	});
};
