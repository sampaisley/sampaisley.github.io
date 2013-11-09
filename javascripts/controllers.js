//'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', [function() {

  }])

        .controller('MyCtrl2', function ($scope, $http) {     ///--- PAGE 2 CONTROL ---
        // get the google sread sheet


        $http.get('https://spreadsheets.google.com/feeds/list/0AhZ7a-ySJXJTdE1mNDJPSTEwY2c0TlhqWkg2ZFFYd3c/od6/public/values?alt=json', { cache: true }).success(function(data) {
               // console.log(data.feed.entry);
            $scope.d= data.feed.entry;

        });

        // get img from flickr
        $scope.set =  "72157635342624133";  // sea as default set
        function getAndShow(){

 var url="http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&photoset_id=72157635342624133&api_key=2fdc79859cd894e55ee6fb2d0a4e6acf&user_id=100786833@N08&format=json&callback=foo";

            $http.jsonp(url);

            jsonFlickrApi = function (result) {
                $scope.pset = result.photoset.photo[0];

            }
        }
        getAndShow()


  });