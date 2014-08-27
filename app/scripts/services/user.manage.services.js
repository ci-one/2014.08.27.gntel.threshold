/**
 * Created by BLKNABI on 2014-08-14.
 */
'use strict';

angular.module('gntelCqmsApp')
    .factory('dbUserManage', function ($http, $q) {
        var dbUserManage = {};

        // 리스트
        dbUserManage.getList = function (obj) {
            var deferred = $q.defer();

            $http({
                    method: 'post',
                    url: '/dbUserManage/getList',
                    data: obj
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );

            return deferred.promise;
        };

        // 하나
        dbUserManage.getOne = function (_id) {
            var deferred = $q.defer();

            $http({
                    method: 'post',
                    url: '/dbUserManage/getOne',
                    data: {id: _id}
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );

            return deferred.promise;
        };

        // 삽입
        dbUserManage.insert = function (obj) {
            var deferred = $q.defer();

            $http({
                    method: 'post',
                    url: '/dbUserManage/insert',
                    data: obj
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );

            return deferred.promise;
        };

        // 상태 수정
        dbUserManage.updateState = function (obj) {
            var deferred = $q.defer();
            //data.state, data.operator, data.id

            $http({
                    method: 'post',
                    url: '/dbUserManage/updateState',
                    data: obj
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );

            return deferred.promise;
        };

        // 수정
        dbUserManage.update = function (obj) {
            var deferred = $q.defer();

            $http({
                    method: 'post',
                    url: '/dbUserManage/update',
                    data: obj
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );

            return deferred.promise;
        };

        return dbUserManage;
    });
