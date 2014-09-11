/**
 * Created by BLKNABI on 2014-08-14.
 */
'use strict';

angular.module('gntelCqmsApp')
    .controller('actionRegCtrl', function ($scope, executeResults) {

        $scope.change = function (item) {
            $scope.click = item
        };
        $scope.detail = false;
        $scope.detailprocess = function () {
            if ($scope.detail == true)
                $scope.detail = false;
            else
                $scope.detail = true;
        };

    });
