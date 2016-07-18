var myApp = angular.module('myApp', [
	'ui.router',"ngImgCrop","CommonModule","AccountModule","UserInfoModule","BlogModule","CommentModule"
]);

myApp.run(function($rootScope, $state, $stateParams) {
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
	$rootScope.sexs = [{name:"-- 请选择 --", value:0},{name:"男", value:1},{name:"女", value:2}];
});

myApp.config(function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/index");
	$stateProvider
		.state("index", {
			url: "/index",
			views: {
				"": {
					templateUrl: "tpls/index.html"
				},
				"header@index": {
					templateUrl: "tpls/header.html"
				},
				"aside@index": {
					templateUrl: "tpls/aside.html",
					controller: "GetOwnerInfoCtrl"
				},
				"createBlog@index" : {
					templateUrl: "tpls/createBlog.html"
				},
				"blogList@index" : {
					templateUrl: "tpls/blogList.html"
				},
				"createComment@index" : {
					templateUrl: "tpls/createComment.html"
				},
				"commentList@index" : {
					templateUrl: "tpls/commentList.html"
				}
			}
		})
		.state("login", {
			url: "/login",
			views: {
				"": {
					templateUrl: "tpls/login.html"
				}
			}
		})
		.state("updateInfo", {
			url: "/updateInfo",
			views: {
				"": {
					templateUrl: "tpls/updateInfo.html",
					controller: "GetOwnerInfoCtrl"
				},
				"header@updateInfo" : {
					templateUrl: "tpls/header.html"
				}
			}
		})
		.state("user", {
			url: "/user/:userId",
			views: {
				"": {
					templateUrl: "tpls/user.html"
				},
				"header@user": {
					templateUrl: "tpls/header.html"
				},
				"aside@user": {
					templateUrl: "tpls/aside.html",
					controller: function ($scope,$stateParams) {
						$scope.userId = $stateParams.userId;
					}
				}
			}
		})
});

// myApp.directive("yearDrop", function () {
// 	function getYears(offset, range){
// 		var currentYear = new Date().getFullYear();
// 		var years = [];
// 		for (var i = 0; i < range + 1; i++){
// 			years.push(currentYear + offset + i);
// 		}
// 		return years;
// 	}
// 	return {
// 		link: function(scope,element,attrs){
// 			scope.years = getYears(+attrs.offset, +attrs.range);
// 			scope.selected = scope.years[parseInt(scope.years.length/2)];
// 		},
// 		template: '<select ng-model="arrts.model" ng-options="y for y in years"></select>'
// 	}
// })


