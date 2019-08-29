import { Fetch } from '../common';

const LoveApi = {};

LoveApi.getVarsInfo = () => {
    return new Promise((resolve, reject) => {
        Fetch.getVarsByNameSpace({ url: 'LOVE' })
            .then(data => resolve(data))
            .catch(errorCode => reject(errorCode));
    });
};

export default LoveApi;