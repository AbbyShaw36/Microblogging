myApp.factory("accountService", ["$http", "$location",
  function($http, $location) {
    var factory = {};

    //注册
    factory.signup = function(data, success_cb, err_cb) {
      $http.post("signup", data).then(
        function(response) {
          console.log(response);
          alert("注册成功！");

          if (typeof success_cb === "function") {
            success_cb(response);
          }
        },
        function(response) {
          console.log(response);
          alert("注册失败！");

          if (typeof err_cb === "function") {
            err_cb(response);
          }
        }
      );
    };

    //登录
    factory.signin = function(data, success_cb, err_cb) {
      $http.post("signin", data).then(
        function(response) {
          console.log(response);

          if (typeof success_cb === "function") {
            success_cb(response);
          }
        },
        function(response) {
          console.log(response);
          alert("登录失败！");

          if (typeof err_cb === "function") {
            err_cb(response);
          }
        }
      );
    };

    //退出
    factory.signout = function(success_cb, err_cb) {
      $http.delete("signout").then(
        function(response) {
          console.log(response);

          if (typeof success_cb === "function") {
            success_cb(response);
          }
        },
        function(response) {
          console.log(response);
          alert("退出失败！");

          if (typeof err_cb === "function") {
            err_cb(response);
          }
        }
      );
    };

    factory.checkSignedIn = function(success_cb, err_cb) {
      $http.get("isSignedIn").then(
        function(response) {
          console.log(response);

          if (typeof success_cb === "function") {
            cb(response);
          }
        },
        function(response) {
          console.log(response);

          if (typeof err_cb === "function") {
            cb(response);
          }
        }
      );
    };

    return factory;
  }
]);
