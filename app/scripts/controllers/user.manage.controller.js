/**
 * Created by BLKNABI on 2014-08-14.
 */
'use strict';

angular.module('gntelCqmsApp')
    .controller('userManageCtrl', function ($scope, dbCode, dbUserManage, $route) {
        $scope.change = function (item){
            $scope.click =item
        }
        $scope.selectedItem = null;
        $scope.filterState = '';
        $scope.currentPage = 0;

        // for calendar
        $scope.showCal = false;

        // 중복 로딩 방지
        var isInitializing = false;

        // 목록 로딩
        var getStatusList = function () {
            if (!isInitializing) {

                isInitializing = true;

                dbCode.getStatus()
                    .then(
                    function (result) {
                        $scope.statusList = result;
                        isInitializing = false;
                        if ($scope.statusList.length > 0)
                            $scope.tab_click($scope.statusList[0]['value']);
                    },
                    function (error) {
                        alert(error.message);
                    })
            }
        };
        getStatusList();

        $scope.tab_click = function (tabs) {
            $scope.tabPage = tabs;

            $scope.filterState = tabs;
            if (tabs == '전체')
                $scope.filterState = '';

            $scope.$broadcast('resetPage', 0);
        };

        $scope.editState = function (stat) {
            $scope.afterState = stat;
            $scope.previewState = stat;
        };

        $scope.$on("user:selected", function (e, selected) {

            if ($scope.selectedItem == selected)
                return;

            $scope.selectedItem = selected;
            $scope.previewState = selected.state;
            $scope.afterState = null;
        });

        $scope.saveState = function () {
            var state = '';

            for (var stat in $scope.statusList) {
                var statData = $scope.statusList[stat];
                if (statData['value'] == $scope.afterState) {
                    state = statData['code'];
                    break;
                }
            }

            //data.state, data.operator, data.id
            var data = {state: state, operator: 'admin', id: $scope.selectedItem['memberid']};
            dbUserManage.updateState(data)
                .then(function (result) {
                    console.log(result);
                }, function (error) {
                    console.log(error.message);
                });

            $scope.$broadcast('reload:list');
        };

    })
    .controller('userManageListCtrl', function ($scope, dbUserManage) {

        $scope.search = {org: '', dutyname: '', memberid: '', mobile: '', joindate: ''};

        $scope.itemsPerPage = 5;
        $scope.filterItems = [];
        $scope.pageMax = 0;

        $scope.process = function (selected) {
            $scope.$emit("user:selected", selected);
        };

        $scope.getlist = function () {

            $scope.search.joindatef = $scope.search.joindate.replace(/-/g, '');
            console.log($scope.search);

            dbUserManage.getList($scope.search)
                .then(function (result) {
                    $scope.items = result;
                })
                .then(function () {

                    $scope.$watchCollection('filterItems', function () {
                        $scope.setPageMax();
                    });

                    $scope.setPageMax = function () {
                        $scope.pageMax = 0;
                        var div = Math.floor($scope.filterItems.length / $scope.itemsPerPage);

                        if ($scope.filterItems.length % $scope.itemsPerPage == 0) {
                            $scope.pageMax = div;
                        }
                        else {
                            $scope.pageMax = div + 1;
                        }
                    };

                    $scope.range = function (start, end) {
                        var ret = [];

                        if (start < 0) {
                            start = 0;
                            end = start + 5;
                        }

                        if (end > $scope.pageMax) {
                            end = $scope.pageMax;
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
                        if ($scope.currentPage < $scope.pageMax - 1) {
                            $scope.currentPage++;
                        }
                    };

                    $scope.next10Page = function () {
                        if ($scope.currentPage < $scope.pageMax - 10) {
                            $scope.currentPage += 10;
                        }
                        else if ($scope.currentPage < $scope.pageMax - 1) {
                            $scope.currentPage = $scope.pageMax - 1;
                        }
                    };

                    $scope.setPage = function (_n) {
                        $scope.currentPage = _n;
                    };

                    $scope.$on('resetPage', function (event, _n) {
                        $scope.setPage(_n);
                    });

                    $scope.$on('reload:list', function (event) {
                        $scope.getlist();
                    });
                });
        };
        $scope.getlist();

        $scope.trySearch = function () {
            $scope.getlist();
        };

    });