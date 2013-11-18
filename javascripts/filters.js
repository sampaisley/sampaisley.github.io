'use strict';

/* Filters */

angular.module('myApp.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }]).filter('unsafe', function($sce) {    //http://stackoverflow.com/questions/18340872/how-do-you-use-sce-trustashtmlstring-to-replicate-ng-bind-html-unsafe-in-angu
        return function(val) {
            return $sce.trustAsHtml(val);
        };
    });
