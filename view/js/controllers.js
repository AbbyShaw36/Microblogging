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
				console.log(response);
			}
		)
	}
});

var UpdateInfoModule = angular.module("UpdateInfoModule",[]);
UpdateInfoModule.controller("UpdateInfoCtrl", function ($scope,$rootScope,$http) {
	$scope.maxDate = new Date().toISOString().split('T')[0];

	$http.get("getOwner").then(
		function(response) {
			$scope.user = response.data.owner;
			$scope.user.sex = $rootScope.sexs[$scope.user.sex];
			$scope.user.birthday = new Date($scope.user.birthday);
			$scope.user.headPortrait = ($scope.user.hpPath + $scope.user.hp) || "headPortrait/default.png";
		}
	);

	$scope.save = function () {
		if ($scope.updateInfoForm.$valid) {
			console.log($scope.user);
			return;
			var id = $scope.user.id;
			var name = $scope.user.name;
			var sex = $scope.user.sex.value;
			var birthday = new Date($scope.user.birthday).getTime();
			var email = $scope.user.email;
			var introduction = $scope.user.introduction;
			var data = "id=" + id + "&name=" + name + "&sex=" + sex + "&birthday=" + birthday + "&email=" + email + "&introduction=" + introduction;

			$http.put("updateInfo",data).then(
				function (response) {
					alert("保存成功！");
				},
				function (response) {
					alert("保存失败！");
					console.log(response);
				}
			);
		}
	};
});
UpdateInfoModule.controller("UploadHpCtrl", function ($scope) {
	$scope.changeImg = false;
	$scope.myImage='';
	$scope.myCroppedImage='';

	var handleFileSelect=function(evt) {
		var file=evt.currentTarget.files[0];

		if (!file.type.match("image")) {
			alert("文件只限图片格式！");
			return;
		}

		var reader = new FileReader();

		reader.onload = function (evt) {
			$scope.$apply(function($scope){
				$scope.myImage=evt.target.result;
			});
		};

		reader.readAsDataURL(file);

		$scope.user.headPortrait = $scope.myCroppedImage;
		$scope.changeImg = true;
	};
	angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
});
UpdateInfoModule.directive("fileType", function () {
	return {
		require: 'ngModel',
		scope: {
			fileType: "="
		},
		link: function(scope, elem, attrs, ctrl) {
			elem.on("change",function () {
				ctrl.$validators.fileType = function(modelValue, viewValue) {
					return elem[0].files[0].type.match(scope.fileType);
				};

				scope.$watch('fileType', function(newVal, oldVal) {
					ctrl.$validate();
				});
			});
		}
	};
});