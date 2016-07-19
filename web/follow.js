var service = require("../service/follow").service;
var Follow = require("../model/follow").Follow;
var getData = require("../util/getData");
var logger = require("../util/logger").logger;
var error = require("../util/error");

exports.getFollowers = function (req,res,cb) {
	getData.byUrl(req, function (err,data) {
		if (err) {
			cb(err);
			return;
		}
		
		var uId = data.uId;
		
		if (!uId) {
			logger.warn("[get followers error] - " + error.uIdNotProvided.discription);
			cb(error.uIdNotProvided);
			return;
		}

		var follow = new Follow();
		follow.setUId(uId);

		service.getFollowers(follow,cb);
	});
};