/**
 * Created by BLKNABI on 2014-08-14.
 */
'use strict';

angular.module('gntelCqmsApp')
    .factory('dbCode', function ($http, $q) {
        var dbCode = {};

        // 리스트
        dbCode.getStatus = function () {
            var deferred = $q.defer();

            $http({
                    method: 'post',
                    url: '/dbCode/getStatus'
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );

            return deferred.promise;
        };

        return dbCode;
    });
