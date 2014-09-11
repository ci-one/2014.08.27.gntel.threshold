<!-- 사용되지 않음 -->


'use strict';

angular.module('gntelCqmsApp')
    .controller('sourceRegCtrl', function ($scope, executeResults, $filter, ngTableParams) {
        $scope.org_names = [];
        $scope.source_codes = [];
        var getCompList = function () {
            executeResults.getUseComp().then(function (data) {
                for (var i = 0; i < data.length; i++)
                    $scope.org_names.push(data[i].org_name);
            }).then(function () {
                executeResults.getSource().then(function (data) {
                    for (var i = 0; i < data.length; i++)
                        $scope.source_codes.push(data[i].source_code);
                    $scope.itemList = data;

                    $scope.srcTable = new ngTableParams({
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
                })
            });

        };
        getCompList();

        $scope.selectComp = function (index) {
            $scope.selectedItem = $scope.tableParams.data[index];
        };

        $scope.deleteComp = function (org_code) {
            executeResults.deleteUseComp(org_code).then(function () {
                alert('삭제되었습니다.');
                getCompList();
            })
        };

        $scope.viewComp = function (org_code) {
        };

        var clear = function () {
            $scope.useComp = null;
            $scope.selectedItem = null;
        };

        $scope.saveComp = function () {
            executeResults.insertUseComp($scope.useComp).then(function () {
                alert('이용기관을 추가하였습니다.');
                getCompList();
            })
        };

        //자동완성
        $scope.updateOrgName = function (typed) {
            $scope.neworg_names = MovieRetriever.getmovies(typed);
            $scope.neworg_names.then(function (data) {
                $scope.org_names = data;
            });
        }
    });