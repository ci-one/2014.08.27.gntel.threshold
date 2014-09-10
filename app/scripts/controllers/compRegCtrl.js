/**
 * Created by BLKNABI on 2014-08-14.
 */
'use strict';

angular.module('gntelCqmsApp')
    .controller('compRegCtrl', function ($scope, executeResults, $filter, ngTableParams) {
        $scope.org_names = [];


        var clear = function () {
            $scope.selectedItem = null;

            $scope.org_names = [];
            $scope.useComp = null;
        };

        var getCompList = function () {

            executeResults.getUseComp().then(function (data) {
                clear();
                $scope.itemList = data;

                $scope.compTable = new ngTableParams({
                    page: 1,            // show first page
                    count: 5,
                    sorting: {
                        city_name: 'desc'     // initial sorting
                    }
                }, {counts: [],
                    total: data.length, // length of data
                    getData: function ($defer, params) {
                        // use build-in angular filter
                        var orderedData = params.sorting() ?
                            $filter('orderBy')(data, params.orderBy()) :
                            data;

                        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });
                for (var i = 0; i < data.length; i++) {
                    $scope.org_names.push(data[i].org_name);
                }
                $scope.updateOrgName();
            });
        };
        getCompList();

        $scope.selectComp = function (index) {
            if ($scope.compTable.data[index] == null)
                $scope.selectedItem = $scope.itemList[index];
            else {
                $scope.selectedItem = $scope.compTable.data[index];
            }

        };

        $scope.deleteComp = function (org_code) {
            executeResults.deleteComp(org_code).then(function () {
                alert('삭제되었습니다.');
                getCompList();
            })
        };

        $scope.viewComp = function (org_code) {
        };

        $scope.modifyComp = function () {
            $scope.useComp = $scope.selectedItem;
        };

        $scope.clearComp = function () {
            $scope.useComp = null;
            $scope.selectedItem = null;
        };


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
        };

        //자동완성
        $scope.updateOrgName = function (typed) {
            // MovieRetriever could be some service returning a promise
            $scope.neworg_names = MovieRetriever.getmovies(typed);
            $scope.neworg_names.then(function (data) {
                $scope.org_names = data;
            });
        };

        $scope.deleteComp = function (org_code) {
            executeResults.deleteUseComp(org_code).then(function () {
                alert('삭제되었습니다.');
                getCompList();
            })
        };
    });