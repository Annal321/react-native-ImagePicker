/*
 * @Author: liuzhe
 * @LastEditors: liuzhe
 * @Description: 
 */
/**
 * Created by qjw on 2018/12/21.
 */

import {Fetch,IsIos} from '../common';
import { APP_NAME } from "../APP_CONFIG";
const MessageInfo = {}

// 我的好友列表
MessageInfo.myFriendsList = () => {
    return new Promise((resolve, reject) => {
        Fetch.get({url: `/api/user/invite/list`})
            .then(data => { resolve(data) })
            .catch(errorCode => reject(errorCode));
    });
}
// 申请我的人
MessageInfo.applyMe = () => {
    return new Promise((resolve, reject) => {
        Fetch.get({url: '/api/user/friend/apply/me'})
            .then(data => { resolve(data) })
            .catch(errorCode => reject(errorCode));
    });
}
// 我申请的人
MessageInfo.myApply = () => {
    return new Promise((resolve, reject) => {
        Fetch.get({url: '/api/user/friend/me/apply'})
            .then(data => { resolve(data) })
            .catch(errorCode => reject(errorCode));
    });
}
//通过好友申请
MessageInfo.passApply = (id) => {
    return new Promise((resolve, reject) => {
        Fetch.get({url: `/api/user/friend/apply/pass/${id}`})
            .then(data => { resolve(data) })
            .catch(errorCode => reject(errorCode));
    });
}
//申请加好友
MessageInfo.applyFriends = (addUserId) => {
    return new Promise((resolve, reject) => {
        Fetch.post({url: `/api/user/friend/apply`, params: { addUserId } })
            .then(data => { resolve(data) })
            .catch(errorCode => reject(errorCode));
    });
}
//判断某人是否是我的好友
MessageInfo.hasFriend = (userId) => {
    return new Promise((resolve, reject) => {
        Fetch.get({url: `/api/user/friend/hasFriend/${userId}` })
            .then(data => { resolve(data) })
            .catch(errorCode => reject(errorCode));
    });
}
//群组关键字
MessageInfo.getGroupKeywords = (addUserId) => {
    return new Promise((resolve, reject) => {
        Fetch.get({url: `/api/user/team/keywords`})
            .then(data => { resolve(data) })
            .catch(errorCode => reject(errorCode));
    });
}
//搜索群组
MessageInfo.searchKeywords = (keywords) => {
    let keyArray = new Array(keywords);
    return new Promise((resolve, reject) => {
        Fetch.get({url: `/api/user/team/search?keywords=${keyArray}`})
            .then(data => { resolve(data) })
            .catch(errorCode => reject(errorCode));
    });
}


//消息推荐群组
MessageInfo.getFlockList = () => {
    return new Promise((resolve, reject) => {
        Fetch.get({url: '/api/user/team/search?keywords='})
            .then(data => resolve(data))
            .catch(errorCode => reject(errorCode));
    });
}

//获取邀请进群用户列表
MessageInfo.getInviteList = (teamId) => {
    return new Promise((resolve, reject) => {
        Fetch.get({url: `/api/user/invite/list?teamId=${teamId}`})
            .then(data => resolve(data))
            .catch(errorCode => reject(errorCode));
    });
}
//邀请进群用户邀请  
MessageInfo.inviteJoinTeam = (params) => {
	return new Promise((resolve, reject) => {
			Fetch.post({url: `/api/user/invite/join/team`,params , needCode: 1})
					.then(data => resolve(data))
					.catch(errorCode => reject(errorCode));
	});
}

//判断是否添加过某个群
MessageInfo.isJoinTeam = (teamId) => {
	return new Promise((resolve, reject) => {
			Fetch.get({url: `/api/user/team/has-join/${teamId}`})
					.then(data => resolve(data))
					.catch(errorCode => reject(errorCode));
	});
}

//获取群列表以及推荐群列表 
MessageInfo.getTeamList = (teamId) => {
	return new Promise((resolve, reject) => {
			Fetch.get({url: `/api/user/team/recommend/list`})
					.then(data => resolve(data))
					.catch(errorCode => reject(errorCode));
	});
}

// 踢人出群
MessageInfo.kickingTeam = (teamId, userId) => {
	return new Promise((resolve, reject) => {
			Fetch.post({url: `/api/user/team/kicking/${teamId}/${userId}`, needCode: 1})
					.then(data => resolve(data))
					.catch(errorCode => reject(errorCode));
	});
}

//用户进行举报
MessageInfo.reportCentreInform = (params) => {
	return new Promise((resolve, reject) => {
			Fetch.post({url: `/api/user/inform`, params, needCode: 1})
					.then(data => resolve(data))
					.catch(errorCode => reject(errorCode));
	});
}

//进群消耗玫瑰数量
MessageInfo.joinTeamRose= () => {
	return new Promise((resolve, reject) => {
			Fetch.getVars({ url: 'PAGE_COMMON_JOINTEAMROSE'})
					.then(data => resolve(data))
					.catch(err => reject(err));
	})
};

// 相亲记录  
MessageInfo.loveRecord = (params) => {
	return new Promise((resolve, reject) => {
			Fetch.get({url: `/api/user/loveRecord`})
					.then(data => resolve(data))
					.catch(errorCode => reject(errorCode));
	});
}

//消息列表
MessageInfo.getMessageListVars = () => {
    return new Promise((resolve, reject) => {
        Fetch.getVarsByNameSpace({ url: 'MESSAGE'})
        .then(data => resolve(data))
        .catch(err => reject(err));
    })
}

//获取喜欢我的人AccId列表
MessageInfo.getBeLikeAccId = () => {
	return new Promise((resolve, reject) => {
			Fetch.get({url: `/api/user/beLike/accId`})
					.then(data => resolve(data))
					.catch(errorCode => reject(errorCode));
    });
}


export default MessageInfo;