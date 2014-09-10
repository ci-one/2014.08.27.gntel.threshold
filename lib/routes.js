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

    //임계치 처리 현황 - 임계치 처리 현황리스트 get
    app.route('/getProcessList')
        .post(execute.getProcessList);
    //임계치 처리 현황 - 발생항목 코멘트 처리 내역 get
    app.route('/getActionList')
        .post(execute.getActionList);

    app.route('/insertUseComp')
        .post(execute.insertUseComp);

    app.route('/updateUseComp')
        .post(execute.updateUseComp);

    app.route('/deleteUseComp')
        .post(execute.deleteUseComp);


    //채영범 사원 TEST 프로그래밍
    app.route('/insertQltClass')
        .post(execute.insertQltClass);

    app.route('/getQltClassList')
        .post(execute.getQltClassList);


    //채영범 9/10일자
    app.route('/getOccurList')
        .post(execute.getOccurList);




    //이용기관담당 관련
    app.route('/getCompMem')
        .post(execute.getCompMem);

};