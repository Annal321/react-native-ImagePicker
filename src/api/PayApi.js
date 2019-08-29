/**
 * Created by qjw on 2019/07/15.
 */

import { Fetch } from '../common';
import { IsIos } from '../common/Screen';

const PayInfo = {};

PayInfo.paymentPage = () => {
    return new Promise((resolve,reject) => {
        Fetch.getVarsByNameSpace({url:'MINE_PAYMENT'})
            .then(data => resolve(data))
            .catch(error => reject(error));
    })
}

PayInfo.payByCard = (goodsId,useOriginPrice,reportId,useFree) => {
    return new Promise((resolve,reject) => {
        Fetch.post({url:'/api/order/pay',isHiddenToast:1,params:{goodsId:goodsId,useOriginPrice:useOriginPrice?useOriginPrice:false,reportId:reportId,useFree:useFree}})
            .then(data => resolve(data))
            .catch(error => reject(error))
    });
}

PayInfo.payresult = (orderId) => {
    return new Promise((resolve,reject) => {
        Fetch.post({url:`/api/order/pay-result?orderId=${orderId}`})
            .then(data => resolve(data))
            .catch(error => reject(error))
    });
}

PayInfo.payByAlipay = (goodsId) => {
    return new Promise((resolve,reject) => {
        Fetch.post({url:'/api/order/ali-params',params:{goodsId:goodsId,payWay:'ALIPAY'},isHiddenToast:1})
            .then(data => resolve(data))
            .catch(error => reject(error))
    })
}

PayInfo.payByWeChat= (goodsId,payType) => {
    return new Promise((resolve,reject) => {
        Fetch.post({url:'/api/order/wx-params',params:{goodsId:goodsId,payWay:'WEIXINPAY',wxTradeType:payType},isHiddenToast:1})
            .then(data => resolve(data))
            .catch(error => reject(error))
    })
}

PayInfo.getPayUrl = (goodsId) => {
    return new Promise((resolve,reject) => {
        Fetch.post({url:'/api/order/quickpay-url',params:{goodsId,payWay:'YIBAOPAY'},isHiddenToast:1})
            .then(data => resolve(data))
            .catch(error => reject(error))
    })
}

export default PayInfo;