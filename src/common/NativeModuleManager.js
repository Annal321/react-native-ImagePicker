import { NativeModules } from 'react-native';

/**
 * 获取礼物数据
 *
 * @returns [{category_id: 5000, icon: "icons/5000/500001.png", id: 500001, name: "甜蜜之旅", icon_path: "原生本地路径"}],
 */
function loadPresents() {
    return NativeModules.RNNativeModuleManager.loadPresents({});
}

/**
 * 播放礼物特效
 *
 * @param {*} effectId
 */
function playPresentEffects(effectId) {
    return NativeModules.RNNativeModuleManager.playPresentEffects({ effectId });
}

/**
 * 关闭礼物特效
 *
 */
function closePresentEffects() {
    NativeModules.RNNativeModuleManager.closePresentEffects({});
}

export {
    loadPresents,
    playPresentEffects,
    closePresentEffects,
};