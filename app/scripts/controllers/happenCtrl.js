/**
 * Created by user on 2014-09-10.
 */

'use strict';
angular.module('gntelCqmsApp')
    .controller('happenCtrl', function ($scope, executeResults,$filter,ngTableParams) {

        $scope.test={ text:'why'};


        var getOccurTableList = function () {
            executeResults.getOccurList().then(function (data) {
                $scope.itemList = data;

                //$scope.updateOrgName();
            }).then(function(){
                $scope.happenTable = new ngTableParams({
                    page: 1,            // show first page
                    count: 5,
                    sorting: {
                        ocr_seq: 'desc'     // initial sorting
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
        getOccurTableList();

        var getOccurQltCnt =function(){
            executeResults.getOccurQltCnt


        }
    });