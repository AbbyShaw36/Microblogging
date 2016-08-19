//微博
myApp.factory("blogService", ["$http",
  function($http) {
    var factory = {};

    //发布微博
    factory.create = function(data, success_cb, err_cb) {
      $http.post("createBlog", data).then(
        function(response) {
          alert("发布成功！");

          if (typeof success_cb === "function") {
            success_cb(response);
          }
        },
        function(response) {
          alert("发布失败");
          console.log(response);

          if (typeof err_cb === "function") {
            err_cb(response);
          }
        }
      );
    };

    //删除微博
    factory.del = function(data, success_cb, err_cb) {
      $http.delete("deleteBlog?" + data).then(
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

    //获取微博列表
    factory.getList = function(data, success_cb, err_cb) {
      $http.get("getBlogList?" + data).then(
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
