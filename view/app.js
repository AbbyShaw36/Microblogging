var routerApp = angular.module("routerApp",['ui.router']);

routerApp.config(function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/index");

	$stateProvider
		.state("index", {
			url: "/index",
			views: {
				"": {
					remplateUrl: "tpls/index.html"
				}
			}
		})
});
