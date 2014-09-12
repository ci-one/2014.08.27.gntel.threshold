/**
 * Created by user on 2014-09-10.
 */

'use strict';
angular.module('gntelCqmsApp')
    .controller('happenCtrl', function ($scope, executeResults, $filter, ngTableParams,$timeout,$http) {
        var qlt_cnt = [];

        var getOccurTableList = function () {
            executeResults.getOccurList().then(function (data) {
                $scope.itemList = data;

                //$scope.updateOrgName();
            }).then(function () {
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


        var getOccurQltCnt = function () {
            executeResults.getOccurQltCnt().then(function (data) {
                console.log('comse here');
                for (var i = 0; i < data.length; i++) {
                    qlt_cnt[i] = parseInt(data[i].cnt);
                }
            }).then(function () {
                $scope.chartConfig = {
                    "options": {
                        "chart": {
                            "type": "areaspline"
                        }
                    },
                    "series": [
                        {
                            "name": "발생횟수",
                            "data": qlt_cnt,
                            "type": "bar",
                            "id": "series-2",
                            "dashStyle": "Solid",
                            "connectNulls": false,
                            tooltip: {
                                valueSuffix: ' 번　'
                            }
                        }
                    ],
                    "title": {
                        "text": "등급별 임계치 발생 횟수"
                    },
                    "credits": {
                        "enabled": true
                    },
                    "loading": false,
                    "size": {
                        "width": "800"
                    },
                    yAxis: [
                        { // Primary yAxis
                            labels: {
                                style: {
                                    color: Highcharts.getOptions().colors[1]
                                }
                            },
                            title: {
                                text: '횟수',
                                style: {
                                    color: Highcharts.getOptions().colors[1]
                                }
                            }
                        }
                    ],
                    xAxis: [
                        {
                            categories: ['fatal', 'critical', 'major', 'minor', 'warning', 'danger', 'normal'],
                            title: {text: '등급'}
                        }
                    ]
                };
            });
        };
        getOccurQltCnt();


        $scope.exportsProcess = function(){
            console.log($scope.itemList);
            var item = [['기관명','횟수','발생일','기준항목','값','소스','타겟','시스템명']];
            for(var i=0;i<$scope.itemList.length;i++){
                var aaa = [];
                aaa.push($scope.itemList[i].org_code);
                aaa.push($scope.itemList[i].count);
                aaa.push($scope.itemList[i].ocr_date);
                aaa.push($scope.itemList[i].kind);
                aaa.push($scope.itemList[i].qlt_code);
                aaa.push($scope.itemList[i].source);
                aaa.push($scope.itemList[i].target);
                aaa.push($scope.itemList[i].system_code);
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