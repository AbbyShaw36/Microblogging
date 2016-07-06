var queryString = require("querystring");
var url = require("url");
var error = require("../util/error");
var logger = require("../util/logger").logger;

exports.byBody = function (req,cb) {
	var data = "";

	req.addListener("data", function (chuck) {
		data += chuck;

		if (data.length > 1e6) {
			data = "";
			logger.warn("[get data by body error] - Request entity too large");
			cb(error.requestEntityTooLarge);
			req.connection.destroy();
		}
	});

	req.addListener("end", function () {
		data = queryString.parse(data);

		logger.trace("[get data by body result]");
		console.log(data);

		cb(null,data);
	});
};

exports.byUrl = function (req,cb) {
	var data = url.parse(req.url,true).query;

	logger.trace("[get data by url result]");
	console.log(data);

	cb(null,data);
};
