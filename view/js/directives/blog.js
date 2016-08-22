myApp.directive("getBlogList",
  function() {
    return {
      restrict: "A",
      link: function(scope,element,attrs){
        var publisher = attrs;

        scope.getBlogList(publisher);
      }
    };
  }
);
