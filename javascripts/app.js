// Declare app level module which depends on filters, and services
angular.module('myApp', [
        'ngRoute',
        'myApp.filters',
        'myApp.services',
        'myApp.directives',
        'myApp.controllers'
    ]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
        $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2', reloadOnSearch: false});
        $routeProvider.when('/view3', {templateUrl: 'partials/partial3.html', controller: 'MyCtrl3'});
        $routeProvider.when('/view4', {templateUrl: 'partials/partial4.html', controller: 'MyCtrl4'});
        $routeProvider.when('/view5', {templateUrl: 'partials/partial5.html', controller: 'MyCtrl5'});
        $routeProvider.otherwise({redirectTo: '/view1'});
    }]);

/// modification of topbar.js to hide expanded menu on selection of item (page
$("body").on('click', '.top-bar .top-bar-section li', function (e) {
    if ($("nav").hasClass('expanded')) {
        $("nav").toggleClass('expanded');
    }
});
