var logger = require("./logger").logger;

exports.setCookie = function (res,cookie) {
	var key = cookie.getKey();
	var value = cookie.getValue();
	var path = cookie.getPath();
	var exdays = cookie.getExdays();
	var maxAge = cookie.getMaxAge();
	var domain = cookie.getDomain();
	var httpOnly = cookie.getHttpOnly();

	var text = key + "=" + value + "; ";

	if (path) {
		text += "Path=" + path + "; ";
	}

	if (exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));

		var expires = d.toUTCString();
		text += "expires=" + expires + "; ";
	}

	if (maxAge) {
		text += "Max-Age=" + maxAge + "; ";
	}

	if (domain) {
		text += "Domain=" + domain + "; ";
	}

	if (httpOnly) {
		text += httpOnly + "; ";
	}

	logger.trace("[set cookie] - " + text);
	res.setHandlers("Set-Cookie", text);
};

exports.getCookies = function (req) {
	var Cookies = {};

	req.headers.cookie && req.headers.cookie.split(";").forEach(function (cookie) {
		var parts = cookie.split("=");
		Cookies[parts[0].trim()] = (parts[1] || "").trim();
	});

	return Cookies;
};

exports.getCookie = function (req,key) {
	var cookies = this.getCookies(req);
	return cookies[key];
};