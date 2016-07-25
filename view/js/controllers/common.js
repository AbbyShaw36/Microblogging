var CommonModule = angular.module("CommonModule",[]);

// 检查是否已登录
CommonModule.controller("IsSignedInCtrl", function ($scope,$http) {
	$http.get("isSignedIn").then(
		function (response) {
			if (!response.data.isSignedIn) {
				if (!location.href.match("#/login")) {
					location.href = "#/login";
				}

				return;
			}

			if (location.href.match("#/login")) {
				location.href = "#/index";
			}
		},
		function (response) {
			console.log(response);
		}
	)
});

// 选项卡功能
CommonModule.controller("TabCtrl", function ($scope) {
	$scope.tab = 1;

	$scope.setTab = function (newTab) {
		$scope.tab = newTab;
	};

	$scope.isSet = function (tabNum) {
		return $scope.tab === tabNum;
	};
});

// 下拉菜单
CommonModule.controller("DropDownCtrl", function ($scope) {
	$scope.dropDown = false;

	$scope.setDropDown = function () {
		$scope.dropDown = !$scope.dropDown;
	}

	$scope.isDropDown = function () {
		return $scope.dropDown;
	}
});