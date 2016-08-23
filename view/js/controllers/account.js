// 注册
myApp.controller("signupCtrl", ["$scope", "accountService",
  function($scope,
    accountService) {
    $scope.signup = function() {
      var name = $.trim($scope.user.name);
      var password = $.trim($scope.user.password);
      var data = "name=" + name + "&password=" + password;

      accountService.signup(data,
        function() {
          location.reload();
        }
      );
    };
  }
]);

//登录
myApp.controller("signinCtrl", ["$scope", "accountService",
  function($scope, accountService) {
    $scope.signin = function() {
      if ($scope.signinForm.$valid) {
        var name = $.trim($scope.user.name);
        var password = $.trim($scope.user.password);
        var data = "name=" + name + "&password=" + password;

        accountService.signin(data,
          function() {
            location.reload();
          }
        );
      }
    };
  }
]);

// 退出
myApp.controller("signoutCtrl", ["$scope", "accountService",
  function($scope, accountService) {
    $scope.signout = function() {
      accountService.signout(
        function() {
          location.reload();
        }
      );
    };
  }
]);

//检查是否已登录
myApp.controller("checkSignedInCtrl", ["$scope", "$cookies", "$location",
  "$http", "accountService",
  function($scope, $cookies, $location, accountService) {
    //已登录
    if ($cookies.get("sessionId")) {
      if ($location.url() === "/login") {
        //已登录，并且在登录页
        $location.url("/home");

        return;
      }

      //已登录，但不在登录页，发送后台检查是否已登录
      accountService.checkSignedIn(
        function(response) {
          var data = response.data;

          if (data.isSignedIn) {
            //已登录
            $scope.account = data.account;
            $scope.isSignedIn = true;

            return;
          }

          //未登录
          $location.url("/login");
        }
      );

      return;
    }

    //未登录，并且不在登录页
    if ($location.url() !== "/login") {
      $location.url("/login");
      return;
    }

    $scope.isSignedIn = false;
  }
]);
