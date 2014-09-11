/**
 * Created by 성시원님 on 2014-09-10.
 */

'use strict';

angular.module('gntelCqmsApp')
    .controller('process', function ($scope, executeResults, $filter, ngTableParams) {
//        alert("getList call");
        var getProList = function () {

            executeResults.getProcessList().then(function (data) {
                $scope.processLists = data;
            }).then(function () {
                $scope.processTable = new ngTableParams({
                    page: 1,            // show first page
                    count: 5,
                    sorting: {
                        ocr_seq: 'desc'     // initial sorting
                    }
                }, {counts: [],
                    total: $scope.processLists.length, // length of data
                    getData: function ($defer, params) {
                        // use build-in angular filter
                        var orderedData = params.sorting() ?
                            $filter('orderBy')($scope.processLists, params.orderBy()) :
                            $scope.processLists;

                        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });
            });

        };

        var getActList = function () {
            executeResults.getActionList().then(function (data) {
                $scope.processedLists = data;
            }).then(function () {
                $scope.processedTable = new ngTableParams({
                    page: 1,            // show first page
                    count: 5,
                    sorting: {
                        ocr_seq: 'desc'     // initial sorting
                    }
                }, {counts: [],
                    total: $scope.processedLists.length, // length of data
                    getData: function ($defer, params) {
                        // use build-in angular filter
                        var orderedData = params.sorting() ?
                            $filter('orderBy')($scope.processedLists, params.orderBy()) :
                            $scope.processedLists;

                        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });
            });

            //alert("getList call");
        };
        getProList();
        //getActList();
    });

