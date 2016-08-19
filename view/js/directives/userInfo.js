myApp.directive("getUserInfo", ["userInfoService",
  function(userInfoService) {
    return {
      restrict: "A",
      link: function(scope, element, attrs) {
        var id = attrs.getUserInfo;
        var data = "id=" + id;

        userInfoService.get(data,
          function(response) {
            var user = response.data.user;

            scope.user = {
              id: user.id,
              name: user.name,
              sex: scope.sexs(user.sex),
              birthday: user.birthday ? new Date(user.birthday) : "",
              email: user.email || "",
              introduction: user.introduction,
              headPortrait: user.hpPath + (user.hp || "default.png")
            };
          }
        );
      }
    };
  }
]);
