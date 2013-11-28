

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])
    .directive('scrollOnClick', function() {
        return {
            restrict: 'A',
            link: function(scope, $elm) {
                $elm.on('click', function() {
                    //$("body").animate({scrollTop: $elm.offset().top}, "slow");
                    $("body").animate({ scrollTop: 0 }, 1000);
                });
            }
        }
    });;
