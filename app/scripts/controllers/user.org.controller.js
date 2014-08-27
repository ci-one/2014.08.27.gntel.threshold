/**
 * Created by BLKNABI on 2014-08-14.
 */
'use strict';

angular.module('gntelCqmsApp')
    .controller('userOrgCtrl', function ($scope, dbUserOrg) {
        $scope.selectedItem = null;
        $scope.inputData = {};

        $scope.statusList = [
            {state: 'Y', value: '사용함'},
            {state: 'N', value: '사용안함'}
        ];

        $scope.tab_click = function (tabs) {
            $scope.tabPage = tabs;

            $scope.filterState = tabs;
            if (tabs == '전체')
                $scope.filterState = '';

            $scope.$broadcast('resetPage', 0);
        };

        $scope.search = {code: '', value: '', useyn: 'Y'};

        $scope.trySearch = function () {
            $scope.$broadcast('org:reload');
        };

        $scope.tab_click('Y');

        $scope.$on("org:selected", function (event, selected) {
            $scope.selectedItem = selected;
            $scope.inputData = JSON.parse(JSON.stringify(selected));
        });

        $scope.save = function () {
            // 추가나 수정
            var data = {
                orgname: $scope.inputData['value'], useyn: $scope.inputData['useyn'], managertel: $scope.inputData['managertel'], managername: $scope.inputData['managername']};

            if ($scope.selectedItem) {
                data['id'] = $scope.inputData['code'];
                //:orgname, :useyn, :managertel, :managername, :id
                dbUserOrg.update(data)
                    .then(function (result) {
                        alert('수정되었습니다');
                        $scope.$broadcast('org:reload');
                    })
            }
            else {
                //:orgname, :useyn, :managertel, :managername
                dbUserOrg.insert(data)
                    .then(function (result) {
                        alert('추가되었습니다');
                        $scope.$broadcast('org:reload');
                    })
            }
        };

        $scope.$on('page:move', function () {
            $scope.selectedItem = null;
        });

        $scope.tryAdd = function () {
            if ($scope.add && $scope.selectedItem == null)
                $scope.add = false;
            else {
                $scope.selectedItem = null;
                $scope.add = true;
            }
        };

        $scope.action = function () {
            $scope.$broadcast('org:action');
        };

    })
    .controller('userOrgListCtrl', function ($scope, dbUserOrg) {

        $scope.itemsPerPage = 10;
        $scope.pagedItems = [];
        $scope.currentPage = 0;
        $scope.filterItems = [];

        $scope.process = function (selected) {
            $scope.$emit("org:selected", selected);
        };

        $scope.$on('org:reload', function () {
            $scope.getlist();
        });

        $scope.allClick = function () {
            //currentPage*itemsPerPage <= $index && $index < (currentPage+1)*itemsPerPage
            for (var i = ($scope.currentPage * $scope.itemsPerPage); i < (($scope.currentPage + 1) * $scope.itemsPerPage); ++i) {
                $scope.items[i]['check'] = !$scope.items[i]['check'];
            }
        };

        $scope.$on('org:action', function () {
            //사용함 & 사용안함 버튼
            dbUserOrg.updateGroup($scope.items,$scope.currentPage * $scope.itemsPerPage,($scope.currentPage + 1) * $scope.itemsPerPage)
                .then(function (result) {
                    alert('수정되었습니다');
                    $scope.$broadcast('org:reload');
                });
        });

        $scope.getlist = function () {
            dbUserOrg.getList($scope.search)
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

        $scope.$watch('currentPage', function () {
            $scope.$emit('page:move');
        });
    });
