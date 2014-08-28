/**
 * Created by BLKNABI on 2014-08-14.
 */
'use strict';

angular.module('gntelCqmsApp')
    .controller('userManageCtrl', function ($scope) {
        $scope.change = function (item) {
            $scope.click = item
        }
        $scope.detail = false;
        $scope.detailprocess = function () {
            if($scope.detail == true)
                $scope.detail = false;
            else
                $scope.detail = true;
        }

        $scope.$on("user:selected", function (e, selected) {

            if ($scope.selectedItem == selected)
                return;

            $scope.selectedItem = selected;
            $scope.previewState = selected.state;
            $scope.afterState = null;
        });

        $scope.saveState = function () {
            var state = '';

            for (var stat in $scope.statusList) {
                var statData = $scope.statusList[stat];
                if (statData['value'] == $scope.afterState) {
                    state = statData['code'];
                    break;
                }
            }

            //data.state, data.operator, data.id
            var data = {state: state, operator: 'admin', id: $scope.selectedItem['memberid']};

            $scope.$broadcast('reload:list');
        };

    })
    .controller('userManageListCtrl', function ($scope) {

        $scope.process = function (selected) {
            $scope.$emit("user:selected", selected);
        };

    });