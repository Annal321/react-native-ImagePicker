/**
 * Created by qjw on 2019/07/15.
 */

import { Fetch } from '../common';
import { IsIos } from '../common/Screen';

const VipInfo = {};

VipInfo.getVars = () => {
    return new Promise((resolve, reject) => {
        Fetch.getVarsByNameSpace({url: 'MINE_VIP'})
             .then(data => resolve(data))
             .catch(errorCode => reject(errorCode));
    });
};

VipInfo.getVipList = () => {
    return new Promise((resolve, reject) => {
        Fetch.get({url: '/api/goods/goodsList?goodsType=MEMBER_CARD'})
             .then(data => resolve(data))
             .catch(errorCode => reject(errorCode));
    });
};


export default VipInfo;