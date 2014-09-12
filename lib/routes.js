'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    execute = require('./controllers/execute');
var methodOverride = require('method-override');
var multipart = require('connect-multiparty');
var bodyParser = require('body-parser');
    var xlsx = require('node-xlsx');
    var fs = require('fs');

/**
 * Application routes
 */
module.exports = function (app) {

    app.use(bodyParser());
    app.use(multipart());
    app.use(methodOverride());


    app.route('/abcd')
        .post(function (req, res) {

            var itemList = req.body.itemList;

            var buffer = xlsx.build({worksheets: [
                {"name": "TestColumn", "data": itemList}
            ]});
            fs.writeFileSync('app/docu/saved' + 'abcd.xlsx', buffer, 'binary');

            res.send(200);


        });

    app.route('/test')
        .post(execute.updatefortest);


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

    //시스템등록 관련
    app.route('/getSysList')
        .post(execute.getSysList);
    app.route('/insertSys')
        .post(execute.insertSys);
    app.route('/updateSys')
        .post(execute.updateSys);
    app.route('/deleteSys')
        .post(execute.deleteSys);

    //액션코멘트 등록 관련
    app.route('/actList')
        .post(execute.actList);
    app.route('/actedList')
        .post(execute.actedList);
    app.route('/actData')
        .post(execute.actData);
    app.route('/insertAct')
        .post(execute.insertAct);
    app.route('/updateAct')
        .post(execute.updateAct);
    app.route('/deleteAct')
        .post(execute.deleteAct);

    app.post('/uploadFile', execute.insertF);
    //임계치 처리 현황 - 임계치 처리 현황리스트 get
    app.route('/getProcessList')
        .post(execute.getProcessList);
    //임계치 처리 현황 - 발생항목 코멘트 처리 내역 get
    app.route('/getActionList')
        .post(execute.getActionList);


    //임계치 품질 등록
    app.route('/insertStanReg')
        .post(execute.insertStanReg);

    //임계치 품질 액션등록
    app.route('/updateActReg')
        .post(execute.updateActReg);

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

    app.route('/*')
        .get(index.index);

    // Server API Routes
    app.route('/api/awesomeThings')
        .get(api.awesomeThings);

    app.route('/partials/*')
        .get(index.partials);

    // All undefined api routes should return a 404
    app.route('/api/*')
        .get(function (req, res) {
            res.send(404);
        });

};