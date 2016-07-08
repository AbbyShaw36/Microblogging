var myApp = angular.module('myApp', ['ui.router', "IsSignedInModule","LoginModule","TabModule","SignupModule"]);

myApp.run(function($rootScope, $state, $stateParams) {
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
});

myApp.config(function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/index");
	$stateProvider
		.state('index', {
			url: '/index',
			views: {
				'': {
					templateUrl: 'tpls/index.html'
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
});
