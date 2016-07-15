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
					location.reload();
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
			$scope.user.birthday = $scope.user.birthday ? new Date($scope.user.birthday) : "";
			$scope.user.headPortrait = $scope.user.hpPath + ($scope.user.hp || "default.png");
		}
	);

	$scope.save = function () {
		if ($scope.updateInfoForm.$valid) {
			var id = $scope.user.id;
			var name = $scope.user.name;
			var sex = $scope.user.sex.value;
			var birthday = $scope.user.birthday ? new Date($scope.user.birthday).getTime() : 0;
			var email = $scope.user.email || "";
			var introduction = $scope.user.introduction;
			var hpPath = $scope.user.hpPath;
			var hp = $scope.user.hp || "";
			var data = "id=" + id + "&name=" + name + "&sex=" + sex + "&birthday=" + birthday + "&email=" + email + "&introduction=" + introduction + "&hpPath=" + hpPath + "&hp=" + hp;

			$http.put("updateInfo",data).then(
				function (response) {
					alert("保存成功！");
					location.reload();
				},
				function (response) {
					alert("保存失败！");
					console.log(response);
				}
			);
		}
	};
});
UpdateInfoModule.controller("UploadHpCtrl", function ($scope,$http) {
	$scope.changeImg = false;
	$scope.myImage='';
	$scope.myCroppedImage='';

	var handleFileSelect=function(evt) {
		var file=evt.currentTarget.files[0];

		if (!file) {
			return;
		}

		if (!file.type.match("image")) {
			alert("文件只限图片!");
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

	$scope.upload = function () {
		if (!$scope.myImage) {
			alert("请先选择要上传的文件！");
			return;
		}

		var data = "hpData=" + encodeURIComponent($scope.myCroppedImage) + "&hpPath=" + $scope.user.hpPath;

		$http.post("uploadHp",data).then(
			function (response) {
				alert("上传成功！");
				$scope.user.hp = response.data.hp;
				console.log($scope.user);
			},
			function (response) {
				alert("上传失败！");
				console.log(response);
			}
		)
	}
});

var CreateBlogModule = angular.module("CreateBlogModule",[]);
CreateBlogModule.controller("CreateBlogCtrl", function ($scope,$http) {
	$scope.publishBlog = function () {
		if (!$scope.createBlogForm.$valid) {
			return;
		}

		var content = encodeURIComponent($scope.blogContent);

		$http.post("createBlog","content="+content).then(
			function (response) {
				alert("发布成功！");
				location.reload();
			},
			function (response) {
				alert("发布失败");
				console.log(response);
			}
		);
	};
});

var BlogListModule = angular.module("BlogListModule",[]);
BlogListModule.controller("BlogListCtrl", function ($scope,$http) {
	$scope.currentPage = 1;
	$scope.perpageCount = 10;

	$http.get("getBlogList?limit=" + $scope.perpageCount).then(
		function (response) {
			$scope.totalCount = response.data.totalCount;
			$scope.blogList = response.data.blogList;
			$scope.showComments = [];
			$scope.commentList = [];

			angular.forEach($scope.blogList,function () {
				$scope.showComments.push(false);
			});

			console.log($scope.showComments);
			console.log($scope.blogList);
		},
		function (response) {
			alert("加载微博数据失败！");
			console.log(response);
		}
	);

	$scope.toggleComment = function (index) {
		$scope.showComments[index] = !$scope.showComments[index];

		if ($scope.blogList[index].comments === 0) {
			$scope.commentList[index] = [];
			$scope.commentList[index].length = 0;
		}
	}
});
BlogListModule.directive("comment",function () {
	return {
		restrict: "E",
		scope: {
			"commentList": "=comments",
			"blogId": "=owner"
		},
		templateUrl: "tpls/comments.html"
	};
});

var CommentListModule = angular.module("CommentListModule",[]);
CommentListModule.controller("CreateCommentCtrl", function ($scope) {

	$scope.publishComment = function () {

	}
});
CommentListModule.controller("CommentListCtrl", function ($scope) {
	console.log($scope.blogId);
})