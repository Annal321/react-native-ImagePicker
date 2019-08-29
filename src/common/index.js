import { Platform } from 'react-native'
const IsIos = Platform.OS === 'ios';

import Fetch from './Fetch';
import Foundation from './Foundation';
import RegExp from './RegExp';
import Screen from './Screen';
import CacheConfig from './CacheConfig';
import IsNetworkConnected from './isNetworkConnected';
import AddressInfo from './AddressInfo';

export {
    Fetch,
    Foundation,
    IsIos,
    RegExp,
    Screen,
    IsNetworkConnected,
    CacheConfig,
    AddressInfo,
}