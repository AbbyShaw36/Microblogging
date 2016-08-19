myApp.controller("updateUserInfoCtrl", ["$scope", "userInfoService",
  function($scope, userInfoService) {
    $scope.update = function() {
      if (!$scope.updateInfoForm.$valid) {
        return;
      }

      var id = $scope.user.id;
      var name = $scope.user.name;
      var sex = $scope.user.sex.value;
      var birthday = $scope.user.birthday ? new Date($scope.user.birthday)
        .getTime() : 0;
      var email = $scope.user.email || "";
      var introduction = $scope.user.introduction;
      var hpPath = $scope.user.hpPath;
      var hp = $scope.user.hp || "";
      var data = "id=" + id + "&name=" + name + "&sex=" + sex +
        "&birthday=" + birthday + "&email=" + email + "&introduction=" +
        introduction + "&hpPath=" + hpPath + "&hp=" + hp;

      userInfoService.update(data,
        function() {
          location.reload();
        }
      );
    };
  }
]);




/*var UserInfoModule = angu
//UserInfoModule.controller("UploadHpCtrl", function ($scope,$http) {
//$scope.changeImg = false;
//$scope.myImage='';
//$scope.myCroppedImage='';

//var handleFileSelect=function(evt) {
//var file=evt.currentTarget.files[0];

//if (!file) {
//return;
//}

//if (!file.type.match("image")) {
//alert("文件只限图片!");
//return;
//}

//var reader = new FileReader();

//reader.onload = function (evt) {
//$scope.$apply(function($scope){
//$scope.myImage=evt.target.result;
//});
//};

//reader.readAsDataURL(file);

//$scope.user.headPortrait = $scope.myCroppedImage;
//$scope.changeImg = true;

//};

//angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);

//$scope.upload = function () {
//if (!$scope.myImage) {
//alert("请先选择要上传的文件！");
//return;
//}

//var data = "hpData=" + encodeURIComponent($scope.myCroppedImage) + "&hpPath=" + $scope.user.hpPath;

//$http.post("uploadHp",data).then(
//function (response) {
//alert("上传成功！");
//$scope.user.hp = response.data.hp;
//console.log($scope.user);
//},
//function (response) {
//alert("上传失败！");
//console.log(response);
//}
//);
//}
/*});*/
