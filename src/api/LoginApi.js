/**
 * Created by huangrui on 2018/07/31.
 */

import {Fetch} from '../common';
import { Platform, NativeModules } from 'react-native';
import BuildConfig from 'react-native-build-config';
import { Screen } from '../common';
import { IsIos } from '../common/Screen';
import { IOSCHANNEL } from "../APP_CONFIG";

const LoginInfo = {};

LoginInfo.loginAction = (code,mobile) => {
    return new Promise((resolve, reject) => {
        Fetch.post({url: '/api/user/login', params: {code,mobile}})
             .then(data => resolve(data))
             .catch(errorCode => reject(errorCode));
    });
};

LoginInfo.getMobileCode = (mobile) => {
    return new Promise((resolve, reject) => {
        Fetch.post({url: '/api/user/send-sms?mobile=' + mobile, params: {}})
             .then(data => resolve(data))
             .catch(errorCode => reject(errorCode));
    });
};

LoginInfo.isWXregistered = (mobile) => {
    return new Promise((resolve, reject) => {
        Fetch.get({url: '/api/my/user/by-mobile', params: {mobile}, isHiddenToast: 1, needCode: 1})
             .then(data => resolve(data))
             .catch(errorCode => reject(errorCode));
    });
};

LoginInfo.weVerifyloginAction = (code,mobile) => {
    return new Promise((resolve, reject) => {
        Fetch.post({url: '/api/my/wechat/set-mobile-by-token', params: {code,mobile, channel: IsIos ? IOSCHANNEL : BuildConfig.FLAVOR}})
             .then(data => resolve(data))
             .catch(errorCode => reject(errorCode));
    });
};

LoginInfo.wechatloginSuccess = (code) => {
    return new Promise((resolve, reject) => {
        Fetch.get({url: '/api/user/wx/app/code', params: {code}})
             .then(data => resolve(data))
             .catch(errorCode => reject(errorCode));
    });
};

LoginInfo.checkIsUpdate = () => {
    return new Promise((resolve, reject) => {
        const channel = IsIos ? IOSCHANNEL : BuildConfig.FLAVOR;
        Fetch.getVars({url: 'APPUPDATE_INFO,APPUPDATE_' + channel, prex: 'APPUPDATE', isHiddenToast: 1})
             .then(data => resolve(data))
             .catch(errorCode => reject(errorCode));
    });
};

LoginInfo.getAppSwitch = () => {
    return new Promise((resolve, reject) => {
        const channel = IsIos ? IOSCHANNEL : BuildConfig.FLAVOR;
        Fetch.getVars({url: 'APPSWITCH_' + channel, prex: 'APPSWITCH', isHiddenToast: 1})
             .then(data => resolve(data))
             .catch(errorCode => reject(errorCode));
    });
};

LoginInfo.getTabSetting = () => {
    return new Promise((resolve, reject) => {
        Fetch.getVarsByNameSpace({url:'TABS',prex: 'TABSETTING', isHiddenToast: 1})
             .then(data => resolve(data))
             .catch(errorCode => reject(errorCode));
    });
}

LoginInfo.getLoginVars = () => {
    return new Promise((resolve, reject) => {
        Fetch.getVarsByNameSpace({url: 'LOGIN'})
             .then(data => resolve(data))
             .catch(errorCode => reject(errorCode));
    });
};

LoginInfo.getMallUserToken = () => {
    return new Promise((resolve, reject) => {
        Fetch.getmall({url: `/zeus-be/channel/auth/login.do?token=${global.authorization.replace('Bearer ', '')}`})
             .then(data => resolve(data))
             .catch(errorCode => reject(errorCode));
    });
}

LoginInfo.bindMobile = (code,mobile) => {
    return new Promise((resolve, reject) => {
        Fetch.get({url: '/api/user/mobile/bind', params: {code,mobile}})
             .then(data => resolve(data))
             .catch(errorCode => reject(errorCode));
    });
}

export default LoginInfo;