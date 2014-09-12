
angular.module('gntelCqmsApp')
    .factory('executeResults', function ($http, $q) {
        var executeResults = {};

        //이용기관 등록 관련
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


        //소스 등록 관련
        executeResults.getSource = function () {
            var deferred = $q.defer();

            $http({
                    method: 'post',
                    url: '/getSource'
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );

            return deferred.promise;
        };

        executeResults.insertSource = function (inputData) {
            var deferred = $q.defer();

            $http({
                method: 'post',
                url: '/insertSource',
                data: inputData
            }).success(function (data) {
                    deferred.resolve(data);
                }
            );
            return deferred.promise;
        };

        executeResults.deleteSource = function (source_code) {
            var deferred = $q.defer();

            $http({
                method: 'post',
                url: '/deleteSource',
                data: {source_code: source_code}
            }).success(function (data) {
                    deferred.resolve(data);

                }
            );
            return deferred.promise;
        };


        //타겟 등록 관련
        executeResults.getTarget = function () {
            var deferred = $q.defer();

            $http({
                    method: 'post',
                    url: '/getTarget'
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );

            return deferred.promise;
        };

        executeResults.insertTarget = function (inputData) {
            var deferred = $q.defer();

            $http({
                method: 'post',
                url: '/insertTarget',
                data: inputData
            }).success(function (data) {
                    deferred.resolve(data);
                }
            );
            return deferred.promise;
        };

        executeResults.updateTarget = function (inputData) {
            var deferred = $q.defer();

            $http({
                method: 'post',
                url: '/updateTarget',
                data: inputData
            }).success(function (data) {
                    deferred.resolve(data);
                }
            );
            return deferred.promise;
        };

        executeResults.deleteTarget = function (target_code) {
            var deferred = $q.defer();

            $http({
                method: 'post',
                url: '/deleteTarget',
                data: {target_code: target_code}
            }).success(function (data) {
                    deferred.resolve(data);

                }
            );
            return deferred.promise;
        };

        //담당 등록 관련
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
        executeResults.getDept = function () {
            var deferred = $q.defer();
            $http({
                    method: 'post',
                    url: '/getDept'
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );
            return deferred.promise;
        };
        executeResults.getRole = function () {
            var deferred = $q.defer();
            $http({
                    method: 'post',
                    url: '/getRole'
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );
            return deferred.promise;
        };
        executeResults.insertDept = function (dep_name) {
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: '/insertDept',
                data: {dep_name: dep_name}
            }).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );
            return deferred.promise;
        };
        executeResults.insertRole = function (role_name) {
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: '/insertRole',
                data: {role_name: role_name}
            }).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );
            return deferred.promise;
        };

        executeResults.getDepOne = function (dep_name) {
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: '/getDepOne',
                data: {dep_name: dep_name}
            }).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );
            return deferred.promise;
        };
        executeResults.getRoleOne = function (role_name) {
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: '/getRoleOne',
                data: {role_name: role_name}
            }).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );
            return deferred.promise;
        };

        executeResults.insertCompMem = function (inputData) {
            var deferred = $q.defer();
            $http({
                method: 'post',
                url: '/insertCompMem',
                data: inputData
            }).success(function (data) {
                    deferred.resolve(data);
                }
            );
            return deferred.promise;
        };
        executeResults.updateCompMem = function (inputData) {
            var deferred = $q.defer();

            $http({
                method: 'post',
                url: '/updateCompMem',
                data: inputData
            }).success(function (data) {
                    deferred.resolve(data);
                }
            );
            return deferred.promise;
        };
        executeResults.deleteCompMem = function (mem_code) {
            var deferred = $q.defer();

            $http({
                method: 'post',
                url: '/deleteCompMem',
                data: {mem_code: mem_code}
            }).success(function (data) {
                    deferred.resolve(data);

                }
            );
            return deferred.promise;
        };

//시스템 등록 관련
        executeResults.getSysList = function () {
            var deferred = $q.defer();

            $http({
                    method: 'post',
                    url: '/getSysList'
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                }
            );

            return deferred.promise;
        };

        executeResults.insertSys = function (inputData) {
            var deferred = $q.defer();

            $http({
                method: 'post',
                url: '/insertSys',
                data: inputData
            }).success(function (data) {
                    deferred.resolve(data);
                }
            );
            return deferred.promise;
        };

        executeResults.updateSys = function (inputData) {
            var deferred = $q.defer();

            $http({
                method: 'post',
                url: '/updateSys',
                data: inputData
            }).success(function (data) {
                    deferred.resolve(data);
                }
            );
            return deferred.promise;
        };

        executeResults.deleteSys = function (sys_code) {
            var deferred = $q.defer();

            $http({
                method: 'post',
                url: '/deleteSys',
                data: {sys_code: sys_code}
            }).success(function (data) {
                    deferred.resolve(data);

                }
            );
            return deferred.promise;
        };


        //채영범 사원원 TEST 프로그래밍
        executeResults.insertStanRegItem = function (inputData) {
            var deferred = $q.defer();

            $http({
                method: 'post',
                url: '/insertStanRegItem',
                data: inputData
            }).success(function (data) {
                    deferred.resolve(data);
                }
            );
            return deferred.promise;
        };
        executeResults.insertStanReg = function (inputData) {
            var deferred = $q.defer();

            $http({
                method: 'post',
                url: '/insertStanReg',
                data: inputData
            }).success(function (data) {
                    deferred.resolve(data);
                }
            );
            return deferred.promise;
        };

        executeResults.updateActReg = function (action_seq, action_code) {
            var deferred = $q.defer();

            $http({
                method: 'post',
                url: '/updateActReg',
                data: {action_code:action_code,action_seq:action_seq}
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
        //임계치 기준정보 관리-임계치 품질 등록
        executeResults.getStandardReg = function () {
            var deferred = $q.defer();

            $http({
                    method: 'post',
                    url: '/getStandardReg'
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                    console.log(data)
                }
            );

            return deferred.promise;
        };
        executeResults.getActionReg = function () {
            var deferred = $q.defer();

            $http({
                    method: 'post',
                    url: '/getActionReg'
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                    console.log("getActionReg")
                }
            );
            return deferred.promise;
        };
        executeResults.getActionRegList = function () {
            var deferred = $q.defer();

            $http({
                    method: 'post',
                    url: '/getActionRegList'
                }
            ).success(function (data) {
                    deferred.resolve(data.sending)
                    console.log("getActionRegList")
                }
            );
            return deferred.promise;
        };
        executeResults.getDetailReg = function () {
            var deferred = $q.defer();

            $http({
                    method: 'post',
                    url: '/getDetailReg'
                }
            ).success(function (data) {
                    deferred.resolve(data.sending);
                    console.log("getDetailReg")
                }
            );
            return deferred.promise;
        };
        return executeResults;
    });