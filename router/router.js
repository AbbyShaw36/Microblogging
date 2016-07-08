var middleware = require("../middleware/middleware").middleware;
var logger = require("../util/logger").logger;

exports.router = function (req,res,pathName,handle) {
	logger.trace("About to route a request for " + pathName);

	if (pathName === "/") {
		pathName += "index.html";
	}

	middleware(req,res,pathName,handle);
};