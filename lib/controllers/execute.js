/**
 * Created by SimJeongmee on 2014-08-07.
 */

'use strict';

var connect = require('../controllers/dbconnect_v1.01.js');
var query = require('../controllers/query.js');

var c = connect.connection();

//연결로그 출력
c.on('connect', function () {
    console.log('Client connected');
}).on('error', function (err) {
    console.log('Client error: ' + err);
}).on('close', function (hadError) {
    console.log('Client closed');
});

exports.dbUserManage = {getList: null, getOne: null, insert: null, update: null};
exports.dbUserOrg = {getList: null, getOne: null, insert: null, update: null};
exports.dbCode = {getStatus: null};

// 이용자 관리 - 목록
exports.dbUserManage.getList = function (req, res) {
    var sending = [];

    console.log(req.body);

    c.query(query.dbUserManage.getList, req.body)
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};
            res.send(200, obj);
        });
};

// 이용자 관리 - 하나
exports.dbUserManage.getOne = function (req, res) {
    var id = req.body.id;
    var sending = [];

    c.query(query.dbUserManage.getOne, [ id ])
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                res.send(500, obj);
        });
};

// 이용자 관리 - 추가
exports.dbUserManage.insert = function (req, res) {
    var inputData = req.body;
    var sending = [];

    c.query(query.dbUserManage.insert, inputData)
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                res.send(500, obj);
        });
};

// 이용자 관리 - 상태 수정
exports.dbUserManage.updateState = function (req, res) {
    var data = req.body;
    var sending = [];

    //data.state, data.operator, data.id

    c.query(query.dbUserManage.updateState, data)
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                res.send(500, obj);
        });
};

// 이용자 관리 - 수정
exports.dbUserManage.update = function (req, res) {
    var inputData = req.body;
    var sending = [];

    c.query(query.dbUserManage.update, inputData)
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                res.send(500, obj);
        });
};

// 접속 현황 : 목록
exports.dbUserAccessList = function (req, res) {
    var search = req.body;
    var sending = [];

    //search.dutyname & search.memberid & search.start & search.end
    //start = none:'00000000'
    //end = none:'99999999'
    if (!search.start)
        search.start = '00000000';
    if (!search.end)
        search.end = '99999999';

    console.log(search);

    c.query(query.dbUserAccessList, search)
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};
            res.send(200, obj);
        });
};

// 이용기관 - 목록
exports.dbUserOrg.getList = function (req, res) {
    var sending = [];

    console.log(req.body);

    c.query(query.dbUserOrg.getList, req.body)
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};
            res.send(200, obj);
        });
};

// 이용기관 - 하나
exports.dbUserOrg.getOne = function (req, res) {
    var id = req.body.id;
    var sending = [];

    c.query(query.dbUserOrg.getOne, [ id ])
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                res.send(500, obj);
        });
};

// 이용기관 - 추가
exports.dbUserOrg.insert = function (req, res) {
    var inputData = req.body;
    var sending = [];
    //:orgname, :useyn, :managertel, :managername

    console.log(inputData);

    c.query(query.dbUserOrg.insert, inputData)
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};
            res.send(200, obj);
        });
};

// 이용기관 - 수정
exports.dbUserOrg.update = function (req, res) {
    var inputData = req.body;
    var sending = [];
    //:orgname, :useyn, :managertel, :managername

    console.log(inputData);

    c.query(query.dbUserOrg.update, inputData)
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};
            res.send(200, obj);
        });
};

// 코드 : 상태 목록
exports.dbCode.getStatus = function (req, res) {
    var sending = [];

    c.query(query.dbCode.getStatus, null)
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        })
        .on('end', function () {
            var obj = {sending: sending};

            if (sending[0] != null)
                res.send(200, obj);
            else
                res.send(500, obj);
        });
};