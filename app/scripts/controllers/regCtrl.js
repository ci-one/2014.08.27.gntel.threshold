/**
 * Created by BLKNABI on 2014-08-14.
 */
'use strict';

angular.module('gntelCqmsApp')
    .controller('regCtrl', function ($scope) {
        $scope.processGo = '기관';
        $scope.change = function (item){
            $scope.processGo =item
        }

    });