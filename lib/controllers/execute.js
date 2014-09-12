/**
 * Created by SimJeongmee on 2014-08-07.
 */

'use strict';

var connect = require('../controllers/dbconnect_v1.01.js');
var query = require('../controllers/query.js');
var fs = require('fs');

var c = connect.connection();

//연결로그 출력
c.on('connect', function () {
    console.log('Client connected');
}).on('error', function (err) {
    console.log('Client error: ' + err);
}).on('close', function (hadError) {
    console.log('Client closed');
});

// 이용기관 획득
exports.getUseComp = function (req, res) {
    var sending = [];
    c.query(query.getUseComp, null)
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

// 이용기관 등록
exports.updatefortest = function (req, res) {
    var org_code = req.body.org_code;
    var field_code = req.body.field_code;
    var system_code = req.body.system_code;
    var source = req.body.source;
    var thrs_item_code = req.body.thrs_item_code;
    var source_name = req.body.source_name;
    var target = req.body.target;
    var target_name = req.body.target_name;
    var value = req.body.value;
    var dulation_sec = req.body.dulation_sec;
console.log(org_code+" "+field_code+" "+system_code+" "+source+" "+thrs_item_code+" "+source_name+" "+target+" "+target_name+" "+value+" "+dulation_sec)

    c.query(query.updatefortest, [org_code, field_code,system_code,source,thrs_item_code,source_name,target,target_name,value,dulation_sec], true)
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};

// 이용기관 등록
exports.insertUseComp = function (req, res) {
    var org_name = req.body.org_name;
    var city_name = req.body.city_name;
    var addr_code = req.body.addr_code;
    var org_tel = req.body.org_tel;
    var org_fax = req.body.org_fax;
    var notice = req.body.notice;

    c.query(query.insertUseComp, [org_name, city_name, addr_code, org_tel, org_fax, notice], true)
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};

// 이용기관 업데이트
exports.updateUseComp = function (req, res) {
    var org_name = req.body.org_name;
    var city_name = req.body.city_name;
    var addr_code = req.body.addr_code;
    var org_tel = req.body.org_tel;
    var org_fax = req.body.org_fax;
    var notice = req.body.notice;
    var org_code = req.body.org_code;

    c.query(query.updateUseComp, [org_name, city_name, addr_code, org_tel, org_fax, notice, org_code])
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};

// 이용기관 삭제
exports.deleteUseComp = function (req, res) {
    var org_code = req.body.org_code;

    c.query(query.deleteUseComp, [org_code])
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};

// 소스 획득
exports.getSource = function (req, res) {
    var sending = [];
    c.query(query.getSource, null)
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

// 소스 등록
exports.insertSource = function (req, res) {
    var org_code = req.body.org_code;
    var source_code = req.body.source_code;
    c.query(query.insertSource, [org_code, source_code], true)
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};

// 소스 삭제
exports.deleteSource = function (req, res) {
    var source_code = req.body.source_code;

    c.query(query.deleteSource, [source_code], true)
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};


// 타겟 획득
exports.getTarget = function (req, res) {
    var sending = [];
    c.query(query.getTarget, null)
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

// 타겟 등록
exports.insertTarget = function (req, res) {
    var org_code = req.body.org_code;
    var target_code = req.body.target_code;
    var target_name = req.body.target_name;
    var target_notice = req.body.target_notice;

    c.query(query.insertTarget, [org_code, target_code, target_name, target_notice], true)
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};

// 타겟 업데이트
exports.updateTarget = function (req, res) {
    var org_code = req.body.org_code;
    var target_name = req.body.target_name;
    var target_notice = req.body.target_notice;
    var target_code = req.body.target_code;

    c.query(query.updateTarget, [org_code, target_name, target_notice, target_code])
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};

// 타겟 삭제
exports.deleteTarget = function (req, res) {
    var target_code = req.body.target_code;

    c.query(query.deleteTarget, [target_code], true)
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};

// 담당 획득
exports.getCompMem = function (req, res) {
    var sending = [];
    c.query(query.getCompMem, null)
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

// 부서 획득
exports.getDept = function (req, res) {
    var sending = [];
    c.query(query.getDeptList, null)
        .on('result', function (res) {
            res.on('row', function (row) {
                sending.push(row);
            });
        }).on('end', function () {
            var obj = {sending: sending};
            if (sending[0] != null) res.send(200, obj);
            else res.send(500, obj);
        });
};

// 직위 획득
exports.getRole = function (req, res) {
    var sending = [];
    c.query(query.getRoleList, null).on('result', function (res) {
        res.on('row', function (row) {
            sending.push(row);
        });
    }).on('end', function () {
        var obj = {sending: sending};
        if (sending[0] != null) res.send(200, obj);
        else res.send(500, obj);
    });
};

// 부서 등록
exports.insertDept = function (req, res) {
    var dep_name = req.body.dep_name;
    c.query(query.insertDept, [dep_name], true)
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            var sending = [];
            c.query(query.getDeptOne, [dep_name]).on('result', function (res) {
                res.on('row', function (row) {
                    sending.push(row);
                });
            }).on('end', function () {
                var obj = {sending: sending};
                if (sending[0] != null) res.send(200, obj);
                else res.send(500, obj);
            });
        });
};
// 직위 등록
exports.insertRole = function (req, res) {
    var role_name = req.body.role_name;
    c.query(query.insertRole, [role_name], true)
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            var sending = [];
            c.query(query.getRoleOne, [role_name]).on('result', function (res) {
                res.on('row', function (row) {
                    sending.push(row);
                });
            }).on('end', function () {
                var obj = {sending: sending};
                if (sending[0] != null) res.send(200, obj);
                else res.send(500, obj);
            });
        });
};
//부서 한개 가져오기
exports.getDeptOne = function(req,res){
    var dep_name = req.body.dep_name;
    console.log(dep_name);
    var sending = [];
    c.query(query.getDeptOne, [dep_name]).on('result', function (res) {
        res.on('row', function (row) {
            sending.push(row);
        });
    }).on('end', function () {
        var obj = {sending: sending};
        if (sending[0] != null) res.send(200, obj);
        else res.send(500, obj);
    });
};
//직위 한개 가져오기
exports.getRoleOne = function(req,res){
    var role_name = req.body.role_name;
    console.log(role_name);
    var sending = [];
    c.query(query.getRoleOne, [role_name]).on('result', function (res) {
        res.on('row', function (row) {
            sending.push(row);
        });
    }).on('end', function () {
        var obj = {sending: sending};
        if (sending[0] != null) res.send(200, obj);
        else res.send(500, obj);
    });
}

// 담당 등록
exports.insertCompMem = function (req, res) {
    var org_code = req.body.org_code;
    var mem_name = req.body.mem_name;
    var mem_id = req.body.mem_id;
    var dep_code = req.body.dep_code;
    var role_code = req.body.role_code;
    var mem_tel = req.body.mem_tel;
    var mem_email = req.body.mem_email;
    var mem_notice = req.body.mem_notice;
    var mem_pswd = req.body.mem_pswd;

    c.query(query.insertCompMem, [org_code, mem_name, mem_id, dep_code, role_code, mem_tel, mem_email, mem_notice, mem_pswd], true)
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};

// 담당 업데이트
exports.updateCompMem = function (req, res) {
    var org_code = req.body.org_code;
    var mem_name = req.body.mem_name;
    var mem_id = req.body.mem_id;
    var dep_code = req.body.dep_code;
    var role_code = req.body.role_code;
    var mem_tel = req.body.mem_tel;
    var mem_email = req.body.mem_email;
    var mem_notice = req.body.mem_notice;
    var mem_pswd = req.body.mem_pswd;
    var mem_code = req.body.mem_code;


    c.query(query.updateCompMem, [org_code, mem_name, mem_id, dep_code, role_code, mem_tel, mem_email, mem_notice, mem_pswd, mem_code])
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};

// 담당 삭제
exports.deleteCompMem = function (req, res) {
    var mem_code = req.body.mem_code;

    c.query(query.deleteCompMem, [mem_code], true)
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};

// 시스템 획득
exports.getSysList = function (req, res) {
    var sending = [];
    c.query(query.getSysList, null)
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

// 시스템 등록
exports.insertSys = function (req, res) {
    var org_code = req.body.org_code;
    var sys_name = req.body.sys_name;
    var sys_notice = req.body.sys_notice;

    c.query(query.insertSys, [org_code,sys_name,sys_notice], true)
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};

// 시스템 업데이트
exports.updateSys = function (req, res) {
    var org_code = req.body.org_code;
    var sys_name = req.body.sys_name;
    var sys_notice = req.body.sys_notice;
    var sys_code = req.body.sys_code;

    c.query(query.updateSys, [org_code,sys_name,sys_notice,sys_code])
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};

// 시스템 삭제
exports.deleteSys = function (req, res) {
    var org_code = req.body.org_code;

    c.query(query.deleteSys, [sys_code])
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};

// 액션코멘트관리 등록현황 획득
exports.actList = function (req, res) {
    var sending = [];
    c.query(query.actList, null)
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
//액션코멘트관리 액션코멘트 등록현황 획득
exports.actedList = function (req, res) {
    var sending = [];
    c.query(query.actedList, null)
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
//액션코멘트관리 데이타 획득
exports.actData = function (req, res) {
    var sending = [];
    c.query(query.actData, null)
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

//액션코멘트 등록
exports.insertAct = function (req, res) {
    var kind = req.body.kind;
    var qlevel = req.body.qlevel;
    var comm_type = req.body.comm_type;
    var comm_file = req.body.comm_file;
    var comm_notice = req.body.comm_notice;

    c.query(query.insertAct, [kind,qlevel,comm_type,comm_file,comm_notice])
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};

//액션코멘트 업뎃
exports.updateAct = function (req, res) {
    var comm_type = req.body.comm_type;
    var comm_file = req.body.comm_file;
    var comm_notice = req.body.comm_notice;
    var kind = req.body.kind;
    var qlevel = req.body.qlevel;

    c.query(query.updateAct, [comm_type,comm_file,comm_notice,kind,qlevel])
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};

exports.insertF = function (req, res) {
    var file = req.files.file;
    console.log(file);
    var dir = '.\\app\\docu\\';
    var name = new Date().getTime()+file.name;

        fs.readFile(file.path,function(error,data){
            fs.writeFile(dir+name,data,function(error){
                if(error){
                    throw error
                }
                res.send(name);
            });
        });
};

//액션코멘트 삭제
exports.deleteAct = function (req, res) {
    var kind = req.body.kind;
    var qlevel = req.body.qlevel;

    c.query(query.deleteAct, [kind,qlevel])
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};


//채영범 사원 TEST 코딩

exports.getOccurList = function (req, res) {
    var sending = [];
    c.query(query.getOccurList)
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


exports.getOccurQltCnt = function (req, res) {
    var sending = [];

    c.query(query.getOccurQltCnt)
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

exports.insertStanRegItem = function (req, res) {
    /*   var qlt_code = req.body.qlt_code;
     var thrs_item_name = req.body.item_name;*/

    c.query(query.insertStanRegItem, [thrs_item_name], true)
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};
exports.insertStanReg = function (req, res) {
    var qlt_code = req.body.qlt_code;
    var thrs_item_code = req.body.item_code;
    console.log(qlt_code + "why?" + thrs_item_code);

    c.query(query.insertStanReg, [thrs_item_code,qlt_code])
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};

exports.updateActReg = function (req, res) {
    var action_seq =parseInt(req.body.action_seq);
    var action_code = req.body.action_code;

    console.log(action_seq + "why?" + action_code);

    c.query(query.updateActReg, [action_code, action_seq])
        .on('result', function (res) {
            res.on('row', function () {
            });
        })
        .on('end', function () {
            res.send(200);
        });
};


exports.getQltClassList = function (req, res) {
    var sending = [];
    c.query(query.getQltClassList)
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


// 임계치 처리 현황 - 발생현황 리스트 get
exports.getProcessList = function (req, res) {
    var sending = [];

    c.query(query.getProcessList, null)
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
//임계치 처리 현황 - 발생항목 코멘트 처리 내역 get
exports.getActionList = function (req, res) {
    var sending = [];

    c.query(query.getActionList, null)
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

exports.getStandardReg = function (req, res) {
    var sending = [];
    c.query(query.getStandardReg)
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

exports.getActionReg = function (req, res) {
    var sending = [];
    c.query(query.getActionReg)
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

exports.getActionRegList = function (req, res) {
    var sending = [];
    c.query(query.getActionRegList)
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

exports.getDetailReg = function (req, res) {
    var sending = [];

    c.query(query.getDetailReg)
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