/**
 * Created by qjw on 2019/8/24.
 */

const CacheConfig = {
    love: {
        vars: { url: 'LOVE', expires: null, method: '' },
        prefetch: true
    },
    vip: {
        vars: { url: 'MINE_VIP' },
        vipGoods: { url: '/api/goods/goodsList?goodsType=MEMBER_CARD', method: 'get' }
    },
};

export default CacheConfig;

