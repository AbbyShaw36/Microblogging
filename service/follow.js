var dao = require("../dao/follow").dao;

var service = {};

exports.service = service;

service.getFollowers = function (follow,cb) {
	dao.getByUId(follow, function (err,result) {
		if (err) {
			cb(err);
			return;
		}

		cb(null, {followers: result});
	});
};
