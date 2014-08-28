/**
 * Created by BLKNABI on 2014-08-14.
 */
'use strict';

angular.module('gntelCqmsApp')
    .controller('processCtrl', function ($scope) {
        $scope.processGo = '품질';
        $scope.change = function (item){
            $scope.processGo =item
        }

    });