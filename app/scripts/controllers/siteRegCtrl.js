<!-- 사용되지 않음 -->


'use strict';

angular.module('gntelCqmsApp')
    .controller('siteRegCtrl', function ($scope, executeResults, $filter, ngTableParams,$timeout,$http) {
        $scope.modified = false;
        $scope.target_names = [];
        var getTarList = function () {
            executeResults.getUseComp().then(function (data) {
                $scope.org_names = data;
            }).then(function(){
                executeResults.getTarget().then(function(data){
                    $scope.itemList = data;
                    for (var i = 0; i < data.length; i++) {
                        $scope.target_names.push(data[i].target_name);
                    }

                    $scope.tarTable = new ngTableParams({
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
        getTarList();

        var reloadTable = function(){
            $scope.selectedItem = null;
            $scope.useTarget = null;
            executeResults.getTarget().then(function (data) {
                $scope.itemList = data;
                for (var i = 0; i < data.length; i++) {
                    $scope.target_names.push(data[i].target_name);
                }
            }).then(function(){
                $scope.tarTable.reload()
            });
        };

        $scope.selectTar = function (index) {
            if ($scope.tarTable.data[index] == null)
                $scope.selectedItem = $scope.itemList[index];
            else {
                $scope.selectedItem = $scope.tarTable.data[index];
            }
        };

        $scope.deleteTar = function (target_code) {
            executeResults.deleteTarget(target_code).then(function () {
                alert('삭제되었습니다.');
                reloadTable();
            })
        };

        $scope.clearTar = function () {
            $scope.useTarget = null;
            $scope.selectedItem = null;
            $scope.modified = false;
        };

        $scope.viewComp = function (org_code) {
        };

        $scope.modifyTar = function () {
            $scope.modified = true;
            $scope.useTarget = $scope.selectedItem;
        };

        $scope.saveTar = function () {
            if ($scope.modified == true) {
                executeResults.updateTarget($scope.useTarget).then(function () {
                    alert('이용기관이 수정되었습니다.');
                    reloadTable();

                });
            } else {
                executeResults.insertTarget($scope.useTarget).then(function () {
                    alert('이용기관을 추가하였습니다.');
                    reloadTable();
                })
            }
        };

        //자동완성
        $scope.updateTarName = function (typed) {
            $scope.newtarget_names = MovieRetriever.getmovies(typed);
            $scope.newtarget_names.then(function (data) {
                $scope.target_names = data;
            });
        }


        $scope.exportsProcess = function(){
            console.log($scope.itemList);

            var item = [['기관코드','이용기관명','타겟','타겟명','메세지']];
            for(var i=0;i<$scope.itemList.length;i++){
                var aaa = [];
                aaa.push($scope.itemList[i].org_code);
                aaa.push($scope.itemList[i].org_name);
                aaa.push($scope.itemList[i].target_code);
                aaa.push($scope.itemList[i].target_name);
                aaa.push($scope.itemList[i].target_notice);
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