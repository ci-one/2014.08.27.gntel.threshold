<!-- 사용되지 않음 -->


'use strict';

angular.module('gntelCqmsApp')
    .controller('sysRegCtrl', function ($scope, executeResults, $filter, ngTableParams,$timeout,$http) {
        var getSrcList = function () {
            executeResults.getUseComp().then(function (data) {
                    $scope.org_names = data;
            }).then(function () {
                executeResults.getSysList().then(function (data) {
                    $scope.itemList = data;

                    $scope.sysTable = new ngTableParams({
                        page: 1,            // show first page
                        count: 5,
                        sorting: {
                            sys_name: 'desc'     // initial sorting
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
        getSrcList();

        $scope.exportsProcess = function(){
            console.log($scope.itemList);
            var item = [['이용기관명','시스템 코드','시스템 명','메세지']];
            for(var i=0;i<$scope.itemList.length;i++){
                var aaa = [];
                aaa.push($scope.itemList[i].org_name);
                aaa.push($scope.itemList[i].sys_code);
                aaa.push($scope.itemList[i].sys_name);
                aaa.push($scope.itemList[i].sys_notice);
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

        var reloadTable = function(){
            $scope.useSys = null;
            executeResults.getSysList().then(function (data) {
                $scope.itemList = data;
            }).then(function(){
                $scope.sysTable.reload()
            });
        };

        $scope.selectSys = function (index) {
            if ($scope.sysTable.data[index] == null)
                $scope.selectedItem = $scope.itemList[index];
            else {
                $scope.selectedItem = $scope.sysTable.data[index];
            }
        };

        $scope.deleteSys = function (sys_code) {
            executeResults.deleteSys(sys_code).then(function () {
                alert('삭제되었습니다.');
                reloadTable();
            })
        };

        $scope.viewSys = function (org_code) {
        };

        $scope.modifySys = function () {
            $scope.useSys = $scope.selectedItem;
        };
        $scope.clearSys = function () {
            $scope.useSys = null;
            $scope.selectedItem = null;
        };
        $scope.saveSys = function () {
            if ($scope.useSys.sys_code != null && $scope.useSys.sys_code != '') {
                executeResults.updateSys($scope.useSys).then(function () {
                    alert('이용기관이 수정되었습니다.');
                    reloadTable();
                });
            } else {
                executeResults.insertSys($scope.useSys).then(function () {
                    alert('이용기관을 추가하였습니다.');
                    reloadTable();
                })
            }
        };

    });