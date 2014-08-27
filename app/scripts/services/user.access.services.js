/**
 * Created by SimJeongmee on 2014-08-19.
 */
'use strict';

angular.module('gntelCqmsApp')
    .factory('dbUserAccess', function ($http, $q) {
        var dbUserAccess = {};

        // 리스트
        // : obj = search
        // search.start & search.end 각각 .replace('-','')
        dbUserAccess.getList = function (obj) {
            var deferred = $q.defer();

            $http({
                    method: 'post',
                    url: '/dbUserAccessList',
                    data: obj
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );

            return deferred.promise;
        };

        return dbUserAccess;
    });

