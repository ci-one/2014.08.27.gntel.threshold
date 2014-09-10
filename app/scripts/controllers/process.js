/**
 * Created by 성시원님 on 2014-09-10.
 */

'use strict';

angular.module('gntelCqmsApp')
    .controller('userManageCtrl', function ($scope, executeResults) {
//        alert("getList call");
        $scope.getProcessList = function () {

            executeResults.getProcessList().then(function (data) {
//                alert(data);
                $scope.processLists= data;
                console.log(data);

            });

            //alert("getList call");
            executeResults.getActionList().then(function (data) {
//                alert(data);
                $scope.actionLists= data;
                console.log(data);

            });
        };
    });