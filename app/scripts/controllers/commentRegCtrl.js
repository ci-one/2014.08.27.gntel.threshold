/**
 * Created by BLKNABI on 2014-08-14.
 */
'use strict';

angular.module('gntelCqmsApp')
    .controller('commentRegCtrl', function ($scope, executeResults, $filter, ngTableParams) {


        var filess;
        $scope.onFileSelect = function($files) {
            filess = $files;
        };

        var getComm = function(){
            executeResults.actData().then(function(data){
                $scope.comm_names = data;
            })
        }
        getComm();
        $scope.comm_notice = $('#textarea').val();
        var actList = function () {
            executeResults.actList().then(function (data) {
                $scope.itemList = data;
            }).then(function(){
                $scope.actTable = new ngTableParams({
                    page: 1,            // show first page
                    count: 5,
                    sorting: {
                        kind: 'desc'     // initial sorting
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
        actList();

        $scope.selectAct = function (index) {
            if ($scope.actTable.data[index] == null)
                $scope.selectedItem = $scope.itemList[index];
            else {
                $scope.selectedItem = $scope.actTable.data[index];
            }

        };
        $scope.selectActed = function (index) {
            if ($scope.actedTable.data[index] == null)
                $scope.selectedItem = $scope.itemList[index];
            else {
                $scope.selectedItem = $scope.actedTable.data[index];
            }

        };

        $scope.deleteAct = function (kind,qlevel) {
            executeResults.deleteAct(kind,qlevel).then(function () {
                alert('삭제되었습니다.');
                reloadTable();
            })
        };

        $scope.viewAct = function (org_code) {
        };

        $scope.modifyAct = function () {
            $scope.useAct = $scope.selectedItem;
        };

        $scope.clearAct = function () {
            $scope.useAct = null;
            $scope.selectedItem = null;
        };


        $scope.saveAct = function () {
            if(filess==null || filess==''){
                alert('comes hsere1');
                executeResults.insertAct($scope.selectedItem).then(function () {
                    alert('액션코멘트가 추가되었습니다.');
                    reloadTable();
                })
            }
            else{
                executeResults.insertF(filess).then(function(data){

                    $scope.selectedItem.comm_file = data;
                    executeResults.insertAct($scope.selectedItem).then(function () {
                        alert('액션코멘트가 추가되었습니다.');
                        reloadTable();
                    })
                });
            }

        };

        var reloadTable = function(){
            $scope.selectedItem = null;
            $scope.org_names = [];
            $scope.useComp = null;
            executeResults.actedList().then(function (data) {
                $scope.actedList = data;
            }).then(function(){
                $scope.actedTable.reload()
            });
        };

        var actedList = function () {
            executeResults.actedList().then(function (data) {
                $scope.actedList = data;
            }).then(function(){
                $scope.actedTable = new ngTableParams({
                    page: 1,            // show first page
                    count: 5,
                    sorting: {
                        kind: 'desc'     // initial sorting
                    }
                }, {counts: [],
                    total: $scope.actedList.length, // length of data
                    getData: function ($defer, params) {
                        // use build-in angular filter
                        var orderedData = params.sorting() ?
                            $filter('orderBy')($scope.actedList, params.orderBy()) :
                            $scope.actedList;

                        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });
            });
        };
        actedList();


        $scope.exportsProcess1 = function(){
            console.log($scope.itemList);

            var item = [['임계치관리 항목','품질 항목','액션 명']];
            for(var i=0;i<$scope.itemList.length;i++){
                var aaa = [];
                aaa.push($scope.itemList[i].kind);
                aaa.push($scope.itemList[i].qlevel);
                aaa.push($scope.itemList[i].comm_name);
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


        $scope.exportsProcess2 = function(){
            console.log($scope.actedList);

            var item = [['임계치관리 항목','품질 항목','액션 명','첨부파일 명','메세지']];
            for(var i=0;i<$scope.actedList.length;i++){
                var aaa = [];
                aaa.push($scope.actedList[i].kind);
                aaa.push($scope.actedList[i].qlevel);
                aaa.push($scope.actedList[i].comm_name);
                aaa.push($scope.actedList[i].comm_file);
                aaa.push($scope.actedList[i].comm_notice);
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