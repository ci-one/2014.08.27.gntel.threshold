angular.module('gntelCqmsApp')
    .factory('executeResults', function ($http, $q) {
        var executeResults = {};

        executeResults.getUseComp = function () {
            var deferred = $q.defer();

            $http({
                    method: 'post',
                    url: '/getUseComp'
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );

            return deferred.promise;
        };

        executeResults.insertUseComp = function (inputData) {
            var deferred = $q.defer();

            $http({
                method: 'post',
                url: '/insertUseComp',
                data: inputData
            }).success(function (data) {
                    deferred.resolve(data);
                }
            );
            return deferred.promise;
        };

        executeResults.updateUseComp = function (inputData) {
            var deferred = $q.defer();

            $http({
                method: 'post',
                url: '/updateUseComp',
                data: inputData
            }).success(function (data) {
                    deferred.resolve(data);
                }
            );
            return deferred.promise;
        };

        executeResults.deleteUseComp = function (org_code) {
            var deferred = $q.defer();

            $http({
                method: 'post',
                url: '/deleteUseComp',
                data: {org_code:org_code}
            }).success(function (data) {
                    deferred.resolve(data);
                }
            );
            return deferred.promise;
        };

        //기관맴버 획득
        executeResults.getCompMem = function () {
            var deferred = $q.defer();

            $http({
                    method: 'post',
                    url: '/getCompMem'
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );

            return deferred.promise;
        };




        return executeResults;
    });