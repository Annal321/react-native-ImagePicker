/**
 * Created by qjw on 2018/12/21.
 */

import {Fetch,IsIos} from '../common';
import { APP_NAME } from "../APP_CONFIG";
const HomeInfo = {}

HomeInfo.getVarsInfo = () => {
    return new Promise((resolve, reject) => {
        Fetch.getVarsByNameSpace({url: 'HOME'})
             .then(data => resolve(data))
             .catch(errorCode => reject(errorCode));
    });
};

HomeInfo.getHomeLoanVarsInfo = () => {
    return new Promise((resolve, reject) => {
        Fetch.getVarsByNameSpace({url: 'NEWWEEKLOAN'})
             .then(data => resolve(data))
             .catch(errorCode => reject(errorCode));
    });
};

HomeInfo.getMessageInfo = () => {
    return new Promise((resolve, reject) => {
        Fetch.get({url: '/api/users/user-unread-msg-count', isHiddenToast: 1})
             .then(data => resolve(data))
             .catch(errorCode => reject(errorCode));
    });
}

//贷款列表
HomeInfo.getHomeLoanPlats = (type, page, pageSize) => {
    return new Promise((resolve, reject) => {
        Fetch.post({url: `/api/loan-plats?page=${page}&size=${pageSize}`, params: {naturalId: type, oneClickLoan: false}})
             .then(data => resolve(data))
             .catch(errorCode => reject(errorCode));
    });
}

//公共参数
HomeInfo.getCommonVars = () => {
    return new Promise((resolve, reject) => {
        Fetch.getVarsByNameSpace({url: 'COMMON'})
             .then(data => resolve(data))
             .catch(errorCode => reject(errorCode));
    });
}

//LOADING页
HomeInfo.getLoadingVars = () => {
    return new Promise((resolve, reject) => {
        Fetch.getVarsByNameSpace({url: 'LOADING'})
             .then(data => resolve(data))
             .catch(errorCode => reject(errorCode));
    });
}

HomeInfo.uploadAppList = (userAppsListContent) => {
    return new Promise((resolve, reject) => {
        Fetch.post({url: '/api/users/user-install-apps',params:userAppsListContent,isHiddenToast:1})
             .then(data => resolve(data))
             .catch(errorCode => reject(errorCode));
    });
}

HomeInfo.heartBeat = () => {
    return new Promise((resolve, reject) => {
        Fetch.get({url: '/api/heartBeat/online',isHiddenToast:1})
            .then(data => resolve(data))
            .catch(errorCode => reject(errorCode));
    });
}

HomeInfo.getHomeList = (page,size) => {
    return new Promise((resolve, reject) => {
        Fetch.get({url: '/api/user/homePage/recommend',params: { page,size }})
            .then(data => resolve(data))
            .catch(errorCode => reject(errorCode));
    });
};

//阿里云客服带用户信息
HomeInfo.concatUserToService = ()=>{
    return new Promise((resolve, reject) => {
        Fetch.get({ url: '/api/account/customerService-param' })
            .then(data => resolve(data))
            .catch(err => reject(err));
    })
}

//分享获取玫瑰
HomeInfo.postShareRose = () =>{
    return new Promise((resolve, reject) => {
        Fetch.post({url: '/api/user/share/rose', isHiddenToast:1})
            .then(data => resolve(data))
            .catch(errorCode => reject(errorCode));
    });
}

export default HomeInfo;
