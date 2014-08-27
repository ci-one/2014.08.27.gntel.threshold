/**
 * Created by BLKNABI on 2014-08-14.
 */
'use strict';

angular.module('gntelCqmsApp')
    .factory('dbUserOrg', function ($http, $q) {
        var dbUserOrg = {};

        // 리스트
        dbUserOrg.getList = function (obj) {
            var deferred = $q.defer();

            $http({
                    method: 'post',
                    url: '/dbUserOrg/getList',
                    data: obj
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );

            return deferred.promise;
        };

        // 하나
        dbUserOrg.getOne = function (_id) {
            var deferred = $q.defer();

            $http({
                    method: 'post',
                    url: '/dbUserOrg/getOne',
                    data: {id: _id}
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );

            return deferred.promise;
        };

        // 삽입
        //:orgname, :useyn, :managertel, :managername
        dbUserOrg.insert = function (obj) {
            var deferred = $q.defer();

            $http({
                    method: 'post',
                    url: '/dbUserOrg/insert',
                    data: obj
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );

            return deferred.promise;
        };

        // 수정
        //:orgname, :useyn, :managertel, :managername, :id
        dbUserOrg.update = function (obj) {
            var deferred = $q.defer();

            $http({
                    method: 'post',
                    url: '/dbUserOrg/update',
                    data: obj
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );

            return deferred.promise;
        };

        // 반복 수정
        //:orgname, :useyn, :managertel, :managername, :id
        dbUserOrg.updateGroup = function (arr, start, end) {
            // start <= i < end
            var deferred = $q.defer();

            //$scope.items[i]['check'] / ($scope.items[i]['useyn'] == 'Y' ? 'N' : 'Y')
            for (var i = start; i < end; ++i) {
                if (arr[i]['check']) {
                    var data = {
                        id: arr[i]['code']
                        , orgname: arr[i]['value']
                        , useyn: (arr[i]['useyn'] == 'Y' ? 'N' : 'Y')
                        , managertel: arr[i]['managertel']
                        , managername: arr[i]['managername']};

                    $http({
                            method: 'post',
                            url: '/dbUserOrg/update',
                            data: arr[i]
                        }
                    ).success(function (data) {
                        }
                    );
                }
            }

            deferred.resolve(data.sending);

            return deferred.promise;
        };

        return dbUserOrg;
    });
