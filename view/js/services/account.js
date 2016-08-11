myApp.factory("accountService", ["$http", "$location",
  function($http, $location) {
    var factory = {};

    //注册
    factory.signup = function(name, password) {
      var data = "name=" + name + "&password=" + password;

      return $http.post("signup", data).then(
        function(response) {
          console.log(response);
          alert("注册成功！");
          location.reload();
        },
        function(response) {
          console.log(response);
          alert("注册失败！");
        }
      );
    };

    //登录
    factory.signin = function(name, password) {
      var data = "name=" + name + "&password=" + password;

      return $http.post("signin", data).then(
        function(response) {
          console.log(response);
          $location.url("#/index");
        },
        function(response) {
          console.log(response);
          alert("登录失败！");
        }
      );
    };

    //退出
    factory.signout = function() {
      return $http.delete("signout").then(
        function(response) {
          console.log(response);
          $location.url("#/signin");
        },
        function(response) {
          console.log(response);
          alert("退出失败！");
        }
      );
    };

    return factory;
  }
]);
