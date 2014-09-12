/**
 * Created by BLKNABI on 2014-08-14.
 */
'use strict';

angular.module('gntelCqmsApp')
    .controller('sitemRegCtrl', function ($scope, executeResults, $filter, ngTableParams,$timeout,$http) {
        $scope.dep_names = [];
        $scope.role_names = [];
        var getDataSet = function () {
            $scope.dep_names = [];
            $scope.role_names = [];
            executeResults.getDept().then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    $scope.dep_names.push(data[i].dep_name);
                }
            });
            executeResults.getRole().then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    $scope.role_names.push(data[i].role_name);
                }
            });
        };

        var reloadTable = function () {
            $scope.selectedItem = null;
            $scope.thisMem = null;
            executeResults.getCompMem().then(function (data) {
                $scope.itemList = data;
            }).then(function () {
                $scope.memTable.reload()
            });
            getDataSet();
        };

        var getCompMem = function () {
            executeResults.getUseComp().then(function (data) {
                $scope.org_names = data;
            }).then(function () {
                executeResults.getCompMem().then(function (data) {
                    $scope.itemList = data;
                }).then(function () {
                    getDataSet();
                    $scope.memTable = new ngTableParams({
                        page: 1,            // show first page
                        count: 5,
                        sorting: {
                            mem_name: 'desc'     // initial sorting
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
            });
        };
        getCompMem();

        $scope.selectMem = function (index) {
            if ($scope.memTable.data[index] == null)
                $scope.selectedItem = $scope.itemList[index];
            else {
                $scope.selectedItem = $scope.memTable.data[index];
            }

        };

        $scope.deleteMem = function (mem_code) {
            executeResults.deleteCompMem(mem_code).then(function () {
                alert('삭제되었습니다.');
                reloadTable();
            })
        };

        $scope.viewComp = function (org_code) {
        };

        $scope.modifyMem = function () {
            $scope.thisMem = $scope.selectedItem;
        };

        $scope.clearMem = function () {
            $scope.thisMem = null;
            $scope.selectedItem = null;
        };

        $scope.newDep = true;
        $scope.newRole = true;
        $scope.saveMem = function () {
            executeResults.getDept().then(function (data) {
                for (var i = 0; i < data.length; i++) {
                    if($scope.thisMem.dep_name==data[i].dep_name){
                        $scope.newDep = false;
                        return;
                    }
                }
            }).then(function(){
                executeResults.getRole().then(function (data) {
                    for (var i = 0; i < data.length; i++) {
                        if($scope.thisMem.role_name==data[i].role_name){
                            $scope.newRole = false;
                            return;
                        }
                    }
                }).then(function(){
                    if($scope.newDep==true){
                        executeResults.insertDept($scope.thisMem.dep_name).then(function(result){
                            $scope.thisMem.dep_code = result[0].dep_code;
                        }).then(initRoleCode)
                    }else if($scope.newDep == false){
                        executeResults.getDepOne($scope.thisMem.dep_name).then(function(result){
                            $scope.thisMem.dep_code = result[0].dep_code;
                        }).then(initRoleCode)
                    }
                });
            });

        };

        var initRoleCode = function(){
            if($scope.newRole==true){
                executeResults.insertRole($scope.thisMem.role_name).then(function(result){
                    $scope.thisMem.role_code = result[0].role_code;
                }).then($timeout(function(){saveMethod()},200))
            }else if($scope.newRole == false){
                executeResults.getRoleOne($scope.thisMem.role_name).then(function(result){
                    $scope.thisMem.role_code = result[0].role_code;
                }).then($timeout(function(){saveMethod()},200))
            }
        }

        var saveMethod = function(){
            if ($scope.thisMem.mem_code != null && $scope.thisMem.mem_code != '') {
                executeResults.updateCompMem($scope.thisMem).then(function () {
                    alert('이용기관이 수정되었습니다.');
                    reloadTable();
                });
            } else {
                executeResults.insertCompMem($scope.thisMem).then(function () {
                    alert('이용기관을 추가하였습니다.');
                    reloadTable();
                })
            }
        };

        //자동완성
        $scope.updateDepName = function (typed) {
            // MovieRetriever could be some service returning a promise
            $scope.newDep_names = MovieRetriever.getmovies(typed);
            $scope.newDep_names.then(function (data) {
                $scope.dep_names = data;
            });
        }
        $scope.updateRoleName = function (typed) {
            // MovieRetriever could be some service returning a promise
            $scope.newRole_names = MovieRetriever.getmovies(typed);
            $scope.newRole_names.then(function (data) {
                $scope.role_names = data;
            });
        }


        $scope.exportsProcess = function(){
            console.log($scope.itemList);

            var item = [['부서코드','부서명','직책코드','직책명','이름','연락처','이메일']];
            for(var i=0;i<$scope.itemList.length;i++){
                var aaa = [];
                aaa.push($scope.itemList[i].dep_code);
                aaa.push($scope.itemList[i].dep_name);
                aaa.push($scope.itemList[i].role_code);
                aaa.push($scope.itemList[i].role_name);
                aaa.push($scope.itemList[i].mem_name);
                aaa.push($scope.itemList[i].mem_tel);
                aaa.push($scope.itemList[i].mem_email);
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