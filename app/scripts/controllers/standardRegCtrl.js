/**
 * Created by user on 2014-09-11.
 */
'use strict';
angular.module('gntelCqmsApp')
    .controller('standardRegCtrl', function ($scope, executeResults, $filter, ngTableParams) {

        $scope.item_names = [];
        

        var getStandardRegList = function () {
            executeResults.getStandardReg().then(function (data) {
                $scope.itemList = data;
                for (var i = 0; i < data.length; i++) {
                    $scope.item_names.push(data[i].item_name);
                }
                //$scope.updateOrgName();
            }).then(function () {
                $scope.stanRegTable = new ngTableParams({
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
        getStandardRegList();


        $scope.deleteStanReg = function (org_code) {

            executeResults.deleteStanReg(org_code).then(function () {
                alert('삭제되었습니다.');
            });
        };

        $scope.saveStanReg = function () {
            alert("scope:" + $scope.stanReg.item_name+$scope.stanReg.qlt_code);

            //executeResults.insertStanRegItem($scope.stanReg).then(function(){

                executeResults.insertStanReg($scope.stanReg);
           // });

        };

        //자동완성
        $scope.updateItemName = function (typed) {
            // MovieRetriever could be some service returning a promise
            $scope.newItem_names = MovieRetriever.getmovies(typed);
            $scope.newItem_names.then(function (data) {
                $scope.item_names = data;
            });
        }
    });