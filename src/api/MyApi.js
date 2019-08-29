import { Fetch, IsIos } from '../common';
import { APP_NAME } from "../APP_CONFIG";
const MyInfo = {}
//我的钱包vars
MyInfo.getmyWalletVar = () => {
    return new Promise((resolve, reject) => {
      Fetch.getVarsByNameSpace({ url: 'MINE_MYWALLET' })
        .then(data => resolve(data))
        .catch(err => reject(err));
    })
}
//邀请奖励vars
MyInfo.getInviteVars = () => {
    return new Promise((resolve, reject) => {
        Fetch.getVarsByNameSpace({ url: 'MINE_INVITE' })
        .then(data => resolve(data))
        .catch(err => reject(err));
    })
}
// oss
MyInfo.getOssToken = (fileName) => {
  return new Promise((resolve, reject) => {
    Fetch.get({ url: '/api/oss/token', params: { fileName }})
      .then(data => resolve(data))
      .catch(errorCode => reject(errorCode));
  });
}

// 设置头像
MyInfo.setUerAvatar = (headImg) => {
  return new Promise((resolve, reject) => {
    Fetch.get({ url: '/api/user/audit/headImg', params: { headImg }})
      .then(data => resolve(data))
      .catch(errorCode => reject(errorCode));
  });
}

//投诉与反馈
MyInfo.getServiceUrlVars = () => {
    return new Promise((resolve, reject) => {
        Fetch.getVars({ url: 'PAGE_MINE_service' })
        .then(data => resolve(data))
        .catch(err => reject(err));
    })
}

// 客服组件vars
MyInfo.getServiceCommonlVars = () => {
    return new Promise((resolve, reject) => {
        Fetch.getVars({ url: 'PAGE_MINE_SERVICECOMM' })
        .then(data => resolve(data))
        .catch(err => reject(err));
    })
}

//电话客服
MyInfo.getTelKefuVars = () => {
    return new Promise((resolve, reject) => {
        Fetch.getVars({ url: 'PAGE_MINE_TelKefu' })
        .then(data => resolve(data))
        .catch(err => reject(err));
    })
}

//我的钱包公共配置vars
MyInfo.getConfigVars = () => {
    return new Promise((resolve, reject) => {
        Fetch.getVars({ url: 'PAGE_MINE_MYWALLET_config' })
        .then(data => resolve(data))
        .catch(err => reject(err));
    })
}

//红娘学院
MyInfo.getArticalVars = () => {
    return new Promise((resolve,reject) => {
        Fetch.getVarsByNameSpace({url:'MINE_MYWALLET_ARTICAL'})
            .then(data => resolve(data))
            .catch(err => reject(err));
    })
}

//我的钱包
MyInfo.getAccountInfo = () => {
    return new Promise((resolve,reject)=>{
        Fetch.get({url: '/api/account/account-info'})
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}

//兑换玫瑰
MyInfo.convertRoses = () => {
    return new Promise((resolve,reject)=>{
        Fetch.get({url: '/api/account/convertRoses'})
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}

//收益明细
MyInfo.earningsDetail = () => {
    return new Promise((resolve,reject)=>{
        Fetch.get({url: '/api/account/earningsDetail'})
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}

//提现金额明细
MyInfo.getDrawDetail = () => {
    return new Promise((resolve,reject)=>{
        Fetch.get({url: '/api/account/withDraw-detail'})
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}

//提现
MyInfo.requestDraw = () => {
    return new Promise((resolve,reject)=>{
        Fetch.post({url: '/api/account/withDrawRequest', params: {  payWay: "ALIPAY" } })
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}

//审核支付宝账号
MyInfo.commitaAliPayNo = (aliPayNo) => {
    return new Promise((resolve,reject)=>{
        Fetch.post({url: '/api/account/commit-aliPayNo?aliPayNo=' + aliPayNo })
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}

//提现历史
MyInfo.withDrawRequestList = () => {
    return new Promise((resolve, reject)=>{
        Fetch.get({url: '/api/account/withDrawRequestList'})
            .then(data=> resolve(data))
            .catch(err=> reject(err))
    })
}

//照片墙删除接口
MyInfo.delPhotoWall = (imageUrl) => {
    return new Promise((resolve, reject)=>{
        Fetch.post({url: '/api/user/audit/delete/photoWall', params:{imageUrl}})
            .then(data=> resolve(data))
            .catch(err=> reject(err))
    })
}

//获取示例头像
MyInfo.getAvatarExampleVars = () => {
    return new Promise((resolve, reject) => {
        Fetch.getVars({ url: 'PAGE_MINE_AvatarExample', isHiddenToast: 1})
        .then(data => resolve(data))
        .catch(err => reject(err));
    })
}

//解除关系文案
MyInfo.getLiftRrelationshipVars = () => {
    return new Promise((resolve, reject) => {
        Fetch.getVars({ url: 'PAGE_MINE_LiftRrelationship', isHiddenToast: 1})
        .then(data => resolve(data))
        .catch(err => reject(err));
    })
}

//头像弹框文案
MyInfo.getAvatarPopTextpVars = () => {
    return new Promise((resolve, reject) => {
        Fetch.getVars({ url: 'PAGE_MINE_AvatarPopText', isHiddenToast: 1})
        .then(data => resolve(data))
        .catch(err => reject(err));
    })
}

//实名认证弹框文案
MyInfo.getRealNamePopTextVars = () => {
    return new Promise((resolve, reject) => {
        Fetch.getVars({ url: 'PAGE_MINE_RealNamePopText', isHiddenToast: 1})
        .then(data => resolve(data))
        .catch(err => reject(err));
    })
}

//个性标签
MyInfo.getPersonalityLabelVars = () => {
    return new Promise((resolve, reject) => {
        Fetch.getVars({ url: 'PAGE_MINE_PersonalityLabel', isHiddenToast: 1})
        .then(data => resolve(data))
        .catch(err => reject(err));
    })
}

//基本资料
MyInfo.getBasicInfoVars = () => {
    return new Promise((resolve, reject) => {
        Fetch.getVars({ url: 'PAGE_MINE_MakeFriendsHeart,PAGE_MINE_AgeRange,PAGE_MINE_Education,PAGE_MINE_MaritalStatus,PAGE_MINE_HeightRange,PAGE_MINE_Wage,PAGE_MINE_Works,PAGE_MINE_HouseStatus,PAGE_MINE_Charm,PAGE_MINE_BloodGroup,PAGE_MINE_FumuTongzhu,PAGE_MINE_Cohabit', isHiddenToast: 1})
        .then(data => resolve(data))
        .catch(err => reject(err));
    })
}

// 完善用户资料
MyInfo.postBasicInfo = (age,city,genderEnum,nickName,province) => {
    return new Promise((resolve, reject) => {
        Fetch.post({url: '/api/user/perfect/base',params:{age,city,genderEnum,nickName,province}})
            .then(data => resolve(data))
            .catch(errorCode => reject(errorCode));
    });
}

// 实名认证
MyInfo.postCerInfo = (idCard,name) => {
    return new Promise((resolve, reject) => {
        Fetch.post({url: '/api/user/audit/realName',params:{idCard,name}, needCode: 1})
            .then(data => resolve(data))
            .catch(errorCode => reject(errorCode));
    });
}

//玫瑰商品列表
MyInfo.getRoseList = () => {
    return new Promise((resolve, reject) => {
        Fetch.get({url: '/api/goods/goodsList?goodsType=ROSE'})
             .then(data => resolve(data))
             .catch(errorCode => reject(errorCode));
    });
};
//玫瑰特权
MyInfo.getRoseVars = () => {
    return new Promise((resolve,reject) => {
        Fetch.getVarsByNameSpace({url:'MINE_ROSE'})
            .then(data => resolve(data))
            .catch(err => reject(err));
    })
};
//玫瑰消费记录
MyInfo.getRoseRecords = (page) => {
    return new Promise((resolve, reject) => {
        Fetch.get({url: `/api/gift-order/index?page=${page}&pageSize=20`})
             .then(data => resolve(data))
             .catch(errorCode => reject(errorCode));
    });
};
//视频奖励明细
MyInfo.getVideoAwardList = () => {
    return new Promise((resolve, reject) => {
        Fetch.get({url: `/api/account/videoAwardList`})
             .then(data => resolve(data))
             .catch(errorCode => reject(errorCode));
    });
};

//我邀请的人
MyInfo.getInviteList = () => {
    return new Promise((resolve, reject) => {
        Fetch.get({url: `/api/user/my/invite/list`})
             .then(data => resolve(data))
             .catch(errorCode => reject(errorCode));
    });
};


//举报中心数据
MyInfo.getReportVars = () => {
	return new Promise((resolve, reject) => {
			Fetch.getVars({ url: 'PAGE_MINE_REPORTCENTRE' })
			.then(data => resolve(data))
			.catch(err => reject(err));
	})
}

//我的徒弟7、30任务
MyInfo.getPupilDays = (days) => {
    return new Promise((resolve, reject) => {
        Fetch.get({url: `/api/user/apprenticeTask-list?days=${days}`})
             .then(data => resolve(data))
             .catch(errorCode => reject(errorCode));
    });
};

//我的徒弟出师列表
MyInfo.getPupilList= (days) => {
    return new Promise((resolve, reject) => {
        Fetch.get({url: `/api/user/apprenticeships`})
             .then(data => resolve(data))
             .catch(errorCode => reject(errorCode));
    });
};

//保持用户基础条件
MyInfo.postPersonBasicInfo = (params) => {
    console.log(params, '保持用户基础条件api')
    return new Promise((resolve, reject) => {
        Fetch.post({url: '/api/user/person/base',params})
            .then(data => resolve(data))
            .catch(errorCode => reject(errorCode));
    });
}
// 生成用户昵称
MyInfo.getNickNames = () => {
    return new Promise((resolve, reject) => {
        Fetch.get({url: `/api/user/gen/nickName`})
            .then(data => resolve(data))
            .catch(errorCode => reject(errorCode));
    });
};

// 年龄区间
MyInfo.getBasicInfoVarsForAgeRange = () => {
    return new Promise((resolve, reject) => {
        Fetch.getVars({ url: 'PAGE_MINE_AgeRange', isHiddenToast: 1})
            .then(data => resolve(data))
            .catch(err => reject(err));
    })
};

// 地区
MyInfo.getBasicInfoVarsForArea = () => {
    return new Promise((resolve, reject) => {
        Fetch.getVars({ url: 'PAGE_MINE_Area', isHiddenToast: 1})
            .then(data => resolve(data))
            .catch(err => reject(err));
    })
};

// 绑定手机文案
MyInfo.getBindPhoneText = () => {
    return new Promise((resolve, reject) => {
        Fetch.getVars({ url: 'PAGE_MINE_BindPhone', isHiddenToast: 1})
            .then(data => resolve(data))
            .catch(err => reject(err));
    })
};

// 获取喜欢我的人列表
MyInfo.getBeLikeList = () => {
    return new Promise((resolve, reject) => {
        Fetch.get({url: '/api/user/beLikeList'})
            .then(data => resolve(data))
            .catch(errorCode => reject(errorCode));
    })
};

// 获取我喜欢的人列表
MyInfo.getLikeList = () => {
    return new Promise((resolve, reject) => {

        Fetch.get({url: '/api/user/likeList'})
            .then(data => resolve(data))
            .catch(errorCode => reject(errorCode));
    })
};

// 点赞
MyInfo.postLike = (toUserId) => {
    return new Promise((resolve, reject) => {
        Fetch.get({url: `/api/user/like/${toUserId}`})
            .then(data => resolve(data))
            .catch(errorCode => reject(errorCode));
    });
};
//保存征友条件
MyInfo.postPersonCondition = (parms) =>{
    return new Promise((resolve, reject) => {
        Fetch.post({url: '/api/user/person/condition',params:parms})
            .then(data => resolve(data))
            .catch(errorCode => reject(errorCode));
    });
}
//保存个性标签
MyInfo.postPersonLabel = (parms) =>{
    return new Promise((resolve, reject) => {
        Fetch.post({url: '/api/user/person/label',params:parms})
            .then(data => resolve(data))
            .catch(errorCode => reject(errorCode));
    });
}
//情侣解绑
MyInfo.getUserUnlock = ()=>{
    return new Promise((resolve, reject) => {
        Fetch.get({ url: '/api/rooms/user/unlock'})
            .then(data => resolve(data))
            .catch(err => reject(err));
    })
}

//上传照片
MyInfo.auditPhotoWall = (photo)=>{
    return new Promise((resolve, reject) => {
        Fetch.get({ url: '/api/user/audit/photoWall', params: {photo}})
            .then(data => resolve(data))
            .catch(err => reject(err));
    })
}

//客服留言
MyInfo.getKefuLeave = (content,mobile_val,id) => {
    return new Promise((resolve,reject) => {
        Fetch.postohmyadmin({url:'/interface.php?route=Api/insertAndUpdate&schemaKey=API_AUTOLOAN_LEAVE-WORD_UPDATE-INSERT',
        params:{ postInsertUpdateData:JSON.stringify({content,mobile_val}), condition:JSON.stringify({id}) } })
            .then(data => resolve(data))
            .catch(err => reject(err))

    })
}
//判断用户今日是否留言过
MyInfo.getKefuOne = (ctime) => {
    return new Promise((resolve,reject) => {
        Fetch.postohmyadmin({url:'/interface.php?route=Api/detail&schemaKey=API_AUTOLOAN_LEAVE-WORD_DETAIL',
        params:{condition:JSON.stringify({"app_name":"{token.app_name}","user_id":"{token.sub}",ctime})}})
            .then(data => resolve(data))
            .catch(err => reject(err))

    })
}

//客服vars
MyInfo.getVarsInfo = () => {
    return new Promise((resolve, reject) => {
        Fetch.getVars({url: 'PAGE_MINE_SERVICECOMM'})
             .then(data => resolve(data))
             .catch(errorCode => reject(errorCode));
    });
};



export default MyInfo;
