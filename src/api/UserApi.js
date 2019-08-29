/**
 * Created by qjw on 2018/12/21.
 */

import { Fetch } from '../common';

const UserInfo = {}

//用户信息
UserInfo.getUserInfo = (noglobal) => {
    return new Promise((resolve, reject) => {
        Fetch.get({ url: '/api/user/info' })
            .then(data => {
                if (!noglobal)
                    global.userInfo = data
                resolve(data)
            })
            .catch(errorCode => reject(errorCode));
    });
}

/**
 * 获取某个用户的详细资料
 */
UserInfo.getUserDetail = (userKey) => {
    return new Promise((resolve, reject) => {
        Fetch.get({ url: `/api/user/detail/${userKey}` })
            .then(data => resolve(data))
            .catch(errorCode => reject(errorCode));
    });
}

/**
 *  判断某人是否是我的好友
 */
UserInfo.getFriendRelation = (userId) => {
    return new Promise((resolve, reject) => {
        Fetch.get({ url: `/api/user/friend/hasFriend/${userId}` })
            .then(data => resolve(data))
            .catch(error => reject(error))
    })
}

// 相亲动态
UserInfo.getLoveDynamicList = () => {
    return new Promise((resolve, reject) => {
        Fetch.get({ url: `/api/user/loveDynamic`, isHiddenToast: 1 })
            .then(data => resolve(data))
            .catch(err => reject(err));

    })
}

// 守护榜说明
UserInfo.getShouhuDesc = () => {
    return new Promise((resolve, reject) => {
        Fetch.getVars({ url: 'PAGE_MINE_SHOUHUDESC', isHiddenToast: 1 })
            .then(data => resolve(data))
            .catch(err => reject(err));
    })
}

/**
 *  获取用户的守护榜
 */
UserInfo.getGuardList = (userKey) => {
    return new Promise((resolve, reject) => {
        Fetch.get({ url: `/api/user/${userKey}/guard/list` })
            .then(data => resolve(data))
            .catch(err => reject(err));

    })
}
// 成为守护玫瑰限制
UserInfo.getGuardLimit = () => {
    return new Promise((resolve, reject) => {
        Fetch.getVars({ url: 'LOVEUSER_GuardListRoseLimit', isHiddenToast: 1 })
            .then(data => resolve(data))
            .catch(err => reject(err));
    })
}

// 保存 征友条件
// /api/user/person/condition
UserInfo.postFriendsCondition = (city, maxAge, minAge) => {
    return new Promise((resolve, reject) => {
        Fetch.post({ url: '/api/user/person/condition', params: { city, maxAge, minAge } })
            .then(data => resolve(data))
            .catch(errorCode => reject(errorCode));
    });
}

// 微信号save
UserInfo.saveWX = (weChat) => {
    return new Promise((resolve, reject) => {
        Fetch.get({ url: '/api/user/person/weChat',params: {weChat}})
                .then(data => resolve(data))
                .catch(errorCode => reject(errorCode));
        })
    }

export default UserInfo;