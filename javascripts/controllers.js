//'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
    controller('MyCtrl1', function ($scope, $sce) {

        $scope.html = '<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>';
        $scope.trustedHtml = $sce.trustAsHtml($scope.html);

  })

        .controller('MyCtrl2', function ($scope, $http, $sce) {     ///--- PAGE 2 CONTROL ---
        // get the google sread sheet


        $http.get('https://spreadsheets.google.com/feeds/list/0AhZ7a-ySJXJTdE1mNDJPSTEwY2c0TlhqWkg2ZFFYd3c/od6/public/values?alt=json', { cache: true }).success(function(data) {
               // console.log(data.feed.entry);
            $scope.d= data.feed.entry;


        });




  });