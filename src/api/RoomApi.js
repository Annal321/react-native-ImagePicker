import { Fetch } from '../common';

const RoomApi = {};


/**
 * name:房间名,用户输入的
 * open:公开房还是私有房（true or false）
 * three:三人房还是七人房(true or false)
 */
RoomApi.createRoom = (name, open, three, mutiFriends) => {
    return new Promise((resolve, reject) => {
        Fetch.post({ url: '/api/rooms', params: { name, open, three, mutiFriends } })
            .then(data => resolve(data))
            .catch(errorCode => reject(errorCode));
    });
}
/**
 * 房间详情
 */
RoomApi.roomDetail = (roomId) => {
    return new Promise((resolve, reject) => {
        Fetch.get({ url: `/api/rooms/${roomId}` })
            .then(data => resolve(data))
            .catch(errorCode => reject(errorCode));
    });
}

/**
 * 观众进入房间
 */
RoomApi.guestEnterRoom = (roomId) => {
    return new Promise((resolve, reject) => {
        Fetch.post({ url: `/api/rooms/${roomId}/enter` })
            .then(data => resolve(data))
            .catch(errorCode => reject(errorCode));
    });
}
/**
 * 私有房申请
 */
RoomApi.enterUpQueue = (roomId) => {
    return new Promise((resolve, reject) => {
        Fetch.post({ url: `/api/rooms/${roomId}/enter-up-queue` })
            .then(data => resolve(data))
            .catch(errorCode => reject(errorCode));
    });
}
/**
 * 退出房间
 */
RoomApi.exitRoom = () => {
    return new Promise((resolve, reject) => {
        Fetch.post({ url: `/api/rooms/quit` })
            .then(data => resolve(data))
            .catch(errorCode => reject(errorCode));
    });
}

/**
 * 连麦
 */
RoomApi.joinRoomUp = (roomId, inviteToken) => {
    return new Promise((resolve, reject) => {
        Fetch.post({ url: `/api/rooms/${roomId}/up?inviteToken=${inviteToken}` })
            .then(data => resolve(data))
            .catch(errorCode => reject(errorCode));
    });
}

/**
 * 专属房申请连麦的人
 */
RoomApi.getUpQueueUsers = (roomId, genderEnum) => {
    return new Promise((resolve, reject) => {
        Fetch.get({ url: `/api/rooms/${roomId}/up-queue-users`, params: { genderEnum } })
            .then(data => resolve(data))
            .catch(errorCode => reject(errorCode));
    });
}

/**
 * 房间内的人
 */
RoomApi.getRoomUsers = (roomId, genderEnum, roomUserRole, applied) => {
    return new Promise((resolve, reject) => {
        Fetch.get({ url: `/api/rooms/${roomId}/room-users`, params: { genderEnum, roomUserRole, applied } })
            .then(data => resolve(data))
            .catch(errorCode => reject(errorCode));
    });
}

/**
 * 最近活跃的人
 */
RoomApi.getPlatformActive = (genderEnum) => {
    return new Promise((resolve, reject) => {
        Fetch.get({ url: `/api/rooms/invite/upWheat/platform-active`, params: { genderEnum } })
            .then(data => resolve(data))
            .catch(errorCode => reject(errorCode));
    });
}

/**
 * 喜欢我的人
 */
RoomApi.getLikeMe = (genderEnum) => {
    return new Promise((resolve, reject) => {
        Fetch.get({ url: `/api/rooms/invite/upWheat/likeMe`, params: { genderEnum } })
            .then(data => resolve(data))
            .catch(errorCode => reject(errorCode));
    });
}

/**
 * 获取我的好友
 */
RoomApi.getFriends = (genderEnum) => {
    return new Promise((resolve, reject) => {
        Fetch.get({ url: `/api/rooms/invite/upWheat/friend`, params: { genderEnum } })
            .then(data => resolve(data))
            .catch(errorCode => reject(errorCode));
    });
}

/**
 * 爱慕榜
 */
RoomApi.getLoveList = (roomId, userId) => {
    return new Promise((resolve, reject) => {
        Fetch.get({ url: `/api/rooms/${roomId}/${userId}/love-list` })
            .then(data => resolve(data))
            .catch(errorCode => reject(errorCode));
    });
}

/**
 * 获取礼物列表
 */
RoomApi.getGiftList = () => {
    return new Promise((resolve, reject) => {
        Fetch.get({ url: '/api/gift/list', params: {} })
            .then(data => resolve(data))
            .catch(errorCode => reject(errorCode));
    });
}

/**
 * 发送礼物
 */
RoomApi.sendGift = (giftId, acceptId, roomId, giftTypeEnum, addFriend = true) => {
    return new Promise((resolve, reject) => {
        Fetch.post({ url: `/api/gift/home/send`, params: { giftId, acceptId, roomId, giftTypeEnum, addFriend } })
            .then(data => resolve(data))
            .catch(errorCode => reject(errorCode));
    });
}

/**
 * 观众申请上麦
 */
RoomApi.applyRoomUp = () => {
    return new Promise((resolve, reject) => {
        Fetch.post({ url: `/api/rooms/apply-up` })
            .then(data => resolve(data))
            .catch(errorCode => reject(errorCode));
    });
}

/**
 * 主持人发送上麦邀请
 * userIds:userid数组 比如:[1,2,3]
 */
RoomApi.sendUpInvite = (userIds) => {
    return new Promise((resolve, reject) => {
        Fetch.post({ url: `/api/rooms/send-up-invite`, params: userIds })
            .then(data => resolve(data))
            .catch(errorCode => reject(errorCode));
    });
}

/**
 * 红娘指定嘉宾下麦
 */
RoomApi.down = (userId) => {
    return new Promise((resolve, reject) => {
        Fetch.post({ url: `/api/rooms/down?guestUserId=${userId}` })
            .then(data => resolve(data))
            .catch(errorCode => reject(errorCode));
    });
}

/**
 * 获取玫瑰余额
 */
RoomApi.getUserBalance = () => {
    return new Promise((resolve, reject) => {
        Fetch.get({ url: '/api/gift/my/balance' })
            .then(data => resolve(data))
            .catch(errorCode => reject(errorCode))
    })
}

/**
 *  禁言 或踢出直播间
 */

RoomApi.block = (blockId, blockLoveUserTimeType, blockLoveUserType, roomId) => {
    return new Promise((resolve, reject) => {
        Fetch.post({ url: "/api/rooms/block", params: { blockId, blockLoveUserTimeType, blockLoveUserType, roomId } })
            .then(data => resolve(data))
            .catch(error => reject(error))
    })
}

/**
 * 锁定情侣
 * fromUserId	integer($int64) 主动送礼的人
   makerUserId	integer($int64) 主持人
   toUserId	integer($int64) 被绑定的人
 */
RoomApi.bindLover = (fromUserId, makerUserId, toUserId) => {
    return new Promise((resolve, reject) => {
        // Fetch.post({ url: "/api/rooms/user/lock", params: { fromUserId, makerUserId, toUserId } })
        Fetch.get({ url: `/api/rooms/user/lock/${toUserId}` })
            .then(data => resolve(data))
            .catch(error => reject(error))
    })
}

/**
 * 情侣unbind 
 */
RoomApi.unbindLover = () => {
    return new Promise((resolve, reject) => {
        Fetch.get({ url: "/api/rooms/user/unlock" })
            .then(data => resolve(data))
            .catch(error => reject(error))
    })
}
/**
 * 锁定守护天使
 */
RoomApi.bindGuard = (fromUserId, makerUserId, toUserId) => {
    return new Promise((resolve, reject) => {
        // Fetch.post({ url: "/api/rooms/user/guard", params: { fromUserId, makerUserId, toUserId } })
        Fetch.get({ url: `/api/rooms/user/guard/${toUserId}` })
            .then(data => resolve(data))
            .catch(error => reject(error))
    })
}


/**
 *  获取禁言时长
 */
RoomApi.getBlockTime = (roomId) => {
    return new Promise((resolve, reject) => {
        Fetch.get({ url: `/api/rooms/${roomId}/block/timeList` })
            .then(data => resolve(data))
            .catch(error => reject(error))
    })
}
/**
 * 房间列表
 /api/rooms  搜索获取房间列表
numberOfPeople  THREE是三人 MUTI是七人
name  搜索词
isOpen  true是普通相亲，false是专属房
isMutiFriends       true是七人交友，false是七人相亲
 */
RoomApi.roomList = (numberOfPeople, name, isOpen, isMutiFriends) => {
    return new Promise((resolve, reject) => {
        Fetch.get({ url: "/api/rooms", params: { numberOfPeople, name, isOpen, isMutiFriends } })
            .then(data => resolve(data))
            .catch(error => reject(error))

    });
}


/**
 * 房间内心跳
 */
RoomApi.roomHeartBeat = (roomId) => {
    return new Promise((resolve, reject) => {
        Fetch.get({ url: `/api/heartBeat/${roomId}/up`, isHiddenToast: 1 })
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}
/**
 * 数美鉴黄
 */
RoomApi.shumeiAdd = (roomId) => {
    return new Promise((resolve, reject) => {
        Fetch.post({ url: `/api/shumei/add`, params: { roomId } })
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}
RoomApi.downWheat = (userId, micStatus) => {
    return new Promise((resolve, reject) => {
        Fetch.post({ url: `/api/user/maker/msg/down-wheat`, params: { userId, micStatus } })
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}

// 直播间 顶部通知 Vars
//邀请奖励vars
RoomApi.getRoomNoticeVars = () => {
    return new Promise((resolve, reject) => {
        Fetch.getVars({ url: 'PAGE_LIVE_RoomNotice' })
            .then(data => resolve(data))
            .catch(err => reject(err));
    })
}

//直播间分享Vars 
RoomApi.getWeChatVars = () => {
    return new Promise((resolve, reject) => {
        Fetch.getVars({ url: 'PAGE_LIVE_SHARELINK' })
            .then(data => resolve(data))
            .catch(err => reject(err));
    })
}

// 直播间 平台公示
RoomApi.getChatroomNotiVars = () => {
    return new Promise((resolve, reject) => {
        Fetch.getVars({ url: 'PAGE_LIVE_ChatroomNoti' })
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}
//观众获得token
RoomApi.agoraSubToken = (roomId) => {
    return new Promise((resolve, reject) => {
        Fetch.post({ url: `/api/rooms/${roomId}/agora-sub-token` })
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}
export default RoomApi;