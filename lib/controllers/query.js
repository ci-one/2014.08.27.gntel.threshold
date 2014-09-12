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
//이용자등록-소스등록 소스리스트 획득
exports.getSource = 'select m.org_code, m.org_name, s.source_code from t_m_organization m, t_d_source s where m.org_code=s.org_code and m.is_delete is null and s.is_delete is null;';
//이용자등록-소스등록 소스삽입
exports.insertSource ='insert into t_d_source values(?,?,null);';
//이용자등록-소스등록 소스삭제
exports.deleteSource = "update t_d_source set is_delete='y' where source_code=?";
//이용자등록-타겟등록 타겟리스트 획득
exports.getTarget = 'select m.org_code, m.org_name, t.target_code, t.target_name, t.target_notice from t_m_organization m, t_d_target t where m.org_code=t.org_code and m.is_delete is null and t.is_delete is null;';
//이용자등록-타겟등록 타겟삽입
exports.insertTarget ='insert into t_d_target values(?,?,?,?,null);';
//이용자등록-타겟등록 타겟수정
exports.updateTarget = "update t_d_target set org_code=?, target_name=?, target_notice=? where target_code=?;";
//이용자등록-타겟등록 타겟삭제
exports.deleteTarget = "update t_d_target set is_delete='y' where target_code=?";
//이용자등록-담당등록 리스트 획득
exports.getCompMem = "select m.org_name, dep.*, role.*, mem.* from t_c_dep dep, t_c_role role, " +
    "t_m_orgMember mem, t_m_organization m where m.org_code=mem.org_code and dep.dep_code =mem.dep_code and role.role_code=mem.role_code and mem.is_delete is null;";
// 부서 획득
exports.getDeptList = "select * from t_c_dep;";
// 직위 획득
exports.getRoleList = "select * from t_c_role;";
// 부서 등록
exports.insertDept = "set @dep_code = (select lpad(dep_code + 1, 2,'0') from t_c_dep order by dep_code desc limit 1) COLLATE utf8_unicode_ci;" +
    "insert into t_c_dep values(@dep_code,?);";
// 직위 등록
exports.insertRole = "set @role_code = (select lpad(role_code + 1, 2,'0') from t_c_role order by role_code desc limit 1) COLLATE utf8_unicode_ci;" +
    "insert into t_c_role values(@role_code,?);";
// 부서 한개 획득
exports.getDeptOne = "select * from t_c_dep where dep_name=?;";
// 직위 한개 획득
exports.getRoleOne = "select * from t_c_role where role_name=?;";
//이용자등록-담당등록 담당삽입
exports.insertCompMem = "set @mem_code = (select lpad(mem_code + 1, 5,'0') from t_m_orgMember order by mem_code desc limit 1) COLLATE utf8_unicode_ci;" +
    " insert into t_m_orgMember values(@mem_code,?,?,?,?,?,?,?,?,?,null);";
//이용자등록-담당등록 담당수정
exports.updateCompMem = "update t_m_orgMember set org_code=?, mem_name=?, mem_id=?, dep_code=?, role_code=?, mem_tel=?, mem_email=?, mem_notice=?, mem_pswd=? where mem_code=?;";
//이용자등록-담당등록 담당삭제
exports.deleteCompMem = "update t_m_orgMember set is_delete='y' where mem_code=?";
//이용기관시스템등록 리스트 획득
exports.getSysList = 'select m.org_name, s.* from t_m_organization m, t_d_system s where m.org_code=s.org_code and s.is_delete is null and m.is_delete is null;';
//이용기관시스템등록 시스템등록
exports.insertSys = "set @sys_code = (select lpad(sys_code + 1, 2,'0') from t_d_system order by sys_code desc limit 1) COLLATE utf8_unicode_ci;" +
    " insert into t_d_system values(@sys_code,?,?,?,null);";
//이용기관시스템등록 시스템업데이트
exports.updateSys = "update t_d_system set org_code=?,sys_name=?,sys_notice=? where sys_code=?";
//이용기관시스템등록 시스템삭제
exports.deleteSys = "update t_d_system set is_delete='y' where sys_code=?";




//임계치 발생 현황
exports.getOccurList = "select * from d_threshold_occur1;";

// 임계치 발생 현황 차트 수치
exports.getOccurQltCnt = "select qlt_code,count(qlt_Code)'cnt' from d_threshold_occur1 group by qlt_code;";


// 임계치 처리 현황 - 발생현황 리스트 get
exports.getProcessList = "select comLocation,systemName,occurDate,occurName,qLevel,actionInfo,commentSeq from `[temp]process`;";
//임계치 처리 현황 - 발생항목 코멘트 처리 내역 get
exports.getActionList = "select commentContents,occurName,occurValue,occurCount,comLocation,sendDate from `[temp]process`;";

//임계치 품질등록 저장
exports.insertStanReg =  "insert into ch_threshold_action(thrs_item_code,qlt_code) values(?,?);";
//임계치 품질 액션 저장
exports.updateActReg = "update ch_threshold_action set action_code=? where action_seq=?;";

//임계치 기준정보 관리-임계치 품질 등록
exports.getStandardReg ="select t.action_seq, i.thrs_item_name, q.qlt_name from ch_threshold_action t, c_quality_class q, c_threshold_item i where t.qlt_code= q.qlt_code and t.thrs_item_code = i.thrs_item_code;";
//임계치 기준정보 관리 임계치 품질 액션 등록
exports.getActionReg ="select t.action_seq, a.action_name, i.thrs_item_name, q.qlt_name from ch_threshold_action t, c_quality_class q, c_threshold_item i, c_action a where t.qlt_code= q.qlt_code and t.thrs_item_code = i.thrs_item_code and t.action_code =a.action_code;";

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



