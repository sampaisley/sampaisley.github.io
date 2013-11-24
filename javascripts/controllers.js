//'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
    controller('RootCtrl', function ($scope, $location) {


        $scope.timeNow = Date.now();
        $scope.$on(
            "$routeChangeSuccess",
            function ($currentRoute, $previousRoute) {
                $scope.pag = $location.path().substr(1);
                $scope.thisPage = "/#"+$location.path();
            }
        );

        $scope.pages = [
            {title: 'view1', url: '/#/view1'} ,
            {title: 'view2', url: '/#/view2'}
        ]




    })
    .controller('MyCtrl1', function ($scope, $sce) {

        $scope.html = '<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>';
        $scope.trustedHtml = $sce.trustAsHtml($scope.html);

  })

        .controller('MyCtrl2', function ($scope, $http, $sce) {     ///--- PAGE 2 CONTROL ---
        // get the google sread sheet


        $http.get('https://spreadsheets.google.com/feeds/list/0AhZ7a-ySJXJTdDFRZGFwdk83QU5Jc0lrNjNpbmNHTFE/od6/public/values?alt=json', { cache: true }).success(function(data) {
               // console.log(data.feed.entry);
            $scope.d= data.feed.entry;


        });




  });