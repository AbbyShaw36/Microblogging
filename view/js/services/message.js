//回复
myApp.factory("messageService", ["$http",
  function($http) {
    var factory = {};

    //发布回复
    factory.create = function(data, success_cb, err_cb) {
      $http.post("createMessage", data).then(
        function(response) {
          console.log(response);
          alert("发布成功！");

          if (typeof success_cb === "function") {
            success_cb(response);
          }
        },
        function(response) {
          console.log(response);
          alert("发布失败！");

          if (typeof err_cb === "function") {
            err_cb(response);
          }
        }
      );
    };

    //删除回复
    factory.del = function(data, success_cb, err_cb) {
      $http.delete("deleteMessage?" + data).then(
        function(response) {
          console.log(response);
          alert("删除成功！");

          if (typeof success_cb === "function") {
            success_cb(response);
          }
        },
        function(response) {
          console.log(response);
          alert("删除失败！");

          if (typeof err_cb === "function") {
            err_cb(response);
          }
        }
      );
    };

    //获取回复列表
    factory.getList = function(data, success_cb, err_cb) {
      $http.get("getMessageList?" + data).then(
        function(response) {
          console.log(response);

          if (typeof success_cb === "function") {
            success_cb(response.data);
          }
        },
        function(response) {
          console.log(response);
          alert("加载失败！");

          if (typeof err_cb === "function") {
            err_cb(response);
          }
        }
      );
    };

    return factory;
  }
]);
