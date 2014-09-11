/**
 * Created by SimJeongmee on 2014-08-07.
 */

//org_name,city_name,addr_code,org_tel,org_fax,notice

//이용자등록-이용기관등록 리스트 획득
exports.getUseComp = "select * from t_m_organization where is_delete is null order by org_code;";
//이용자등록-이용기관등록 기관추가
exports.insertUseComp = "set @org_code = (select lpad(org_code + 1, 5,'0') from t_m_organization order by org_code desc limit 1) COLLATE utf8_unicode_ci; " +
    "insert into t_m_organization values(@org_code,null,?,?,?,?,?,?,null);";
//이용자등록-이용기관등록 기관수정
exports.updateUseComp = "update t_m_organization set org_name=?, city_name=?, addr_code=?, org_tel=?, org_fax=?, notice=? where org_code=?;";
//이용자등록-이용기관등록 기관삭제
exports.deleteUseComp = "update m_organization set is_delete='y' where org_code=?;";



exports.insertStanRegItem = "set @thrs_item_code = (select lpad(thrs_item_code + 1, 5,'0') from c_threshold_item order by thrs_item_code desc limit 1) COLLATE utf8_unicode_ci; " +
    "insert into c_threshold_item values(@thrs_item_code,?,null);";
exports.insertStanReg =  "insert into item values(?,?);";

exports.getQltClassList = "select * from c_quality_class;";

//임계치 발생 현황
exports.getOccurList = "select * from d_threshold_occur1;";

// 임계치 발생 현황 차트 수치
exports.getOccurQltCnt = "select qlt_code,count(qlt_Code)'cnt' from d_threshold_occur1 group by qlt_code;";

//이용기관 담당 등록
exports.getCompMem = "select dep.*, role.*, mem.* from t_c_dep dep, t_c_role role, " +
    "t_m_orgMember mem where dep.dep_code =mem.dep_code and role.role_code=mem.role_code and mem.org_code='00001' and mem.is_delete is null;";



// 임계치 처리 현황 - 발생현황 리스트 get
exports.getProcessList = "select comLocation,systemName,occurDate,occurName,qLevel,actionInfo,commentSeq from `[temp]process`;";
//임계치 처리 현황 - 발생항목 코멘트 처리 내역 get
exports.getActionList = "select commentContents,occurName,occurValue,occurCount,comLocation,sendDate from `[temp]process`;";



//임계치 기준정보 관리-임계치 품질 등록
exports.getStandardReg = "select i.thrs_item_name, q.qlt_name from item i, c_quality_class q where i.qlt_code= q.qlt_code;";
//임계치 기준정보 관리 임계치 품질 액션 등록
exports.getActionReg = "select * from c_quality_class;";
//임계치 기준정보 관리 임계치 품질 액션 등록,수정,삭제 현황
exports.getActionRegList = "select * from c_quality_class;";
//임계치 기준정보 관리 임계치 상세 기준 항목
exports.getDetailReg = "select * from c_quality_class;";
/*
//임계치 기준정보 관리-임계치 품질 삭제
exports.deleteStandardReg = "delete";
//임계치 기준정보 관리 임계치 품질 액션 삭제
exports.deleteActionReg = "delete";
//임계치 기준정보 관리 임계치 상세 기준 항목 삭제
exports.deleteDetailReg = "delete";*/



