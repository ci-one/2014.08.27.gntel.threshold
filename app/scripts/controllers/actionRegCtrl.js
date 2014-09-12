/**
 * Created by user on 2014-09-11.
 */
'use strict';
angular.module('gntelCqmsApp')
    .controller('actionRegCtrl', function ($scope, executeResults, $filter, ngTableParams) {

        var reloadTable = function(){
            $scope.selectedItem = null;
            $scope.itemList = null;
            executeResults.getActionReg().then(function (data) {
                $scope.itemList = data;

                //$scope.updateOrgName();
            }).then(function(){
                $scope.ActionRegTable.reload()
            });
        };


        var getActionRegList = function () {
            executeResults.getActionReg().then(function (data) {
                $scope.itemList = data;
                //$scope.updateOrgName();
            }).then(function () {
                $scope.ActionRegTable = new ngTableParams({
                    page: 1,            // show first page
                    count: 5,
                    sorting: {
                        org_name: 'desc'     // initial sorting
                    }
                }, {counts: [],
                    total: $scope.itemList.length, // length of data
                    getData: function ($defer, params) {
                        // use build-in angular filter
                        var orderedData = params.sorting() ?
                            $filter('orderBy')($scope.itemList, params.orderBy()) :
                            $scope.itemList;

                        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });
            });
        };
        getActionRegList();

        $scope.saveActReg = function (action_seq,action_code) {
            executeResults.updateActReg(action_seq,action_code).then(function () {
                alert("저장되었습니다.");
                reloadTable();
            });
        };


        var getStandardRegList = function () {
            executeResults.getStandardReg().then(function (data) {
                $scope.itemList = data;
                //$scope.updateOrgName();
            }).then(function () {
                $scope.stanRegTable = new ngTableParams({
                    page: 1,            // show first page
                    count: 5,
                    sorting: {

                    }
                }, {counts: [],
                    total: $scope.itemList.length, // length of data
                    getData: function ($defer, params) {
                        // use build-in angular filter
                        var orderedData = params.sorting() ?
                            $filter('orderBy')($scope.itemList, params.orderBy()) :
                            $scope.itemList;

                        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });
            });
        };
        getStandardRegList();

        $scope.deleteActReg = function (org_code) {

            executeResults.deleteActReg(org_code).then(function () {
                alert('삭제되었습니다.');
            })
        };
        $scope.selectItem = function (index) {
            if ($scope.stanRegTable.data[index] == null)
                $scope.selectedItem = $scope.itemList[index];
            else {
                $scope.selectedItem = $scope.stanRegTable.data[index];
            }

        };



    });