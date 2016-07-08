var IsSignedInModule = angular.module("IsSignedInModule",[]);
IsSignedInModule.controller("IsSignedInCtrl", function ($scope,$http) {
	$http.get("isSignedIn").then(
		function (response) {
			if (!response.data.isSignedIn) {
				location.href = "#/login"
			}
		},
		function (response) {
			console.log(response);
		}
	)
});

var LoginModule = angular.module("LoginModule",[]);
LoginModule.controller("LoginCtrl", function ($scope,$http) {
	$http.get("isSignedIn").then(
		function (response) {
			if (response.data.isSignedIn) {
				location.href = "#/index"
			}
		},
		function (response) {
			console.log(response);
		}
	)
});

var TabModule = angular.module("TabModule",[]);
TabModule.controller("TabCtrl", function ($scope) {
	$scope.tab = 1;

	$scope.setTab = function (newTab) {
		$scope.tab = newTab;
	};

	$scope.isSet = function (tabNum) {
		return $scope.tab === tabNum;
	};
});

var SignupModule = angular.module("SignupModule",[]);
SignupModule.controller("SignupCtrl", function ($scope) {
	$scope.signup = function () {
		console.log($scope.name);
	}
})
