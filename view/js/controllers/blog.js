myApp.controller("createBlogCtrl", ["$scope", "blogService",
  function($scope, blogService) {
    $scope.createBlog = function() {
      if (!$scope.createBlogForm.$valid) {
        return;
      }

      var content = encodeURIComponent($scope.blog.content);
      var data = "content=" + content;

      blogService.create(data,
        function() {

        }
      );
    }
  }
]);



/*var BlogModule = angular.module("BlogModule",[]);*/

//BlogModule.controller("CreateBlogCtrl", function ($scope,$http) {
//$scope.publishBlog = function () {
//if (!$scope.createBlogForm.$valid) {
//return;
//}

//var content = encodeURIComponent($scope.blogContent);

//$http.post("createBlog","content="+content).then(
//function (response) {
//alert("发布成功！");
//location.reload();
//},
//function (response) {
//alert("发布失败");
//console.log(response);
//}
//);
//};
//});

//BlogModule.controller("GetBlogListCtrl", function ($scope,$http) {
//$scope.currentPage = 1;
//$scope.perpageCount = 10;

//$http.get("getBlogList?limit=" + $scope.perpageCount).then(
//function (response) {
//$scope.totalCount = response.data.totalCount;
//$scope.blogList = response.data.blogList;

//for (var index in $scope.blogList) {
//$scope.blogList[index].showComment = false;
//}

//console.log($scope.blogList);
//},
//function (response) {
//alert("加载微博数据失败！");
//console.log(response);
//}
//);
//});

//BlogModule.controller("GetBlogListByPublisherCtrl", function ($scope,$stateParams,$http) {
//$scope.currentPage = 1;
//$scope.perpageCount = 10;

//var publisher = $stateParams.userId;

//$http.get("getBlogListByPublisher?publisher=" + publisher + "&limit=" + $scope.perpageCount).then(
//function (response) {
//$scope.totalCount = response.data.totalCount;
//$scope.blogList = response.data.blogList;

//for (var index in $scope.blogList) {
//$scope.blogList[index].showComment = false;
//}

//console.log($scope.blogList);
//},
//function (response) {
//console.log(response);
//}
//);
//});

//BlogModule.controller("GetBlogListByOwnerCtrl", function ($scope,$http) {
//$scope.currentPage = 1;
//$scope.perpageCount = 10;

//$http.get("getBlogListByOwner?limit=" + $scope.perpageCount).then(
//function (response) {
//$scope.totalCount = response.data.totalCount;
//$scope.blogList = response.data.blogList;

//for (var index in $scope.blogList) {
//$scope.blogList[index].showComment = false;
//}

//console.log($scope.blogList);
//},
//function (response) {
//console.log(response);
//}
//)
/*})*/
