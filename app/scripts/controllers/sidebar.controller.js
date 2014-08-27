/**
 * Created by SimJeongmee on 2014-08-13.
 */
'use strict';

angular.module('gntelCqmsApp')
    .controller('SidebarCtrl', function ($scope, $location) {

        $scope.link = function(uri) {
            $location.url(uri);
        }
    });
