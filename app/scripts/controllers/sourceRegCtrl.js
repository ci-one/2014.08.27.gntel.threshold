<!-- 사용되지 않음 -->


'use strict';

angular.module('gntelCqmsApp')
    .controller('sourceRegCtrl', function ($scope, executeResults, $filter, ngTableParams) {
        $scope.source_codes = [];
        var getSrcList = function () {
            executeResults.getUseComp().then(function (data) {
                    $scope.org_names = data;
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
        getSrcList();

        var reloadTable = function(){
            $scope.useSource = null;
            executeResults.getSource().then(function (data) {
                $scope.itemList = data;
                for (var i = 0; i < data.length; i++) {
                    $scope.source_codes.push(data[i].source_code);
                }
                //$scope.updateOrgName();
            }).then(function(){
                $scope.srcTable.reload()
            });
        };

        $scope.selectSrc = function (index) {
            if ($scope.srcTable.data[index] == null)
                $scope.useSource = $scope.itemList[index];
            else {
                $scope.useSource = $scope.srcTable.data[index];
            }
        };

        $scope.deleteSrc = function (source_code) {
            executeResults.deleteSource(source_code).then(function () {
                alert('삭제되었습니다.');
                reloadTable();
            })
        };

        $scope.viewComp = function (org_code) {
        };

        $scope.saveSrc = function () {
            executeResults.insertSource($scope.useSource).then(function () {
                alert('이용기관을 추가하였습니다.');
                reloadTable();
            })
        };

        //자동완성
        $scope.updateSrcName = function (typed) {
            $scope.newsource_codes = MovieRetriever.getmovies(typed);
            $scope.newsource_codes.then(function (data) {
                $scope.source_codes = data;
            });
        }
    });