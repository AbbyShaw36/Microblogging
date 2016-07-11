var myApp = angular.module('myApp', ['ui.router', "IsSignedInModule","LoginModule","TabModule","SignupModule","SigninModule","HeaderModule"]);

myApp.run(function($rootScope, $state, $stateParams) {
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
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
					controller: function ($scope,$http) {
						$http.get("getOwner").then(
							function (response) {
								$scope.user = response.data.owner;
							}
						)
					}
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
					controller: function ($scope,$http) {
						$http.get("getOwner").then(
							function(response) {
								$scope.user = response.data.owner;
							}
						)
					}
				},
				"header@updateInfo" : {
					templateUrl: "tpls/header.html"
				}
			}
		});
});
