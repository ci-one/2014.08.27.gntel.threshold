/**
 * Created by 성시원님 on 2014-09-10.
 */

'use strict';

angular.module('gntelCqmsApp')
    .controller('process', function ($scope, executeResults, $filter, ngTableParams,$timeout,$http) {
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


        $scope.exportsProcess = function(){
            console.log($scope.processLists);
            var item = [['액션정보','기관명','횟수','발생일','기준항목','값','시스템명']];
            for(var i=0;i<$scope.processLists.length;i++){
                var aaa = [];
                aaa.push($scope.processLists[i].actionInfo);
                aaa.push($scope.processLists[i].comLocation);
                aaa.push($scope.processLists[i].commentSeq);
                aaa.push($scope.processLists[i].occurDate);
                aaa.push($scope.processLists[i].occurName);
                aaa.push($scope.processLists[i].qLevel);
                aaa.push($scope.processLists[i].systemName);
                item.push(aaa);
            }

            $timeout(function(){
                $http({
                    method: 'post',
                    url: '/abcd',
                    data: {itemList: item}
                }).success(function(){
                    var link = document.createElement("a");
                    link.download = name;
                    link.href = '/docu/savedabcd.xlsx';
                    link.click();
                })
            },300);

        };
    });

