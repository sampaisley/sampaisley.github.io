/* Controllers */

var app = angular.module('myApp.controllers', []).
    controller('RootCtrl', function ($scope, $location) {


        $scope.timeNow = Date.now();
        $scope.$on(
            "$routeChangeSuccess",
            function ($currentRoute, $previousRoute) {
                $scope.pag = $location.path().substr(1);
                $scope.thisPage = "/#" + $location.path();
            }
        );

        $scope.pages = [
            {title: 'view1', url: '/#/view1'} ,
            {title: 'view2', url: '/#/view2'} ,
            {title: 'view3', url: '/#/view3'}
        ]


    })
    .controller('MyCtrl1', function ($scope, $sce) {

        $scope.html = '<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>';
        $scope.trustedHtml = $sce.trustAsHtml($scope.html);

    })

    .controller('MyCtrl2', function ($scope, $http, $sce, $window, $location, $anchorScroll) {     ///--- PAGE 2 CONTROL ---
        // get the google sread sheet
        $scope.currentPage = 0;
        $scope.pageSize = 4;
        $scope.updatePageNums = function () {
            $scope.numPages = $window.Math.ceil( ($scope.d.length / $scope.pageSize));
        };

        $http.get('https://spreadsheets.google.com/feeds/list/0AhZ7a-ySJXJTdDFRZGFwdk83QU5Jc0lrNjNpbmNHTFE/od6/public/values?alt=json', { cache: true }).success(function (data) {
            // console.log(data.feed.entry);
            $scope.d = data.feed.entry;


        });

        $scope.gotoTop = function (direction){

            $location.hash('top');
            if(direction=='next')  {
            $scope.currentPage=$scope.currentPage+1 ;
            }
            if(direction=='prev'){
                $scope.currentPage=$scope.currentPage-1;
            }
            // call $anchorScroll()
            $anchorScroll();
        }


    })

    .controller('MyCtrl3', function ($scope, $http, $window) {     ///--- PAGE 3 CONTROL ---
        // get the google sread sheet
        $scope.currentPage = 0;
        $scope.pageSize = 5;
        $scope.items = [];

       $scope.updatePageNums = function () {
            $scope.numPages = $window.Math.ceil( ($scope.items.length / $scope.pageSize));
      };


        $http.get('https://spreadsheets.google.com/feeds/list/0AhZ7a-ySJXJTdDFRZGFwdk83QU5Jc0lrNjNpbmNHTFE/od6/public/values?alt=json', { cache: true }).success(function (data) {
            // console.log(data.feed.entry);
            $scope.data = data;


            $.each($scope.data.feed.entry, function (key, val) {
                var obj = {content: val.gsx$content.$t, title: val.gsx$title.$t };
                $scope.items.push(obj);
            });

        });


    });



