'use strict';

var app = angular.module('gntelCqmsApp', [
    'ngRoute',
    'ui.bootstrap',
    'autocomplete',
    'datatables'
]);
app.config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/contents/052_M_1000_login.html'
            })
            .when('/home', {
                redirectTo: '/happen'
            })
            .when('/login', {
                redirectTo: '/happen'
            }).when('/loginadd', {
                redirectTo: 'views/contents/052_S_1100_user.add.html'
            })
            .when('/happen', {
                templateUrl: 'views/contents/052-1000-CV_happen.html'
            })
            .when('/process', {
                templateUrl: 'views/contents/052-1100-CV_process.html'
            })
            .when('/standard', {
                templateUrl: 'views/contents/052-1200-CV_standard.html'
            })
            .when('/action', {
                templateUrl: 'views/contents/052-1210-CV_action_reg.html'
            })
            .when('/detail', {
                templateUrl: 'views/contents/052-1230-CV_detail_reg.html'
            })
            .when('/commnetl', {
                templateUrl: 'views/contents/052-1300-CV_commnetl.html'
            })
            .when('/reg', {
                templateUrl: 'views/contents/052-1400-CV_reg.html'
            })
            .when('/reg/site', {
                templateUrl: 'views/contents/052-1410-CV_site_reg.html'
            })
            .when('/reg/sitem', {
                templateUrl: 'views/contents/052-1420-CV_sitem_reg.html'
            })
            .when('/manager', {
                templateUrl: 'views/contents/052-1500-CV_manager_reg.html'
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
    });

app.directive('ngConfirmClick', [
    function(){
        return {
            priority: -1,
            restrict: 'A',
            link: function(scope, element, attrs){
                element.bind('click', function(e){
                    var message = attrs.ngConfirmClick;
                    if(message && !confirm(message)){
                        e.stopImmediatePropagation();
                        e.preventDefault();
                    }
                });
            }
        }
    }
]);

