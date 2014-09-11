/**
 * Created by user on 2014-09-11.
 */
'use strict';
angular.module('gntelCqmsApp')
    .controller('detailRegCtrl', function ($scope, executeResults, $filter, ngTableParams) {

        var getDetailRegList = function () {
            executeResults.getDetailReg().then(function (data) {
                $scope.itemList = data;
                for (var i = 0; i < data.length; i++) {
                    $scope.org_names.push(data[i].org_name);
                }
                //$scope.updateOrgName();
            }).then(function () {
                $scope.compTable = new ngTableParams({
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
        getDetailRegList();

        $scope.deleteDetailReg = function (org_code) {

            executeResults.deleteDetailReg(org_code).then(function () {
                alert('삭제되었습니다.');
            })
        };

    });