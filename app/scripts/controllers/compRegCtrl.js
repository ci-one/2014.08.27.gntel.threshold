/**
 * Created by BLKNABI on 2014-08-14.
 */
'use strict';

angular.module('gntelCqmsApp')
    .controller('compRegCtrl', function ($scope, executeResults) {
        var getCompList = function () {
            executeResults.getUseComp().then(function (data) {
                $scope.companies = data;
            });
        };
        getCompList();

        $scope.select = function (index) {
            $scope.selectedItem = $scope.companies[index];
        }

        $scope.deleteComp = function (org_code) {
            executeResults.deleteUseComp(org_code).then(function () {
                alert('삭제되었습니다.');
                getCompList();
            })
        }

        $scope.viewComp = function (org_code) {

        }

        $scope.modifyComp = function () {
            $scope.useComp = $scope.selectedItem;
        }

        $scope.clearComp = function () {
            $scope.useComp = null;
            $scope.selectedItem = null;
        }

        $scope.saveComp = function () {

            if ($scope.useComp.org_code != null && $scope.useComp.org_code != '') {
                executeResults.updateUseComp($scope.useComp).then(function () {
                    alert('이용기관이 수정되었습니다.');
                    getCompList();
                });
            } else {
                executeResults.insertUseComp($scope.useComp).then(function () {
                    alert('이용기관을 추가하였습니다.');
                    getCompList();
                })
            }
        }
    });