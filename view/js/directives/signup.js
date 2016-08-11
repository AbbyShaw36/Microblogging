// 检查用户名是否唯一
myApp.directive("ensureUnique", function($http) {
  return {
    require: "ngModel",
    link: function(scope, elem, attrs, ctrl) {
      elem.bind("blur", function() {
        var name = $.trim(scope[attrs.ensureUnique]);

        if (name) {
          $http.get("isUserExists?name=" + name).then(
            function(response) {
              ctrl.$setValidity("ensureUnique", !response.data.isExists);
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
myApp.directive("equal", function() {
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
