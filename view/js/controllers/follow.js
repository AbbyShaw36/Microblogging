var FollowModule = angular.module("FollowModule",[]);

FollowModule.controller("GetFollowersCtrl", function ($scope,$stateParams,$http) {
	var userId = $stateParams.userId;

	$http.get("getFollowers?uId=" + userId).then(
		function (response) {
			console.log(response);
		},
		function (response) {
			console.log(response);
		}
	);
});

FollowModule.controller("GetFollowingsCtrl", function ($scope,$stateParams,$http) {
	
});
