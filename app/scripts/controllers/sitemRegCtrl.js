/**
 * Created by BLKNABI on 2014-08-14.
 */
'use strict';

angular.module('gntelCqmsApp')
    .controller('sitemRegCtrl', function ($scope, executeResults, $filter, ngTableParams) {
        $scope.dep_names = [];
        $scope.role_names = [];

        var reloadTable = function(){
            $scope.selectedItem = null;
            $scope.org_names = [];
            $scope.thisMem = null;
            executeResults.getUseComp().then(function (data) {
                $scope.itemList = data;
                for (var i = 0; i < data.length; i++) {
                    $scope.dep_names.push(data[i].dep_name);
                }
                //$scope.updateOrgName();
            }).then(function(){
                $scope.memTable.reload()
            });
        };

        var getCompMem = function () {
            executeResults.getCompMem().then(function (data) {
                $scope.itemList = data;
                for (var i = 0; i < data.length; i++) {
                    $scope.dep_names.push(data[i].dep_name);
                    $scope.role_names.push(data[i].role_name);
                }
            }).then(function(){
                $scope.memTable = new ngTableParams({
                    page: 1,            // show first page
                    count: 5,
                    sorting: {
                        mem_name: 'desc'     // initial sorting
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
        getCompMem();

        $scope.selectMem = function (index) {
            if ($scope.memTable.data[index] == null)
                $scope.selectedItem = $scope.itemList[index];
            else {
                $scope.selectedItem = $scope.memTable.data[index];
            }

        };

        $scope.deleteMem = function (org_code) {

            executeResults.deleteUseComp(org_code).then(function () {
                alert('삭제되었습니다.');
                reloadTable();
            })
        };

        $scope.viewComp = function (org_code) {
        };

        $scope.modifyMem = function () {
            $scope.thisMem = $scope.selectedItem;
        };

        $scope.clearMem = function () {
            $scope.thisMem = null;
            $scope.selectedItem = null;
        };


        $scope.saveComp = function () {
            if ($scope.thisMem.org_code != null && $scope.thisMem.org_code != '') {
                executeResults.updateUseComp($scope.thisMem).then(function () {
                    alert('이용기관이 수정되었습니다.');
                    reloadTable();
                });
            } else {
                executeResults.insertUseComp($scope.thisMem).then(function () {
                    alert('이용기관을 추가하였습니다.');
                    reloadTable();
                })
            }
        };

        //자동완성
        $scope.updateDepName = function (typed) {
            // MovieRetriever could be some service returning a promise
            $scope.newDep_names = MovieRetriever.getmovies(typed);
            $scope.newDep_names.then(function (data) {
                $scope.dep_names = data;
            });
        }
    });