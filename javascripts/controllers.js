//'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
    controller('MyCtrl1', function ($scope, $sce) {
        $scope.opts = [
            {value: 111, text: '<b>1st</b>' },
            {value: 222, text: '<i>2nd</i>' }
        ];
        $scope.html = '<ul><li>render me please</li></ul>';
        $scope.trustedHtml = $sce.trustAsHtml($scope.html);

  })

        .controller('MyCtrl2', function ($scope, $http) {     ///--- PAGE 2 CONTROL ---
        // get the google sread sheet


        $http.get('https://spreadsheets.google.com/feeds/list/0AhZ7a-ySJXJTdE1mNDJPSTEwY2c0TlhqWkg2ZFFYd3c/od6/public/values?alt=json', { cache: true }).success(function(data) {
               // console.log(data.feed.entry);
            $scope.d= data.feed.entry;

        });




  });