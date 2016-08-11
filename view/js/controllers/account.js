// 注册
myApp.controller("signupCtrl", ["$scope", "accountService",
  function($scope,
    accountService) {
    $scope.signup = function() {
      var name = $.trim($scope.user.name);
      var password = $.trim($scope.user.password);

      accountService.signup(name, password);
    }
  }
]);

//登录
myApp.controller("signinCtrl", ["$scope", "accountService",
  function($scope, accountService) {
    $scope.signin = function() {
      if ($scope.signinForm.$valid) {
        var name = $.trim($scope.user.name);
        var password = $.trim($scope.user.password);
        console.log(name);
        accountService.signin(name, password);
      }
    };
  }
]);

// 退出
myApp.controller("signoutCtrl", ["$scope", "accountService",
  function($scope, accountService) {
    $scope.signout = function() {
      accountService.signout();
    }
  }
]);

//检查是否已登录
myApp.controller("checkSignedInCtrl", ["$scope", "$cookies", "$location",
  "$window",
  function($scope, $cookies, $location, $window) {
    if ($cookies.get("sessionId")) {
      if ($location.url() === "#/login") {
        $location.url("#/index");
      }

      $scope.isSignedIn = true;
    } else {
      if ($location.url() !== "#/login") {
        location.href = "#/login";
      }

      $scope.isSignedIn = false;
    }
  }
]);
