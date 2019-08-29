import { Fetch } from '../common';

const ChatApi = {};

/**
 * 私聊发送礼物
 */
ChatApi.sendGift = (giftId, acceptId) => {
    return new Promise((resolve, reject) => {
        Fetch.post({ url: `/api/gift/chat/send`, params: { giftId, acceptId } })
            .then(data => resolve(data))
            .catch(errorCode => reject(errorCode));
    });
}

/**
 * 付费进群
 */
ChatApi.joinPublicTeam = (teamId) => {
    return new Promise((resolve, reject) => {
        Fetch.post({ url: `/api/user/join/publicTeam`, params: { teamId } })
            .then(data => resolve(data))
            .catch(errorCode => reject(errorCode));
    });
}

/**
 * 是否在某个群里
 */
ChatApi.hasJoinTeam = (teamId) => {
    return new Promise((resolve, reject) => {
        Fetch.get({ url: `/api/user/team/has-join/${teamId}` })
            .then(data => resolve(data))
            .catch(errorCode => reject(errorCode));
    });
}

/**
 * 校验消息可行性
 */
ChatApi.checkMessage = (msgId) => {
    return new Promise((resolve, reject) => {
        Fetch.get({ url: `/api/msg/check/${msgId}` })
            .then(data => resolve(data))
            .catch(errorCode => reject(errorCode));
    });
}

/**
 * 接到被邀请进群后，点击同意进群
 */
ChatApi.agreeJoinTeam = (teamId) => {
    return new Promise((resolve, reject) => {
        Fetch.post({ url: `/api/user/be-invite/join/team`, params: { teamId } })
            .then(data => resolve(data))
            .catch(errorCode => reject(errorCode));
    });
}

export default ChatApi;