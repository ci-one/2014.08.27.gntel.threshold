/**
 * Created by SimJeongmee on 2014-08-19.
 */
'use strict';

angular.module('gntelCqmsApp')
    .controller('userAccessCtrl', function ($scope) {

        // 컬럼들의 정렬 순서가 담김 : ex. 1:'col1', 2: 'col2'
        $scope.orderby = {};
        // 컬럼들의 정렬 방법(isDesc)이 담김 : ex. 'col1':true, 'col2':true
        $scope.orderbyDesc = {};

        // 정렬할 컬럼을 정의
        $scope.orderItems = ['dutyname', 'memberid', 'logincnt'];
        // 정의된 정렬 컬럼들로 정렬 순서, 정렬 방법 초기화
        $scope.initOrderColumn = function() {
            for(var i=1;i<=$scope.orderItems.length;++i) {
                $scope.orderby[i] = $scope.orderItems[i-1];
                $scope.orderbyDesc[$scope.orderItems[i-1]] = true;
            }
        };
        $scope.initOrderColumn();

        // 각 정렬 컬럼 헤더를 클릭할 때마다 토글
        $scope.toggleOrder = function (type) {

            var fieldname = '';

            switch (type) {
                case 'name':
                    fieldname = 'dutyname';
                    break;
                case 'id':
                    fieldname = 'memberid';
                    break;
                case 'count':
                    fieldname = 'logincnt';
                    break;
            }

            // type이 해당하지 않으면 종료
            if(fieldname == '')
                return;

            // toggle
            $scope.orderbyDesc[fieldname] = !$scope.orderbyDesc[fieldname];

            // sort
            // 값 복제
            var _tmpArr = JSON.parse(JSON.stringify($scope.orderby));
            // 루프를 돌면서
            for(var i=2, j=1; j<=$scope.orderItems.length; ++j) {
                // 컬럼이 일치하는 경우에 1번으로 보내고
                if(_tmpArr[j]==fieldname)
                    $scope.orderby[1] = _tmpArr[j];
                // 일치 하지 않으면 기존의 순서대로 삽입
                else {
                    $scope.orderby[i] = _tmpArr[j];
                    ++i;
                }
            }

            //console.log($scope.orderby);
        };

        // order by를 위한 함수
        $scope.ordering = function() {
            var orderArray = [];

            for(var i=1;i<=$scope.orderItems.length;++i) {
                orderArray.push(($scope.orderbyDesc[$scope.orderby[i]]?'-':'') + $scope.orderby[i]);
            }

            return orderArray;
        };
    })
    .controller('userAccessListCtrl', function ($scope, dbUserAccess) {

        $scope.search = {dutyname:'',memberid:'',start:'',end:''};

        $scope.itemsPerPage = 19;
        $scope.pagedItems = [];
        $scope.currentPage = 0;
        $scope.filterItems = [];

        $scope.getlist = function () {

            var searchKeyword = {
                dutyname:$scope.search.dutyname
                , memberid:$scope.search.memberid
                , start:$scope.search.start.replace(/-/g,'')
                , end:$scope.search.end.replace(/-/g,'')};

            console.log(searchKeyword);

            dbUserAccess.getList(searchKeyword)
                .then(function (result) {
                    $scope.items = result;
                })
                .then(function () {

                    $scope.getPageMax = function () {
                        var pageMax = 0;
                        var div = Math.floor($scope.filterItems.length / $scope.itemsPerPage);

                        if ($scope.filterItems.length % $scope.itemsPerPage == 0) {
                            pageMax = div;
                        }
                        else {
                            pageMax = div + 1;
                        }
                        return pageMax;
                    };

                    $scope.range = function (start, end) {
                        var ret = [];

                        if (start < 0) {
                            start = 0;
                            end = start + 5;
                        }

                        if (end > $scope.getPageMax()) {
                            end = $scope.getPageMax();
                            start = end - 5;
                            if (start < 0)
                                start = 0;
                        }

                        if (!end) {
                            end = start;
                            start = 0;
                        }
                        for (var i = start; i < end; i++) {
                            ret.push(i);
                        }
                        return ret;
                    };

                    $scope.prev10Page = function () {
                        if ($scope.currentPage >= 10) {
                            $scope.currentPage -= 10;
                        }
                        else if ($scope.currentPage < 10) {
                            $scope.currentPage = 0;
                        }
                    };

                    $scope.prevPage = function () {
                        if ($scope.currentPage > 0) {
                            $scope.currentPage--;
                        }
                    };

                    $scope.nextPage = function () {
                        if ($scope.currentPage < $scope.getPageMax() - 1) {
                            $scope.currentPage++;
                        }
                    };

                    $scope.next10Page = function () {
                        if ($scope.currentPage < $scope.getPageMax() - 10) {
                            $scope.currentPage += 10;
                        }
                        else if ($scope.currentPage < $scope.getPageMax() - 1) {
                            $scope.currentPage = $scope.getPageMax() - 1;
                        }
                    };

                    $scope.setPage = function () {
                        $scope.currentPage = this.n;
                    };
                });
        };
        $scope.getlist();

        $scope.trySearch = function() {
            $scope.getlist();
        };
    });
