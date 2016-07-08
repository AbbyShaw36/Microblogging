var logger = require("../util/logger").logger;
var service = require("../service/user").service;
var error = require("../util/error");
var cookie = require("../util/cookie");
var statusCode = require("../util/statusCode");
var serveStatic = require("../util/serveStatic").serveStatic;

exports.middleware = function (req,res,pathName,handle) {
	// 请求静态页面
	if (!handle[pathName]) {
		logger.trace("The request for " + pathName + " is a static serve");
		serveStatic(res,pathName);
		return;
	}

	var fun = handle[pathName][req.method];

	// 请求方式错误
	if (!fun) {
		logger.warn("The method of request for " + pathName + " is not allowed");
		res.statusCode = statusCode.methodNotAllowed;
		res.statusMessage = error.methodNotAllowed.discription;
		res.end();
		return;
	}

	if (pathName === "/isSignedIn") {
		run(req,res,fun);
		return;
	}

	var sessionId = cookie.getCookie(req,"sessionId");

	if (!sessionId) {
		if (pathName === "/signin") {
			run(req,res,fun);
			return;
		}

		logger.warn("user request for " + pathName + " unauthorized");
		res.statusCode = statusCode.unauthorized;
		res.statusMessage = error.unauthorized.discription;
		res.end();
		return;
	}

	service.isSignedIn(sessionId, function (err,result) {
		if (err) {
			res.statusCode = statusCode[err.type];
			res.statusMessage = err.discription;
			res.end();
			return;
		}

		if (pathName === "/signin") {
			if (result) {
				res.statusCode = statusCode.success;
				res.end();
				return;
			}
		} else if (!result) {
			logger.warn("user request for " + pathName + " unauthorized");
			res.statusCode = statusCode.unauthorized;
			res.statusMessage = error.unauthorized.discription;
			res.end();
			return;
		}

		run(req,res,fun);
	});
};

function run(req,res,fun) {
	fun(req,res, function (err,result) {
		if (err) {
			res.statusCode = statusCode[err.type];
			res.statusMessage = err.discription;
			res.end();
			return;
		}

		res.statusCode = statusCode.success;
		res.end(JSON.stringify(result));
	});
}
