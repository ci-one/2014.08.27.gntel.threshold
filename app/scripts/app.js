'use strict';

angular.module('gntelCqmsApp', [
    'ngRoute',
    'ui.bootstrap'
])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/contents/052_M_1000_login.html'
            })
            .when('/home', {
                redirectTo: '/quality/weather_chart'
            })
            .when('/login', {
                redirectTo: '/quality/weather_chart'
            }).when('/loginadd', {
                redirectTo: 'views/contents/052_S_1100_user.add.html'
            })
            .when('/quality/weather_chart', {
                templateUrl: 'views/contents/052_S_2100_quality.weather.chart.html'
            })
            .when('/probe/list', {
                templateUrl: '../views/contents/CHAE/052_S_2221_probe.plcy.setting.default.html'
            })




            //추가:김선규
            .when('/priodic', {
                templateUrl: 'views/contents/052_S_2310_check.priodic.html'
            })
            .when('/priodic/result', {
                templateUrl: 'views/contents/052_S_2311_check.probe.plcy.info.html'
            })
            .when('/priodic/plcy', {
                templateUrl: 'views/contents/052_S_2312_check.rule.plcy.list.html'
            })
            .when('/demand', {
                templateUrl: 'views/contents/052_S_2320_check.demand.html'
            })
            .when('/demand/process', {
                templateUrl: 'views/contents/052_S_2321_check.demand.process.html'
            })
            .when('/demand/result', {
                templateUrl: 'views/contents/052_S_2322_check.demand.result.html'
            })
            .when('/current', {
                templateUrl: 'views/contents/052_S_2400_check.current.list.html'
            })
            .when('/current/plcy', {
                templateUrl: 'views/contents/052_S_2410_check.current.plcy.info.html'
            })
            .when('/priodicR', {
                templateUrl: 'views/contents/052_S_2520_result.priodic.html'
            })
            .when('/priodicavg', {
                templateUrl: 'views/contents/052_S_2530_result.priodic.avg.list.html'
            })
            //종료:김선규



            //추가:채영범
            .when('/probe/list', {
                templateUrl: '../views/contents/052_S_2210_probe.list.html'
            })
            .when('/probe/setting', {
                templateUrl: '../views/contents/052_S_2211_probe.setting.default.html'
            })
            .when('/probe/info', {
                templateUrl: '../views/contents/052_S_2212_probe.info.html'
            })
            .when('/poly/list', {
                templateUrl: '../views/contents/052_S_2220_probe.plcy.list.html'
            })
            .when('/poly/info', {
                templateUrl: '../views/contents/052_S_2222_probe.plcy.info.html'
            })
            .when('/poly/setting', {
                templateUrl: '../views/contents/052_S_2221_probe.plcy.setting.default.html'
            })
            .when('/probe/search', {
                templateUrl: '../views/contents/052_S_2301_quality.check.search.probe.html'
            })
            //종료:채영범

            .when('/admin/user', {
                templateUrl: 'views/contents/052_S_3100_admin.user.html'
            })
            .when('/admin/access', {
                templateUrl: 'views/contents/052_S_3200_admin.access.html'
            })
            .when('/admin/org', {
                templateUrl: 'views/contents/052_S_3300_admin.org.html'
            })
            .otherwise({
                redirectTo: '/'
            });

        //$locationProvider.html5Mode(true);
    });