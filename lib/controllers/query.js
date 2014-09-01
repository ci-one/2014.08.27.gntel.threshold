/**
 * Created by SimJeongmee on 2014-08-07.
 */

//org_name,city_name,addr_code,org_tel,org_fax,notice

exports.getUseComp = "select * from m_organization where is_delete is null order by org_code;";

exports.insertUseComp = "set @org_code = (select lpad(org_code + 1, 5,'0') from m_organization order by org_code desc limit 1) COLLATE utf8_unicode_ci; insert into m_organization values(@org_code,null,?,?,?,?,?,?,null);";

exports.updateUseComp = "update m_organization set org_name=?, city_name=?, addr_code=?, org_tel=?, org_fax=?, notice=? where org_code=?;";

exports.deleteUseComp = "update m_organization set is_delete='y' where org_code=?;";