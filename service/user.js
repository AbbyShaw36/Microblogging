var fs = require("fs");
var dao = require("../dao/user").dao;
var sessionDao = require("../dao/session").dao;
var logger = require("../util/logger").logger;
var error = require("../util/error");
var User = require("../model/user").User;

var service = {};

exports.service = service;

service.signup = function(user, cb) {
  dao.getByName(user, function(err, result) {
    if (err) {
      cb(err);
      return;
    }

    if (result.length > 0) {
      logger.warn("[signup error] - user already exists");
      cb(error.usernameAlreadyExists);
      return;
    }

    dao.create(user, function(err, result) {
      if (err) {
        cb(err);
        return;
      }

      var userId = result.insertId;

      cb(null, {
        userId: userId
      });
    });
  });
};

service.signin = function(user, cb) {
  dao.getByNameAndPw(user, function(err, result) {
    if (err) {
      cb(err);
      return;
    }

    if (result.length === 0) {
      logger.warn("[signin error] - user not exists");
      cb(error.userNotExists);
      return;
    }

    user.setId(result[0].id);

    sessionDao.create(user, function(err, result) {
      if (err) {
        cb(err);
        return;
      }

      logger.trace("create session success");
      cb(null, {
        sessionId: result.id,
        userId: result.userId
      });
    });
  });
};

service.signout = function(sessionId, cb) {
  sessionDao.delete(sessionId, function(err, result) {
    if (err) {
      cb(err);
      return;
    }

    if (result.length === 0) {
      logger.warn("[signout error] - user not exists");
      cb(error.userNotExists);
      return;
    }

    cb(null);
  });
};

// 检查是否已登录
service.isSignedIn = function(sessionId, cb) {
  sessionDao.get(sessionId, function(err, result) {
    if (err) {
      cb(err);
      return;
    }

    // sessionId不存在，未登录
    if (result.length === 0) {
      logger.trace("SessionId not exists, user is not signed in");
      cb(null, {
        isSignedIn: false
      });
      return;
    }

    // sessionId存在
    logger.trace("user is signed in");

    var id = result[0].userId;

    var user = new User();
    user.setId(id);

    dao.getById(user, function(err, result) {
      if (err) {
        cb(err);
        return;
      }

      // 用户不存在，未登录
      if (result.length === 0) {
        logger.trace("SessionId exists, user not exists");
        cb(null, {
          isSignedIn: false
        });
        return;
      }

      // 用户存在，已登录
      logger.trace("User is signed in");
      cb(null, {
        isSignedIn: true,
        account: result[0]
      });
    });
  });
};

service.isExists = function(user, cb) {
  dao.getByName(user, function(err, result) {
    if (err) {
      cb(err);
      return;
    }

    if (result.length === 0) {
      cb(null, false);
      return;
    }

    cb(null, true);
  })
};

service.getOwner = function(sessionId, cb) {
  sessionDao.get(sessionId, function(err, result) {
    if (err) {
      cb(err);
      return;
    }

    if (result.length === 0) {
      logger.warn("[get user error] - " + error.unauthorized.discription);
      cb(error.unauthorized);
    }

    var userId = result[0].userId;
    var user = new User();
    user.setId(userId);

    dao.getById(user, function(err, result) {
      if (err) {
        cb(err);
        return;
      }

      if (result.length === 0) {
        logger.warn("[get user error] - " + error.userNotExists.discription);
        cb(error.userNotExists);
        return;
      }

      var data = result[0];
      delete data.password;
      cb(null, data);
    });
  });
};

service.getUser = function(user, cb) {
  dao.getById(user, function(err, result) {
    if (err) {
      cb(err);
      return;
    }

    if (result.length === 0) {
      logger.warn("[get user by id error] - " + error.userNotExists.discription);
      cb(error.userNotExists);
      return;
    }

    cb(null, {
      user: result[0]
    });
  });
};

service.update = function(user, cb) {
  dao.update(user, function(err, result) {
    if (err) {
      cb(err);
      return;
    }

    if (result.affectedRows === 0) {
      logger.warn("[update user info error] - " + error.userNotExists.discription);
      cb(error.userNotExists);
      return;
    }

    cb(null, result);
  });
}

service.saveHp = function(user, cb) {
  var hpData = decodeURIComponent(user.getHpData());
  var hpPath = "./view/" + user.getHpPath();
  var type = hpData.slice(0, hpData.indexOf(";")).split("/")[1];
  var data = new Buffer(hpData.replace(/^data:image\/\w+;base64,/, ""),
    "base64");
  var hp = new Date().getTime().toString() + Math.floor(Math.random() * 100)
    .toString() + "." + type;
  var path = hpPath + hp;

  fs.exists(hpPath, function(exists) {
    if (!exists) {
      logger.warn("[save head portrait error] - " + error.hpPathNotExists
        .discription);
      console.log(hpPath);
      cb(error.hpPathNotExists);
      return;
    }

    fs.writeFile(path, data, function(err) {
      if (err) {
        logger.error("[save head portrait error] - " + err);
        cb(error.internalServerErr);
        return;
      }

      logger.trace("[save head portrait] - success");
      cb(null, hp);
    });
  });
}
