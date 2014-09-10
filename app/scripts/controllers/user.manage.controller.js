/**
 * Created by BLKNABI on 2014-08-14.
 */
'use strict';

angular.module('gntelCqmsApp')
    .controller('userManageCtrlnouse', function ($scope, executeResults) {
        var getQltClassList = function () {
            executeResults.getQltClassList().then(function (result) {
                for (var i = 0; i < result.sending.length; i++) {
                    console.log(result.sending[i]);
                }
            })
        };
        getQltClassList();


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

        $scope.$on("user:selected", function (e, selected) {

            if ($scope.selectedItem == selected)
                return;

            $scope.selectedItem = selecte
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

        $scope.clearComp = function () {

        };

        $scope.saveQltClass = function () {
            alert("scope1:" + $scope.qltClass);
            alert("scope2:" + $scope.qltClass.qlt_code);
            alert("scope3:" + $scope.qltClass.qlt_name);
            executeResults.insertQltClass($scope.qltClass);

        };

    })
    .controller('userManageListCtrl', function ($scope) {

        $scope.process = function (selected) {
            $scope.$emit("user:selected", selected);
        };

    });