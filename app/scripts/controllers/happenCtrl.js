/**
 * Created by user on 2014-09-10.
 */

'use strict';
angular.module('gntelCqmsApp')
    .controller('happenCtrl', function ($scope, executeResults, $filter, ngTableParams) {
        $scope.qlt_cnt=[];

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
            executeResults.getOccurQltCnt().then(function(data){
                for(var i=0;i<data.length;i++){
                    $scope.qlt_cnt.push(data[i].cnt);
                }

            }).then(function(){
                console.log("qlt_cnt :"+ $scope.qlt_cnt);
                $('#container2').highcharts({
                    chart: {
                        zoomType: 'xy'
                    },
                    title: {
                        text: ''
                    },
                    xAxis: [
                        {
                            categories: ['fatal', 'critical', 'major', 'minor', 'warning', 'danger', 'normal']
                        }
                    ],
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
                    tooltip: {
                        shared: true
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'left',
                        x: 120,
                        verticalAlign: 'top',
                        y: 100,
                        floating: true,
                        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
                    },
                    series: [
                        {
                            name: '발생횟수',
                            type: 'column',
                            data: [$scope.qlt_cnt],
                            tooltip: {
                                valueSuffix: ' 번'
                            }

                        }
                    ]
                });
            });
        };
        getOccurQltCnt();



    });