var error = require("../util/error");
var logger = require("../util/logger").logger;
var sessionDao = require("../dao/session").dao;
var followDao = require("../dao/follow").dao;
var dao = require("../dao/blogs").dao;
var Blog = require("../model/blog").Blog;

var service = {};

exports.service = service;

service.getList = function (params,cb) {
	var sessionId = params.sessionId;
	var time = params.time;
	var limit = params.limit;
	var offset = params.offset;

	sessionDao.get(sessionId, function (err,result) {
		if (err) {
			cb(err);
			return;
		}

		if (result.length === 0) {
			logger.warn("[get blog list error] - " + error.unauthorized.discription);
			cb(error.unauthorized);
			return;
		}

		var id = result[0].userId;

		followDao.getByUId(id,function (err,result) {
			if(err) {
				cb(err);
				return;
			}

			var idList = [id];

			for (var i=0; i < result.length; i++) {
				idList.push(result[i].fuId);
			}

			var params = {
				idList: idList,
				time: time,
				limit: limit,
				offset: offset
			}

			dao.getListTotalCount(params, function (err,result) {
				if (err) {
					cb(err);
					return;
				}
				
				var count = result[0].totalCount;
				
				if (count <= params.offset) {
					cb(null,{totalCount: count, blogList: []});
					return;
				}
				
				dao.getList(params, function (err,result) {
					if (err) {
						cb(err);
						return;
					}

					cb(null,{totalCount:count, blogList: result});
				});
			});
		});
	});
};

service.create = function (params,cb) {
	var content = params.content;
	var sessionId = params.sessionId;

	sessionDao.get(sessionId, function (err,result) {
		if (err) {
			cb(err);
			return;
		}

		if (result.length === 0) {
			logger.warn("[create blog error] - " + error.unauthorized.discription);
			cb(error.unauthorized);
			return;
		}

		var id = result[0].userId;

		var blog = new Blog();
		blog.setContent(content);
		blog.setPublisher(id);

		dao.create(blog,cb);
	})
}
