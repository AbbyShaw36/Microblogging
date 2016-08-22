// 发布微博
myApp.controller("createBlogCtrl", ["$scope", "blogService",
  function($scope, blogService) {
    $scope.createBlog = function() {
      if (!$scope.createBlogForm.$valid) {
        return;
      }

      var content = encodeURIComponent($scope.blog.content);
      var data = "content=" + content;

      blogService.create(data,
        function(response) {
          var blog = response.data.blog;

          $scope.blogList.unshift(blog);
        }
      );
    };
  }
]);

// 获取微博列表
myApp.controller("getBlogListCtrl",["$scope","blogService",
  function($scope,blogService) {
    $scope.currentPage = 1;
    $scope.perPage = 10;
    $scope.orderBy = {
      column: "publishTime",
      option: "DESC"
    };
    $scope.blogList = [];

    $scope.getBlogList = function(publisher) {
      var data = "currentPage=" + $scope.currentPage + "&perPage=" + $scope.perPage + "&publisher=" + publisher + "&orderBy=" + orderBy;
      blogService.getBlogList(data,
        function(response) {
          $scope.blogList.push(response.data.blogList);
        }
      )
    };
  }
]);

// 删除微博
myApp.controller("deleteBlogCtrl",["$scope","blogService",
  function($scope,blogService) {
    $scope.deleteBlog = function(id) {
      var isDel = confirm("是否确定删除该条微博？");
      var data = "id=";

      if (!isDel) {
        return;
      }

      data += id;
      blogService.del(data,
        function() {
          $scope.blogList.splice($scope.index,1);
        }
      );
    };
  }
]);
