/**
 * Created by Andste on 2017/8/8.
 */
import { StatusBar, Alert,DeviceEventEmitter } from 'react-native';
import { APP_HOST, APP_HOST_VAR,IOSCHANNEL, APP_NAME, APP_HOST_OHMYADMIN, VARS_COMMON_NAME, MALL_HOST } from "../APP_CONFIG";
import { IsIos, Foundation, IsNetworkConnected } from '.';
import qs from 'qs';
import NavigationService from '../navigator/NavigationService';
import { Toast } from '../components/Toast';
import BuildConfig from 'react-native-build-config';
import DeviceInfo from 'react-native-device-info';
import queryString from 'query-string';

const Fetch = {};


Fetch.getVars = (_params: { url: string, prex: string, isHiddenToast: number, needCache: Boolean }) => {
  let { url, prex = 'PAGE', isHiddenToast, needCache } = _params;
  let commonurl = url.split(',').map(item => VARS_COMMON_NAME + '_' + item).toString()
  let customurl = url.split(',').map(item => APP_NAME + '_' + item).toString()
  let multesType = /\,/.test(commonurl)
  // let cacheData = awite Storage.get(url)
  // if(cacheData) {
  //     return judgeMult(cacheData, multesType) 
  // }

  let __ = Object.assign({}, { url: commonurl }, {
    url: /^http(s*)/.test(commonurl) ? commonurl : APP_HOST_VAR + '/api/my/keys/json/' + commonurl,
    options: {
      method: "GET",
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Authorization': global.authorization,
      },
    }
  });
  function judgeMult(res, type, appName) {
    if (type) {
      let keys = Object.keys(res);
      keys.map((key) => {
        res[key.replace(appName + '_' + prex + (prex && '_'), '')] = JSON.parse(res[key])
        delete res[key]
      });
      // Storage.set(url, res, 5)
      return res
    }
    // Storage.set(url, res, 5)
    return res
  }

  let commonVars = requestFetch(__.url, __.options, isHiddenToast).then(res => {
    return judgeMult(res, multesType, VARS_COMMON_NAME)
  });

  if (APP_NAME == VARS_COMMON_NAME) {
    return commonVars;
  } else {
    //如果非坚果贷app，则并行请求，如果自定义请求有值，则替换相关的值
    let curl = /^http(s*)/.test(customurl) ? customurl : APP_HOST_VAR + '/api/my/keys/json/' + customurl;
    let customVars = requestFetch(curl, __.options, isHiddenToast).then(res => {
      return judgeMult(res, multesType, APP_NAME)
    });

    return Promise.all([commonVars, customVars])
      .then(resps => {
        let result = {};
        resps.map(resp => {
          if (resp instanceof Object && !Array.isArray(resp)) {//非namespace的请求可能返回的不是对象，而是其他基本类型或者数组，所以添加此判断，因为自定义请求如果没有配置的话，返回空对象，所以，如果不是对象说明自定义请求有值，则替换相关请求
            let keys = Object.keys(resp);
            keys.map((key) => {
              result[key] = resp[key];
            });
          } else {
            result = resp;
          }
        })
        return result;
      });

  }
};

Fetch.getVarsByNameSpace = function (_params: { url: string, prex: string, isHiddenToast: number, needCache: Boolean }) {
  let { url, prex = 'PAGE', isHiddenToast, needCache } = _params;
  let __ = Object.assign({}, { url }, {
    url: /^http(s*)/.test(url) ? url : APP_HOST_VAR + '/api/my/keys/namespace-json/' + VARS_COMMON_NAME + '_' + prex + (prex && '_') + url,
    options: {
      method: "GET",
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Authorization': global.authorization,
      }
    }
  });

  let commonVars = requestFetch(__.url, __.options, isHiddenToast).then(res => {
    let keys = Object.keys(res);
    keys.map((key) => {
      res[key.replace(VARS_COMMON_NAME + '_' + prex + (prex && '_') + url + '_', '')] = JSON.parse(res[key])
      delete res[key]
    });
    return res;
  });

  if (APP_NAME == VARS_COMMON_NAME) {
    return commonVars;
  } else {
    //如果非坚果贷app，则并行请求，如果自定义请求有值，则替换相关的值
    let curl = /^http(s*)/.test(url) ? url : APP_HOST_VAR + '/api/my/keys/namespace-json/' + APP_NAME + '_' + prex + (prex && '_') + url;
    let customVars = requestFetch(curl, __.options, isHiddenToast).then(res => {
      let keys = Object.keys(res);
      keys.map((key) => {
        res[key.replace(APP_NAME + '_' + prex + (prex && '_') + url + '_', '')] = JSON.parse(res[key])
        delete res[key]
      });
      return res;
    })
    return Promise.all([commonVars, customVars])
      .then(resps => {
        let result = {};
        resps.map(resp => {
          let keys = Object.keys(resp);
          keys.map((key) => {
            result[key] = resp[key];
          });
        })
        return result;
      });
  }

}

Fetch.ghVars = (_params: { url: string, prex: string, isHiddenToast: number, needCache: Boolean }) => {
  let { url, prex = 'PAGE', isHiddenToast, needCache } = _params;
  let commonurl = url;
  let __ = Object.assign({}, { url: commonurl }, {
    url: /^http(s*)/.test(commonurl) ? commonurl : APP_HOST_VAR + '/api/my/keys/json/' + commonurl,
    options: {
      method: "GET",
      headers: {
        'Accept': 'application/json',
      },
    }
  });
  return requestFetch(__.url, __.options, isHiddenToast);
}

Fetch.requestHeader = () => {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': global.authorization,
    'Channel': IsIos ? IOSCHANNEL : BuildConfig.FLAVOR,
    "deviceId": DeviceInfo.getUniqueID(),
    "User-Agent": DeviceInfo.getUserAgent(),
    'app-name': APP_NAME,
    'appVersion': DeviceInfo.getVersion(),
    'app-type': IsIos ? 'ios' : 'android'
  }
}
/**
 * get请求统一处理
 * @param _params
 * @returns {Promise}
 */
Fetch.get = (_params: { url: string, params: any, options: any, isHiddenToast: number, needCode: number }) => {
  let { url, params, options, isHiddenToast, needCode } = _params;
  let __ = Object.assign({}, { url, params, options }, {
    url: /^http(s*)/.test(url) ? url : APP_HOST + url,
    params: Foundation.sequence.get(params),
    options: {
      method: "GET",
      credentials: 'include',
      headers: Fetch.requestHeader(),
      ...options
    }
  });
  return requestFetch(__.url + __.params, __.options, isHiddenToast, needCode);
};

/**
 * post请求统一处理
 * @param _params
 */
Fetch.post = (_params: { url: string, params: any, options: any, isHiddenToast: number, needCode: number }) => {
  let { url, params, options, isHiddenToast, needCode } = _params;
  let __ = Object.assign({}, { url, params, options }, {
    url: /^http(s*)/.test(url) ? url : APP_HOST + url,
    options: {
      method: "POST",
      credentials: 'include',
      headers: Fetch.requestHeader(),
      body: JSON.stringify(params),
      ...options
    }
  });
  return requestFetch(__.url, __.options, isHiddenToast, needCode);
};

/**
 * post请求统一处理
 * @param _params
 */
Fetch.postohmyadmin = (_params: { url: string, params: any, options: any, isHiddenToast: number, needCode: number }) => {
  let { url, params, options, isHiddenToast, needCode } = _params;
  let formdata = new FormData();
  for (var property in params) {
    formdata.append(property, params[property]);
  }
  let __ = Object.assign({}, { url, params, options }, {
    url: /^http(s*)/.test(url) ? url : APP_HOST_OHMYADMIN + url,
    options: {
      method: "POST",
      credentials: 'include',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': global.authorization,
        'Channel': IsIos ? IOSCHANNEL : BuildConfig.FLAVOR,
        "deviceId": DeviceInfo.getUniqueID(),
        "User-Agent": DeviceInfo.getUserAgent(),
        'app-name': APP_NAME,
      },
      body: formdata,
      ...options
    }
  });
  return requestFetch(__.url, __.options, isHiddenToast, needCode);
};
/**
 * delete请求统一处理
 * @param _params
 * @returns {Promise}
 */
Fetch.delete = (_params: { url: string, params: any, options: any, isHiddenToast: number, needCode: number }) => {
  let { url, params, options, isHiddenToast, needCode } = _params;
  return Fetch.get({ url: url, params: params, options: { method: 'DELETE' }, isHiddenToast, needCode })
};

/**
 * put请求统一处理
 * @param _params
 * @returns {Promise}
 */
Fetch.put = (_params: { url: string, params: any, options: any, isHiddenToast: number, needCode: number }) => {
  let { url, params, options, isHiddenToast, needCode } = _params;
  let __ = Object.assign({}, { url, params, options }, {
    url: /^http(s*)/.test(url) ? url : APP_HOST + url,
    options: {
      method: "PUT",
      credentials: 'include',
      headers: Fetch.requestHeader(),
      body: JSON.stringify(params),
      ...options
    }
  });
  return requestFetch(__.url, __.options, isHiddenToast, needCode);
};

function requestFetch(url, options, isHiddenToast, needCode) {
  return new Promise((resolve, reject) => {
    IsNetworkConnected().then(data => {
      if (data) {
        IsIos && StatusBar.setNetworkActivityIndicatorVisible(true);
        GLOBAL.fetch(url, options)
          .then(response => {
            console.log(url, response, "fetch")
            if (response.headers.map.authorization && response.headers.map.authorization.length > 0) {
              console.log(response.headers.map.authorization, 'headertoken');
              global.authorization = response.headers.map.authorization
            }
            if (needCode == 1) {
              return Promise.all([
                new Promise((resolve, reject) => {
                  resolve({
                    status: response.status
                  })
                }),
                response.text()
              ])
            } else if (response.status == 400) {
              return response.text()
            } else if (response.status == 500) {
              if (url.indexOf(APP_HOST_VAR) != -1) {
                resolve({});
              } else {
                isHiddenToast !== 1 && Toast.show((global.I18nt('出现错误，请稍后再试！')))
                reject(global.I18nt('出现错误，请稍后再试！'))
              }

            } else if (response.status == 401) {
              if(!global.loginOverdue){
                global.loginOverdue = true;
                Foundation.removeLoginInfo();
                Alert.alert(global.I18nt('登录已过期,请重新登录'), '',
                  [
                    {
                      text: global.I18nt("确定"), onPress: () => {
                        NavigationService.navigate("Home")
                        NavigationService.navigate("Login")
                      }
                    },
                  ]
                );
                reject(global.I18nt('登录已过期'))
              }
            } else if (response.status == 200) {
              return response.text()
            } else {
              if (url.indexOf(APP_HOST_VAR) != -1) {
                resolve({});
              } else {
                isHiddenToast !== 1 && Toast.show((response.statusText || global.I18nt('出现错误，请稍后再试！')))
                reject(response.statusText || global.I18nt('出现错误，请稍后再试！'))
              }
            }
          })
          .then(responseText => {
            IsIos && StatusBar.setNetworkActivityIndicatorVisible(false);
            if (Foundation.isJson(responseText)) {
              let data = JSON.parse(responseText)
              if (isHiddenToast !== 1 && data.title) {
                if(data.title == 'ROSE_NOT_ENOUGH'){
                  DeviceEventEmitter.emit(data.title)
                }else{
                  Toast.show(global.I18nRd(data.title))
                }
                reject(global.I18nRd(data.title))
              } else {
                // 商城逻辑
                resolve(data)
              }
            } else {
              resolve(responseText)
            }
          })
          .catch((error) => {
            IsIos && StatusBar.setNetworkActivityIndicatorVisible(false);
            isHiddenToast !== 1 && Toast.show(global.I18nt('出现错误，请稍后再试！'))
            reject(global.I18nt('出现错误，请稍后再试！') + error)
            console.log('url = ' + url, 'options = ' + options)
          });
      } else {
        IsIos && StatusBar.setNetworkActivityIndicatorVisible(false);
        isHiddenToast !== 1 && Toast.show(global.I18nt('网络中断，请检查您的配置！'))
        reject(global.I18nt('网络中断，请检查您的配置！'))
      }
    });

  });
}

Fetch.idcardOcr = (picdata, header) => {
  var formBody = [];
  let details = { 'pic': picdata, type: '1' };
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  let url = "https://api05.aliyun.venuscn.com/ocr/id-card";
  let options = {
    method: "POST",
    headers: {
      'Authorization': header,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: formBody,
  }
  return new Promise((resolve, reject) => {
    GLOBAL.fetch(url, options)
      .then(response => {
        if (response.status == 200) {
          resolve(response.text());
        } else {
          reject(response.statusText);
        }
      }).catch(error => {
        reject(error)
      })
  }
  )
}

Fetch.uploadPkgList = ({ url, params }) => {
  let formdata = new FormData();
  for (var property in params) {
    formdata.append(property, params[property]);
  }

  let options = {
    method: "POST",
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: formdata,
  }

  return new Promise((resolve, reject) => {
    GLOBAL.fetch(url, options)
      .then(response => {
        if (response.status == 200) {
          resolve(response.text());
        } else {
          reject(response.statusText);
        }
      }).catch(error => {
        reject(error)
      })
  }
  )

}

Fetch.getbizToken = (liveness_type, idcard_name, idcard_number, header, image_ref1) => {
  var formBody = [];
  let details = { liveness_type, idcard_name, idcard_number, image_ref1 };
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  let url = "https://fid.market.alicloudapi.com/face/v1.2/sdk/get_biz_token";
  let options = {
    method: "POST",
    headers: {
      'Authorization': header,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: formBody
  }
  return new Promise((resolve, reject) => {
    GLOBAL.fetch(url, options)
      .then(response => {
        if (response.status == 200) {
          resolve(response.text());
        } else {
          reject(response.statusText);
        }
      }).catch(error => {
        reject(error)
      })
  })
}

export default Fetch;
