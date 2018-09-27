/**
 *子应用工具
 */
var wgtHelp = {
    /**
     *wgt单点登录
     * @param {Object} cb
     */
    ssoLogin : function(cb) {
        //emmToken={"status":"ok","info":{"accessToken":"d96ebdc9-52af-4f72-8ba7-b5dadcc21366","mobileUserId":29089,"mobileNo":"13888888888","email":"hanzhenggang@casco.com","userId":32837,"personUuid":"d580d4b9-4eae-40e8-bf8a-863a79c17f0e","username":"test","uniqueField":"78002","orgName":["卡斯柯信号有限公司/信息管理部"],"orgId":["8e0f3348a5e4822ed319cd9cb940a916"],"rootOrgId":["e96f350619422dc3a96c0d711ca3a943"],"domainId":"94adad42-2aa4-4166-b1fb-564b8460ae7e","domainName":"企业移动门户统一认证","identityValidation":false,"tenantId":"1846","tenantName":"ydyy","appList":[{"activeUser":"0","addByPkgName":false,"appCategory":"AppCanWgt","appCategoryId":"","appCategoryName":"AppCanWgt","appConfigInfo":null,"appGroupName":"","appId":"aaali10024","appKey":"96699a23-f62b-4552-b635-25e9cd452368","appSource":"company","appType":"1","appTypeName":"","applyDefault":false,"applyInterfaceStatus":false,"auditStatus":"","container":false,"createdAt":{"date":23,"day":5,"hours":17,"minutes":24,"month":8,"nanos":0,"seconds":15,"time":1474622655000,"timezoneOffset":-480,"year":116},"createdAtMs":1474622655056,"createdAtStr":"2016-09-23 17:24","createdDay":"2016-09-23","createdStr":"2016-09-23 17:24","createdTime":"2016-09-23","creator":"admin","curVersion":"00.01.0003","description":"","downloadCnt":34,"greatApp":false,"iconLoc":"http://emmprd.casco.com.cn/uploads/appIcon/000014_1474622651019.png","id":42,"installVersion":"","lastCommitAt":"2016-09-23","listPkgFileInfo":[],"maxVersion":"","name":"发票信息","pkgName":"","pkgSize":64235,"pkgUrl":"http://emmprd.casco.com.cn/uploads/pkgFiles/000011_1474901512112.zip","platform":"android,iphone","shortImg1":"","shortImg2":"","shortImg3":"","shortImg4":"","starLevel":"0.0","startTotal":0,"tag":"aaali10024","tileList":[],"total":34,"updateTime":"2016-09-26","uploadPushCert":false}]}}
        var emmToken = appcan.getLocVal("emmToken");
        if (!emmToken) {
            //获取门户信息失败
            if (cb) {
                //为了同步插件的返回格式，新增err对象
                var err = {
                    status : 'fail',
                    info : '获取门户用户信息失败'
                };
                cb(err);
            }
        } else {
            //成功获取门户信息
            try {
                emmToken = JSON.parse(emmToken);
                var param = {
                    mainAccessToken : emmToken.info.accessToken,
                    authType : '',
                    domainName : emmToken.info.domainName
                };
                //转换为字符串作为插件的参数
                param = JSON.stringify(param);
                //调用插件进行sso登陆，在emm后台就可以看到终端和用户信息
                uexEMM.ssoLogin(param);
                //单点登录返回
                uexEMM.cbSsoLogin = function(opId, dataType, data) {
                    //data={"status":"ok","info":{"accessToken":"b2f065bc-ca29-46d6-8f53-849cb2044a0b"}}
                    if (cb) {
                        try {
                            data = JSON.parse(data);
                        } catch(e) {
                            data = {
                                status : 'fail',
                                info : 'cbSsoLogin有异常,' + e.message
                            };
                        }
                        cb(data);
                    }
                };
            } catch(e) {
                var err = {
                    status : 'fail',
                    info : '解析门户用户信息失败,' + e.message
                };
                cb(err);
            }
        }
    }
};

