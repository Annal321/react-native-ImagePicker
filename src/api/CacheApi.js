import { Fetch } from '../common';

const CacheApi = {};

CacheApi.getData = (url, method) => {
    if(method == 'get'){
        return new Promise((resolve, reject) => {
            Fetch.get({ url })
                .then(data => resolve(data))
                .catch(errorCode => reject(errorCode));
        });
    }else if(method == 'post'){
        return new Promise((resolve, reject) => {
            Fetch.post({ url })
                .then(data => resolve(data))
                .catch(errorCode => reject(errorCode));
        });
    }else{
        return new Promise((resolve, reject) => {
            Fetch.getVarsByNameSpace({ url })
                .then(data => resolve(data))
                .catch(errorCode => reject(errorCode));
        });
    }
};

CacheApi.getCacheImage = (key) => {
    return new Promise((resolve, reject) => {
        Fetch.getVars({ url: `PAGE_CACHE_${key}` })
            .then(data => resolve(data))
            .catch(errorCode => reject(errorCode));
    });
};

export default CacheApi;