/**
 * Created by SimJeongmee on 2014-08-07.
 */

exports.dbUserManage = {getList:"", getOne:"", insert:"", approval:"", update:""};
exports.dbUserManage.getList = "select mas_memberid.*, A.value as org, B.value as state" +
                                "   , (DATE_FORMAT(mas_memberid.joindate, '%Y-%m-%d %H:%i')) as joindate" +
                                " from mas_memberid" +
                                " left outer join mas_com_code as A" +
                                " 	on A.code = mas_memberid.useorg" +
                                " 		and A.code_id = 'USEORG'" +
                                " left outer join mas_com_code as B" +
                                " 	on B.code = mas_memberid.status" +
                                " 		and B.code_id = 'STATUS'" +
                                " where mas_memberid.gubun <> '1'" +
                                "   and A.value like concat('%',:org,'%')" +
                                "   and mas_memberid.dutyname like concat('%',:dutyname,'%')" +
                                "   and mas_memberid.memberid like concat('%',:memberid,'%')" +
                                "   and mas_memberid.mobile like concat('%',:mobile,'%')" +
                                "   and mas_memberid.joindate like concat('%',:joindatef,'%')" +
                                " order by mas_memberid.memberid;";
exports.dbUserManage.getOne = "select mas_memberid.*, A.value as org, B.value as state" +
                                "   , (DATE_FORMAT(mas_memberid.joindate, '%Y-%m-%d %H:%i')) as joindate" +
                                " from mas_memberid" +
                                " left outer join mas_com_code as A" +
                                " 	on A.code = mas_memberid.useorg" +
                                " 		and A.code_id = 'USEORG'" +
                                " left outer join mas_com_code as B" +
                                " 	on B.code = mas_memberid.status" +
                                " 		and B.code_id = 'STATUS'" +
                                " where mas_memberid.gubun <> '1'" +
                                "   and mas_memberid.memberid = :id" +
                                " order by mas_memberid.memberid;";
exports.dbUserManage.insert = "insert into mas_memberid(memberid/*id*/, passwd/*pw*/" +
                                " 	, dutyname/*name*/" +
                                " 	, comtel/*tel*/, comfax/*fax*/, emailid/*email*/, mobile/*hp*/" +
                                " 	, department/*dept*/, positioncode/*position*/" +
                                " 	, joindate, gubun/*1:admin, 3:user*/" +
                                " 	, useorg" +
                                " 	, rights, status)" +
                                " values(:id, :pw" +
                                " 	, :name" +
                                " 	, :tel, :fax, :email, :hp" +
                                " 	, :dept, :pos" +
                                " 	, DATE_FORMAT(NOW(), '%Y%m%d%H%i%s'), '3'" +
                                " 	, :org" +
                                " 	, '', '1');";
exports.dbUserManage.updateState = "update mas_memberid" +
                                " set status = :state" +
                                " 	, operator = :operator" +
                                " 	, appdate = DATE_FORMAT(NOW(), '%Y%m%d%H%i%s')" +
                                " where mas_memberid.memberid = :id;";
exports.dbUserManage.update = "update mas_memberid" +
                                " set passwd = :pw/*pw*/" +
                                " 	, dutyname = :name/*name*/" +
                                " 	, comtel = :tel/*tel*/" +
                                " 	, comfax = :fax/*fax*/" +
                                " 	, emailid = :email/*email*/" +
                                " 	, mobile = :hp/*hp*/" +
                                " 	, department = :dept/*dept*/" +
                                " 	, positioncode = :pos/*position*/" +
                                " where mas_memberid.memberid = :id";

//search.dutyname & search.memberid & search.start & search.end
exports.dbUserAccessList = "select" + 
                            " m.dutyname," +
                            "     s.memberid," +
                            "     concat_ws(" +
                            "         ' ~ '," +
                            "         date_format(s.usefrom, '%Y-%m-%d')," +
                            " case when s.useto like '999' then '현재' else date_format(s.useto, '%Y-%m-%d') end" +
                            " ) as useperiod," +
                            "     m.comtel," +
                            "     s.usecnt as logincnt," +
                            "     date_format(s.lastlogindate, '%Y-%m-%d') as logindate," +
                            "     date_format(m.joindate, '%Y-%m-%d') as joindate" +
                            " from" +
                            " (" +
                            "     select" +
                            " memberid," +
                            "     min(logindate) as usefrom," +
                            "     max(" +
                            "         coalesce(" +
                            " case" +
                            " when logoutdate is null and date_format(current_timestamp, '%Y%m%d%h%i%s') > autooutdate" +
                            " then autooutdate" +
                            " else logoutdate" +
                            " end" +
                            "     ,'999')" +
                            " ) as useto," +
                            "     count(*) as usecnt," +
                            "     max(logindate) as lastlogindate" +
                            " from" +
                            "   stu_memberidlist" +
                            " where 1=1" +
                            "   and" +
                            "   (" +
                            "         (" +
                            "             logindate" +
                            //'20140501' / none:'00000000'
                            "             between concat(:start, '000000')" +
                            //'20140801' / none:'99999999'
                            "                 and concat(:end, '235959')" +
                            "         )" +
                            "         or" +
                            "         (" +
                            "             coalesce(logoutdate, autooutdate)" +
                            //'20140501' / none:'00000000'
                            "             between concat(:start, '000000')" +
                            //'20140801' / none:'99999999'
                            "                 and concat(:end, '235959')" +
                            "         )" +
                            "     )" +
                            "   group by memberid" +
                            " ) as s" +
                            " left outer join mas_memberid as m" +
                            " on s.memberid = m.memberid" +
                            " where m.dutyname like concat('%',:dutyname,'%')" +
                            "   and s.memberid like concat('%',:memberid,'%')";

exports.dbUserOrg = {getList:"", getOne:"", insert:"", update:""};
exports.dbUserOrg.getList = "select * from mas_com_code" +
                            " where code_id = 'USEORG'" +
                            "    and code like concat('%',:code,'%')" +
                            "    and value like concat('%',:value,'%')" +
                            " order by code";
exports.dbUserOrg.getOne = "select * from mas_com_code where code_id = 'USEORG' and code=:id order by code";
exports.dbUserOrg.insert = "insert into mas_com_code(code_id, code, value, useyn, managertel, managername, detail, descr, cgrpid, bgrpid)" +
    " select 'USEORG', (code+1) as code, :orgname, :useyn, :managertel, :managername" +
    "   , '', '', '', ''" +
    " from mas_com_code" +
    " where code_id = 'USEORG'" +
    " order by code desc" +
    " limit 1";
exports.dbUserOrg.update = "update mas_com_code" +
    " set " +
    "   value = :orgname" +
    "   , useyn = :useyn" +
    "   , managertel = :managertel" +
    "   , managername = :managername" +
    " where code_id='USEORG' and code=:id";

exports.dbCode = {getStatus:""};
exports.dbCode.getStatus = "select * from mas_com_code where code_id = 'STATUS' order by code";