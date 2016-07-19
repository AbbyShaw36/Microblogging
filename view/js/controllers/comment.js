var CommentModule = angular.module("CommentModule",[]);

CommentModule.directive("comment",function () {
	return {
		restrict: "E",
		scope: {
			"commentList": "=comments",
			"blogId": "=owner",
			"receiver" : "=receiver",
		},
		templateUrl: "tpls/comments.html"
	};
});

CommentModule.controller("GetCommentsCtrl", function ($scope,$http) {
	console.log($scope.blogId);
	$http.get("getCommentsByBlogId?blogId=" + $scope.blogId).then(
		function (response) {
			var comments = response.data.comments;
			console.log(comments);

			for (var index in comments) {
				var comment = comments[index];
				(function (comment) {
					comment.reply = false;

					if (comment.messages === 0) {
						return;
					}

					var commentId = comment.id;
					console.log(commentId);

					$http.get("getMessageByCommentId?commentId=" + commentId).then(
						function (response) {
							comment.messageList = response.data.messageList;
							console.log(comment.messageList);
						},
						function (response) {
							alert("加载回复数据失败！");
							console.log(response);
						}
					);
				})(comment);
			}

			$scope.commentList = comments;
		},
		function (response) {
			alert("加载评论数据失败！");
			console.log(response);
		}
	);
});

CommentModule.controller("CreateCommentCtrl", function ($scope,$http) {
	$scope.publishComment = function () {
		if ($scope.createCommentForm.$invalid) {
			return;
		}

		var content = encodeURIComponent($scope.blogContent);
		var blogId = $scope.blogId;
		var receiver = $scope.receiver;
		var data = "content=" + content + "&blogId=" + blogId + "&receiver=" + receiver;

		$http.post("createComment",data).then(
			function (response) {
				alert("发布评论成功！");

				var comment = response.data.comment;

				$scope.commentList.unshift(comment);
				$scope.blogContent = "";
			},
			function (response) {
				alert("发布评论失败！");
				console.log(response);
			}
		);
	};
});
