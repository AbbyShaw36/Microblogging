// 发布回复
myApp.controller("createMessageCtrl",["$scope","messageService",
  function($scope,messageService) {
    $scope.createMessage = function() {
      var content = $scope.message.content;
      var commentId = $scope.comment.id;
      var receiver = $scope.comment.publisher.id;
      var data = "content=" + content + "&commentId" + commentId + "&receiver=" + receiver;

      messageService.create(data,
        function(response) {
          $scope.messageList.unshift(response.data.message);
          $scope.comment.messages++;
        }
      );
    };
  }
]);

// 删除回复
myApp.controller("deleteMessageCtrl",["$scope","messageService",
  function($scope,messageService) {
    $scope.deleteMessage = function(id) {
      var isDel = confirm("是否确定删除该回复？");
      var data = "id=";

      if (!isDel) {
        return;
      }

      data += id;
      messageService.del(data,
        function() {
          $scope.messageList.splice($scope.index,1);
          $scope.comment.messages--;
        }
      );
    };
  }
]);

// 获取回复列表
myApp.controller("getMessageListCtrl",["$scope","messageService",
  function($scope,messageService) {
    $scope.currentPage = 1;
    $scope.perPage = 10;
    $scope.orderBy = {
      column: "publishTime",
      option: "DESC"
    };
    $scope.messageList = [];

    $scope.getMessageList = function() {
      var data = "currentPage=" + currentPage + "&perPage=" + perPage + "&orderBy=" + orderBy;

      messageService.getList(data,
        function(response) {
          $scope.messageList.push(response.data.messageList);
          $scope.comment.messages = response.data.messages;
        }
      );
    }
  }
]);
