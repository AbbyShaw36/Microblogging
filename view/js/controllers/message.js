var MessageModule = angular.module("MessageModule",[]);

MessageModule.controller("CreateMessageCtrl", function ($scope,$http) {
	$scope.replyComment = function () {
		if ($scope.createMessageForm.$invalid) {
			alert("请输入合法内容！");
			return;
		}

		var receiver = $scope.comment.publisherId;

		createMessage(receiver);
	}

	$scope.replyMessage = function () {
		if ($scope.createMessageForm.$invalid) {
			alert("请输入合法内容");
			return;
		}

		var receiver = $scope.message.publisherId;

		createMessage(receiver);
	}

	function createMessage(receiver) {
		var content = encodeURIComponent($scope.messageContent);
		var commentId = $scope.comment.id;

		var data = "content=" + content + "&receiver=" + receiver + "&commentId=" + commentId;

		$http.post("createMessage",data).then(
			function (response) {
				alert("回复成功！");
				var message = response.data.message;
				$scope.comment.messageList.push(message);
				$scope.messageContent = "";
				$scope.message.reply = false;
			},
			function (response) {
				console.log(response);
			}
		);
	}
});
