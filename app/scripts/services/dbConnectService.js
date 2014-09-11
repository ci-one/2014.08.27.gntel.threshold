
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
                data: {org_code: org_code}
            }).success(function (data) {
                    deferred.resolve(data);

                }
            );
            return deferred.promise;
        };


        //채영범 사원원 TEST 프로그래밍
        executeResults.insertQltClass = function (inputData) {
            var deferred = $q.defer();

            $http({
                method: 'post',
                url: '/insertQltClass',
                data: inputData
            }).success(function (data) {
                    deferred.resolve(data);
                }
            );
            return deferred.promise;
        };

        executeResults.getQltClassList = function () {
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: '/getQltClassList'
            }).success(function (data) {
                    deferred.resolve(data.sending);


                }
            );
            return deferred.promise;
        };

       executeResults.getOccurList = function () {
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: '/getOccurList'
            }).success(function (data) {
                    deferred.resolve(data.sending);
                 /*   for (var i = 0; i < data.sending.length; i++) {
                        console.log("getOccurList 데이터3" + i + " : " + data.sending[i].system_code + data.sending[i].qlt_code + data.sending[i].action_seq);
                    }*/

                }
            );
            return deferred.promise;
        };


        executeResults.getOccurQltCnt = function () {
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: '/getOccurQltCnt'
            }).success(function (data) {
                    deferred.resolve(data.sending);
                    for (var i = 0; i < data.sending.length; i++) {
                        console.log("getOccurList 데이터" + i + " : " + data.sending[i].qlt_code +" 카운트"+data.sending[i].cnt);
                    }
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


        // 임계치 처리현황 - 임계치 처리현황 리스트
        executeResults.getProcessList = function () {
            var deferred = $q.defer();

            $http({
                    method: 'post',
                    url: '/getProcessList'
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );

            return deferred.promise;
        };

        // 임계치 처리현황 - 발생항목 코멘트 처리내역 리스트 get
        executeResults.getActionList = function () {
            var deferred = $q.defer();

            $http({
                    method: 'post',
                    url: '/getActionList'
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );

            return deferred.promise;
        };


        return executeResults;
    });