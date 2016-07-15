var getData = require("../util/getData");
var logger = require("../util/logger").logger;
var error = require("../util/error");
var cookie = require("../util/cookie");
var service = require("../service/blog").service;

exports.getList = function (req,res,cb) {
	getData.byUrl(req, function (err,data) {
		if (err) {
			cb(err);
			return;
		}

		var time = data.time || new Date().getTime();
		var limit = data.limit;
		var offset = data.offset || 0;
		var sessionId = cookie.getCookie(req,"sessionId");
		
		if (!limit) {
			logger.warn("[get blog list error] - " + error.blogListLimitNotProvided.discription);
			cb(error.blogListLimitNotProvided);
			return;
		}
		
		var params = {
			time: time,
			limit: limit,
			offset: offset,
			sessionId: sessionId
		};

		service.getList(params,cb);
	});
};

exports.create = function (req,res,cb) {
	getData.byBody(req, function (err,data) {
		if (err) {
			cb(err);
			return;
		}

		var content = data.content;

		if (!content) {
			logger.warn("[create blog error] - " + error.blogContentNotProvided.discription);
			cb(error.blogContentNotProvided);
			return;
		}

		content = decodeURIComponent(content);

		var sessionId = cookie.getCookie(req,"sessionId");
		var params = {
			content: content,
			sessionId : sessionId
		};

		service.create(params,cb);
	});
};
