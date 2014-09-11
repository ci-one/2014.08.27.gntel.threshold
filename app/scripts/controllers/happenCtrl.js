/**
 * Created by user on 2014-09-10.
 */

'use strict';
angular.module('gntelCqmsApp')
    .controller('happenCtrl', function ($scope, executeResults, $filter, ngTableParams) {
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
    });