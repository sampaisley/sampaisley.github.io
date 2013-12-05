/* Controllers */

var app = angular.module('myApp.controllers', ['firebase']).
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
            {title: 'view3', url: '/#/view3'} ,
            {title: 'view4', url: '/#/view4'}  ,
            {title: 'view5', url: '/#/view5'}
        ]


    })
    .controller('MyCtrl1', function ($scope, $sce) {

        $scope.html = '<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>';
        $scope.trustedHtml = $sce.trustAsHtml($scope.html);

    })

    .controller('MyCtrl2', function ($scope, $http, $sce, $window, $location) {     ///--- PAGE 2 CONTROL ---

       $scope.currentPage = 0;
        $scope.pageSize = 4;
        $scope.updatePageNums = function () {
            $scope.numPages = $window.Math.ceil( ($scope.d.length / $scope.pageSize));


        };
        $scope.calcCurrentPage = function(){
            $scope.currentPage = Math.ceil(parseInt($scope.currentPage+1) / parseInt($scope.numPages));
            return $scope.currentPage;
        }
        // get the google sread sheet
        $http.get('https://spreadsheets.google.com/feeds/list/0AhZ7a-ySJXJTdDFRZGFwdk83QU5Jc0lrNjNpbmNHTFE/od6/public/values?alt=json', { cache: true }).success(function (data) {
            // console.log(data.feed.entry);
            $scope.d = data.feed.entry;
            console.info( $scope.d);
            console.log( $scope.d);


        });

        $scope.changeTarget = function(name) {
            $location.search('p', name);
            $scope.currentPage = name ;
        }
        $scope.loc =  $location.search();
        $scope.setPage     = function(){
            $scope.currentPage = parseInt($scope.loc.p || 0);

        }


    })


    .controller('MyCtrl3', function ($scope, $http, $window) {     ///--- PAGE 3 CONTROL ---
        // get the google sread sheet
        $scope.currentPage = 0;
        $scope.pageSize = 5;
        $scope.items = [];

       $scope.updatePageNums = function () {
          $scope.numPages = $window.Math.ceil( ($scope.items.length / $scope.pageSize));
//           alert("ffffffff" +$scope.currentPage);
      };


        $http.get('https://spreadsheets.google.com/feeds/list/0AhZ7a-ySJXJTdDFRZGFwdk83QU5Jc0lrNjNpbmNHTFE/od6/public/values?alt=json', { cache: true }).success(function (data) {
            // console.log(data.feed.entry);
            $scope.data = data;


            $.each($scope.data.feed.entry, function (key, val) {
                var obj = {content: val.gsx$content.$t, title: val.gsx$title.$t };
                $scope.items.push(obj);
            });

        });


    })
    .controller('MyCtrl4', function ($scope,angularFire) {     ///--- PAGE 4 CONTROL ---;


        $scope.items = [];
        var ref = new Firebase("https://paisley1.firebaseio.com");
        angularFire(ref, $scope, "items");
        $scope.color = 'title';
    })
    .controller('MyCtrl5', function ($scope,angularFire) {     ///--- PAGE 5 CONTROL ---;

        var myDataRef = new Firebase("https://paisley1-1.firebaseio.com");
        $('#messageInput').keypress(function (e) {
            if (e.keyCode == 13) {
                var name = $('#nameInput').val();
                var text = $('#messageInput').val();
                myDataRef.push({name: name, text: text});
                $('#messageInput').val('');
            }
        });
        myDataRef.on('child_added', onValueChange)  ;
        function onValueChange(snapshot) {
            var message = snapshot.val();
            displayChatMessage(message.name, message.text);

        };
        myDataRef.on('child_removed', function() {
            $('#messagesDiv').empty();
        });

        function displayChatMessage(name, text) {
            $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
            $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
           // myDataRef.off('child_added', onValueChange);
        };

        $scope.clear = function(){
            myDataRef.remove();

        }
    });



