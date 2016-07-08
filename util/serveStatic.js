var fs = require("fs");
var mime = require("mime");
var path = require("path");

exports.serveStatic = function (res,pathName) {
	var filePath = "./view" + pathName;

	fs.exists(filePath, function (exists) {
		if (exists) {
			fs.readFile(filePath, function (err,data) {
				if (err) {
					send404(res);
					return;
				}

				sendFile(res,filePath,data);
			});
			return;
		}

		send404(res);
	});
};

function send404(res) {
	res.writeHead(404, {"Content-Type" : "text/plain"});
	res.write("Error 404: resource not found.");
	res.end();
}

function sendFile(res,filePath,fileContent) {
	res.writeHead(200, {
		"Content-type" : mime.lookup(path.basename(filePath))
	});
	res.end(fileContent);
}