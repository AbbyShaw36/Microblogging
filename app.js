var http = require("http");
var url = require("url");
var mongoose = require("mongoose");
var logger = require("./util/logger").logger;
var router = require("./router").router;

var handle = {
};

mongoose.connect("mongodb://localhost/microblogging");

var db = mongoose.connection();

db.on("error", function () {
	logger.error("Fail to connect database");
});

db.once("open",function () {
	logger.trace("Success to connect database");
});

(function (router,handle) {
	function onRequest(req,res) {
		var pathName = url.parse(req.url).pathname;
		
		logger.trace("Request for " + pathName + " received");
		router(req,res,pathName,handle);
	}
	
	http.createServer(onRequest).listen(global.config.port, function () {
		logger.trace("Server has started");
	});
})(router,handle);
