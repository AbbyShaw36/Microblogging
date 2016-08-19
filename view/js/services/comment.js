//评论
myApp.factory("commentService", ["$http",
  function($http) {
    var factory = {};

    //发布评论
    factory.create = function(data, success_cb, err_cb) {
      $http.post("createComment", data).then(
        function(response) {
          console.log(response);
          alert("发布评论成功！");

          if (typeof success_cb === "function") {
            success_cb(response);
          }
        },
        function(response) {
          alert("发布评论失败！");
          console.log(response);

          if (typeof err_cb === "function") {
            err_cb(response);
          }
        }
      );
    };

    //删除评论
    factory.del = function(data, success_cb, err_cb) {
      $http.delete("deleteComment?" + data).then(
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

    //获取评论列表
    factory.getList = function(url, success_cb, err_cb) {
      $http.get(url).then(
        function(response) {
          console.log(response);

          if (typeof success_cb === "function") {
            success_cb(response);
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
