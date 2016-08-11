var mysql = require("mysql");
var connection = require("./mysql").connection;
var logger = require("../util/logger").logger;
var error = require("../util/error");

var dao = {};

exports.dao = dao;

dao.create = function(user, cb) {
  var name = user.getName();
  var password = user.getPassword();

  var sql = "INSERT INTO user (name,password) VALUES (?,?)";
  var inserts = [name, password];

  sql = mysql.format(sql, inserts);

  connection.query(sql, function(err, result) {
    if (err) {
      logger.error("[create user error] - " + err.message);
      cb(error.internalServerErr);
      return;
    }

    cb(err, result);
  });
};

dao.getById = function(user, cb) {
  var id = user.getId();

  var sql =
    "SELECT id,name,birthday,sex,email,introduction,hpPath,hp,followings,followers FROM user WHERE id = ?";
  var inserts = [id];

  sql = mysql.format(sql, inserts);

  connection.query(sql, function(err, result) {
    if (err) {
      logger.error("[get user error] - " + err.message);
      cb(error.internalServerErr);
      return;
    }

    cb(err, result);
  });
};

dao.getByName = function(user, cb) {
  var name = user.getName();

  var sql = "SELECT * FROM user WHERE name = ?";
  var inserts = [name];

  sql = mysql.format(sql, inserts);

  connection.query(sql, function(err, result) {
    if (err) {
      logger.error("[get user by name error] - " + err.message);
      cb(error.internalServerErr);
      return;
    }

    cb(err, result);
  });
};

dao.getByNameAndPw = function(user, cb) {
  var name = user.getName();
  var password = user.getPassword();

  var sql = "SELECT * FROM user WHERE name = ? AND password = ?";
  var inserts = [name, password];

  sql = mysql.format(sql, inserts);

  connection.query(sql, function(err, result) {
    if (err) {
      logger.error("[get user by name and password error] - " + err.message);
      cb(error.internalServerErr);
      return;
    }

    cb(err, result);
    logger.trace("get user by name and password success");
  });
}

dao.getList = function() {

};

dao.update = function(user, cb) {
  var id = user.getId();
  var name = user.getName();
  var birthday = user.getBirthday();
  var sex = user.getSex();
  var email = user.getEmail();
  var introduction = user.getIntroduction();
  var hpPath = user.getHpPath();
  var hp = user.getHp();

  var sql =
    "UPDATE user SET name = ?, birthday = ?, sex = ?, email = ?, introduction = ?, hpPath = ?, hp = ? WHERE id = ?";
  var inserts = [name, birthday, sex, email, introduction, hpPath, hp, id];

  sql = mysql.format(sql, inserts);

  connection.query(sql, function(err, result) {
    if (err) {
      logger.error("[update user error] - " + err.message);
      cb(error.internalServerErr);
      return;
    }

    cb(err, result);
  });
};

dao.updateBlog = function(user, cb) {
  this.getById(user, function(err, result) {
    if (err) {
      cb(err);
      return;
    }

    console.log(result);
    console.log(result[0]);
    console.log(result[0].blogs);
    var id = user.getId();
    var blog = user.getBlog();
    var blogs = result[0].blogs + blog;

    var sql = "UPDATE user SET blogs = ? WHERE id = ?";
    var inserts = [blogs, id];

    sql = mysql.format(sql, inserts);

    connection.query(sql, function(err, result) {
      if (err) {
        logger.error("[addBlogs error] - " + err.message);
        cb(error.internalServerErr);
        return;
      }

      cb(err, result);
    });
  });
};

dao.updateFollowing = function(user, cb) {
  this.getById(user, function(err, result) {
    if (err) {
      cb(err);
      return;
    }

    var id = user.getId();
    var following = user.getFollowing();
    var followings = result[0].followings + following;

    var sql = "UPDATE user SET followings = ? WHERE id = ?";
    var inserts = [followings, id];

    sql = mysql.format(sql, inserts);

    connection.query(sql, function(err, result) {
      if (err) {
        logger.error("[addFollowing error] - " + err.message);
        cb(error.internalServerErr);
        return;
      }

      cb(err, result);
    });
  });
};

dao.updateFollower = function(user, cb) {
  this.getById(user, function(err, result) {
    if (err) {
      cb(err);
      return;
    }

    var id = user.getId();
    var follower = user.getFollower();
    var followers = result[0].followers + follower;

    var sql = "UPDATE user SET followers = ? WHERE id = ?";
    var inserts = [followers, id];

    sql = mysql.format(sql, inserts);

    connection.query(sql, function(err, result) {
      if (err) {
        logger.error("[addFollower error] - " + err.message);
        cb(error.internalServerErr);
        return;
      }

      cb(err, result);
    });
  });
};
