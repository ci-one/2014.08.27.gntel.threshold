/**
 * Created by SimJeongmee on 2014-08-07.
 */

//org_name,city_name,addr_code,org_tel,org_fax,notice

exports.getUseComp = "select * from t_m_organization where is_delete is null order by org_code;";

exports.insertUseComp = "set @org_code = (select lpad(org_code + 1, 5,'0') from t_m_organization order by org_code desc limit 1) COLLATE utf8_unicode_ci; insert into t_m_organization values(@org_code,null,?,?,?,?,?,?,null);";

exports.updateUseComp = "update t_m_organization set org_name=?, city_name=?, addr_code=?, org_tel=?, org_fax=?, notice=? where org_code=?;";

exports.deleteUseComp = "update m_organization set is_delete='y' where org_code=?;";


exports.insertQltClass = "insert into c_quality_class values(?,?,null);";

exports.getQltClassList = "select * from c_quality_class;";exports.deleteUseComp = "update t_m_organization set is_delete='y' where org_code=?;";


//이용기관 담당 등록
exports.getCompMem = "select dep.*, role.*, mem.* from t_c_dep dep, t_c_role role, " +
    "t_m_orgMember mem where dep.dep_code =mem.dep_code and role.role_code=mem.role_code and mem.org_code='00001' and mem.is_delete is null;";