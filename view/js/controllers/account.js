var AccountModule = angular.module("AccountModule",[]);

// 登录操作
AccountModule.controller("SigninCtrl",function($scope,$http) {
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

// 注册操作
AccountModule.controller("SignupCtrl", function ($scope,$http) {
	$scope.signup = function () {
		if ($scope.signupForm.$valid) {
			var name = $.trim($scope.name);
			var password = $.trim($scope.password);
			var data = "name=" + name + "&password=" + password;

			$http.post("signup",data).then(
				function (response) {
					alert("注册成功！");
					location.reload();
				},
				function (response) {
					alert("注册失败！");
				}
			)
		}
	}
});

// 检查用户名是否唯一
AccountModule.directive("ensureUnique", function($http) {
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

// 检查密码与验证密码是否一致
AccountModule.directive("equal", function () {
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

// 注销操作
AccountModule.controller("SignoutCtrl",function ($scope,$http) {
	$scope.signout = function () {
		$http.delete("signout").then(
			function (response) {
				location.href = "#/login";
			},
			function (response) {
				alert("退出失败！");
				console.log(response);
			}
		)
	}
});