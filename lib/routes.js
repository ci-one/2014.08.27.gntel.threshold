'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    execute = require('./controllers/execute');

/**
 * Application routes
 */
module.exports = function (app) {

    // Server API Routes
    app.route('/api/awesomeThings')
        .get(api.awesomeThings);


    // All undefined api routes should return a 404
    app.route('/api/*')
        .get(function (req, res) {
            res.send(404);
        });

    // All other routes to use Angular routing in app/scripts/app.js
    app.route('/partials/*')
        .get(index.partials);
    app.route('/*')
        .get(index.index);

    //이용기관 관련
    app.route('/getUseComp')
        .post(execute.getUseComp);

    app.route('/insertUseComp')
        .post(execute.insertUseComp);

    app.route('/updateUseComp')
        .post(execute.updateUseComp);

    app.route('/deleteUseComp')
        .post(execute.deleteUseComp);

    //소스등록 관련
    app.route('/getSource')
        .post(execute.getSource);

    app.route('/insertSource')
        .post(execute.insertSource);

    app.route('/deleteSource')
        .post(execute.deleteSource);

    //타겟등록 관련
    app.route('/getTarget')
        .post(execute.getTarget);

    app.route('/insertTarget')
        .post(execute.insertTarget);

    app.route('/updateTarget')
        .post(execute.updateTarget);

    app.route('/deleteTarget')
        .post(execute.deleteTarget);

    //담당등록 관련
    app.route('/getCompMem')
        .post(execute.getCompMem);
    app.route('/getDept')
        .post(execute.getDept);
    app.route('/getRole')
        .post(execute.getRole);
    app.route('/insertDept')
        .post(execute.insertDept);
    app.route('/insertRole')
        .post(execute.insertRole);
    app.route('/getDepOne')
        .post(execute.getDeptOne);
    app.route('/getRoleOne')
        .post(execute.getRoleOne);
    app.route('/insertCompMem')
        .post(execute.insertCompMem);
    app.route('/updateCompMem')
        .post(execute.updateCompMem);
    app.route('/deleteCompMem')
        .post(execute.deleteCompMem);



    //임계치 처리 현황 - 임계치 처리 현황리스트 get
    app.route('/getProcessList')
        .post(execute.getProcessList);
    //임계치 처리 현황 - 발생항목 코멘트 처리 내역 get
    app.route('/getActionList')
        .post(execute.getActionList);



    //채영범 사원 TEST 프로그래밍
    app.route('/insertStanRegItem')
        .post(execute.insertStanRegItem);

    app.route('/insertStanReg')
        .post(execute.insertStanReg);


    app.route('/getQltClassList')
        .post(execute.getQltClassList);

    //임계치 발생 현황
    app.route('/getOccurList')
        .post(execute.getOccurList);
    //임계치 차트 수치
    app.route('/getOccurQltCnt')
        .post(execute.getOccurQltCnt);
    //임계치 기준정보 관리-임계치 품질 등록

    app.route('/getStandardReg')
        .post(execute.getStandardReg);
    //임계치 기준정보 관리 임계치 품질 액션 등록
    app.route('/getActionReg')
        .post(execute.getActionReg);
    //임계치 기준정보 관리 임계치 품질 액션 등록,수정,삭제 현황
    app.route('/getActionRegList')
        .post(execute.getActionRegList);
    //임계치 기준정보 관리 임계치 상세 기준 항목
    app.route('/getDetailReg')
        .post(execute.getDetailReg);

    //이용기관담당 관련
    app.route('/getCompMem')
        .post(execute.getCompMem);

};