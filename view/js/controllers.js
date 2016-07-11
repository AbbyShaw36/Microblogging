/**
 * 检查是否登录（非登录页面），未登录跳转到登录页面
 */
var IsSignedInModule = angular.module("IsSignedInModule",[]);
IsSignedInModule.controller("IsSignedInCtrl", function ($scope,$http) {
	$http.get("isSignedIn").then(
		function (response) {
			if (!response.data.isSignedIn) {
				location.href = "#/login";
			}
		},
		function (response) {
			console.log(response);
		}
	)
});

/**
 * 检查是否登录（登录页面），已登录跳转到首页
 */
var LoginModule = angular.module("LoginModule",[]);
LoginModule.controller("LoginCtrl", function ($scope,$http) {
	$http.get("isSignedIn").then(
		function (response) {
			if (response.data.isSignedIn) {
				location.href = "#/index";
			}
		},
		function (response) {
			console.log(response);
		}
	)
});

/**
 * tab选项卡
 */
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

/**
 * 登录模块
 */
var SigninModule = angular.module("SigninModule",[]);
SigninModule.controller("SigninCtrl",function($scope,$http) {
	$scope.signin = function () {
		if ($scope.signinForm.$valid) {
			var name = $.trim($scope.name);
			var password = $.trim($scope.password);
			var data = "name=" + name + "&password=" + password;

			$http.post("signin",data).then(
				function (response) {
					location.href = "#/index";
				},
				function (response) {
					if (response.status === 404) {
						alert("登录失败：用户名或密码错误！");
					}
				}
			);
		}
	}
});

/**
 * 注册模块
 */
var SignupModule = angular.module("SignupModule",[]);
SignupModule.controller("SignupCtrl", function ($scope,$http) {
	$scope.signup = function () {
		if ($scope.signupForm.$valid) {
			var name = $.trim($scope.name);
			var password = $.trim($scope.password);
			var data = "name=" + name + "&password=" + password;

			$http.post("signup",data).then(
				function (response) {
					alert("注册成功！");
				},
				function (response) {
					alert("注册失败！");
				}
			)
		}
	}
});
// 用户名是否已存在
SignupModule.directive("ensureUnique", function($http) {
	return {
		require: "ngModel",
		link: function(scope,elem,attrs,ctrl) {
			elem.bind("blur", function() {
				var name = $.trim(scope[attrs.ensureUnique]);
				
				if (name) {
					$http.get("isUserExists?name=" + name).then(
						function(response) {
							ctrl.$setValidity("ensureUnique",!response.data.isExists);
						},
						function(response) {
							console.log(response);
						}
					);
				}
			});
		}
	};
});
// 验证密码与密码是否一致
SignupModule.directive("equal", function () {
	return {
		require: 'ngModel',
		scope: {
			equal: '='
		},
		link: function(scope, elem, attrs, ctrl) {
			ctrl.$validators.equal = function(modelValue, viewValue) {
				return modelValue === scope.equal;
			};

			scope.$watch('equal', function(newVal, oldVal) {
				ctrl.$validate();
			});
		}
	};
});

var HeaderModule = angular.module("HeaderModule",[]);
HeaderModule.controller("HeaderCtrl",function ($scope,$http) {
	$scope.signout = function () {
		$http.delete("signout").then(
			function (response) {
				location.href = "#/login";
			},
			function (response) {
				alert("退出失败！");
			}
		)
	}
});