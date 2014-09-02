/**
 * Created by BLKNABI on 2014-08-14.
 */
'use strict';

angular.module('gntelCqmsApp')
    .controller('compRegCtrl', function ($scope, executeResults, $filter, ngTableParams) {
        $scope.org_names = [];
        var getCompList = function () {
         $scope.companies = null;
         executeResults.getUseComp().then(function (data) {
         $scope.companies = data;
         clear();

             $scope.tableParams = new ngTableParams({
                 page: 1,
                 count: 5
             }, {counts: [],
                 total: data.length,
                 getData: function ($defer, params) {
                     var orderedData = params.sorting() ?
                         $filter('orderBy')(data, params.orderBy()) :
                         data;

                     $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                 }
             });

         for(var i=0;i<data.length;i++){
         $scope.org_names.push(data[i].org_name);
         }
         });

        };
        getCompList();

        $scope.selectComp = function (index) {
            $scope.selectedItem = $scope.companies[index];
        };

        $scope.deleteComp = function (org_code) {
            executeResults.deleteUseComp(org_code).then(function () {
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

        var clear = function () {
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
            $scope.neworg_names = MovieRetriever.getmovies(typed);
            $scope.neworg_names.then(function (data) {
                $scope.org_names = data;
            });
        }
    });