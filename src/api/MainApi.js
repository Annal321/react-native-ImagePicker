/**
 * Created by qjw on 2018/1/21.
 */

import {Fetch,IsIos} from '../common';
import { IOSCHANNEL } from "../APP_CONFIG";
import BuildConfig from 'react-native-build-config';
const MainInfo = {}

MainInfo.checkIsUpdate = () => {
    return new Promise((resolve, reject) => {
        const channel = IsIos ? IOSCHANNEL : BuildConfig.FLAVOR;
        Fetch.getVars({url: 'APPUPDATE_INFO,APPUPDATE_' + channel, prex: 'APPUPDATE', isHiddenToast: 1})
             .then(data => resolve(data))
             .catch(errorCode => reject(errorCode));
    });
};

MainInfo.getGlobalData = () => {
    return new Promise((resolve, reject) => {
        Fetch.getVarsByNameSpace({url:'COMMON', isHiddenToast: 1}).then(data => {
            global.hasCommonVarsInfo = true;
            global.commonVarsInfo = data;
            resolve(data);
        }).catch(errorCode => {reject(errorCode)});
    });
};

MainInfo.getI18NData = (timestamp) => {
    return new Promise((resolve, reject) => {
        Fetch.get({url: '/api/translation/index', isHiddenToast: 1, params: { timestamp }}).then(data => {
            resolve(data);
        }).catch(errorCode => {reject(errorCode)});
    });
};

export default MainInfo;