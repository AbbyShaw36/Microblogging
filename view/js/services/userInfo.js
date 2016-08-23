// 用户信息
myApp.factory("userInfoService", ["$http",
  function($http) {
    var factory = {};

    // 获取用户信息
    factory.get = function(data, success_cb, err_cb) {
      $http.get("getUserInfo?" + data).then(
        function(response) {
          console.log(response);

          if (typeof success_cb === "function") {
            success_cb(response);
          }
        },
        function(response) {
          console.log(response);
          alert("加载数据失败！");

          if (typeof err_cb === "function") {
            err_cb(response);
          }
        }
      );
    };

    // 更新用户信息
    factory.update = function(data, success_cb, err_cb) {
      $http.put("updateInfo", data).then(
        function(response) {
          console.log(response);
          alert("修改成功！");

          if (typeof success_cb === "function") {
            success_cb(response);
          }
        },
        function(response) {
          console.log(response);
          alert("修改失败！");

          if (typeof err_cb === "function") {
            err_cb(response);
          }
        }
      );
    };

    return factory;
  }
]);
