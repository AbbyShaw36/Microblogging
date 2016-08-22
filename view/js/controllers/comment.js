// 发布评论
myApp.controller("createCommentCtrl",["$scope","commentService",
  function($scope,commentService) {
    $scope.createComment = function() {
      if (!$scope.createCommentForm.$invalid) {
        return;
      }

      var content = encodeURIComponent($scope.comment.content);
      var blogId = $scope.blog.id;
      var receiver = $scope.blog.publisher.id;
      var data = "content=" + content + "&blogId=" + blogId + "&receiver=" + receiver;

      commentService.create(data,
        function(response) {
          var comment = response.data.comment;

          $scope.commentList.unshift(comment);
          $scope.blog.comments++;
        }
      );
    };
  }
]);

// 删除评论
myApp.controller("deleteCommentCtrl",["$scope","commentService",
  function($scope, commentService) {
    $scope.deleteComment = function(id) {
      var isDel = confirm("是否确定删除此评论？");
      var data = "id=";

      if (!isDel) {
        return;
      }

      data += id;
      commentService.del(data,
        function() {
          $scope.commentList.splice($scope.index,1);
          $scope.blog.comments--;
        }
      );
    };
  }
]);

// 获取评论列表
myApp.controller("getCommentListCtrl",["$scope","commentService",
  function($scope, commentService) {
    $scope.currentPage = 1;
    $scope.perPage = 10;
    $scope.orderBy = {
      column: "publishTime",
      option: "DESC"
    };
    $scope.commentList = [];

    $scope.getCommentList = function() {
      var data = "currentPage=" + $scope.currentPage + "&perPage=" + $scope.perPage + "&orderBy=" + orderBy + "&blogId=" + $scope.blog.id;

      commentService.getList(data,
        function(response) {
          $scope.commentList.push(response.data.commentList);
          $scope.blog.comments = response.data.comments;
        }
      );
    };
  }
]);
