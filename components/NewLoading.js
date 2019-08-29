/**
 * Created by qjw on 2017/10/17.
 */

import React, { PureComponent } from 'react';
import { Modal, StyleSheet, View, Image, ActivityIndicator,TouchableOpacity } from 'react-native';
import { IsIos, Screen } from '../common';
import { APP_NAME } from '../APP_CONFIG';

export default class Loading extends PureComponent {
    render() {
        let {show, ...props} = this.props;
        if(APP_NAME.indexOf('NORM') != -1){
            return (
                show
                ?<TouchableOpacity activeOpacity={.9} style={styles.oldmaskStyle} disable = {true}>
                    <View style={styles.oldmaskStyle}>
                        <View style={styles.oldbackViewStyle}>
                            <ActivityIndicator size="large" color="white" />
                        </View>
                    </View>
                </TouchableOpacity>:null
            );
        }else{
            return (
                // show?<View style={styles.maskStyle}>
                //         <View style={[styles.backViewStyle,this.props.loadStyle]}>
                //             <ActivityIndicator size="large" color={this.props.loadColor||'white'} />
                //         </View>
                //     </View>:null
                show
                ? <TouchableOpacity activeOpacity={.9} style={styles.maskStyle} disable = {true} onPress={()=>{}}>
                   <View style={styles.maskStyle}>
                        <View style={[styles.backViewStyle,this.props.loadStyle]}>
                            <Image style={APP_NAME == 'SHUANG'?{width: 80, height: 80}:{width: 50, height: 50}} resizeMode="contain" source={APP_NAME == 'KLYX'?require('./images/NewLoading/loading_klyx.gif'):APP_NAME == 'SHUANG'?require('./images/NewLoading/lqs_loading.gif'):require('./images/NewLoading/loading.gif')}/>
                        </View>
                    </View>
                </TouchableOpacity>
                
                : null
            );
        }
        
    }
}

const styles = StyleSheet.create({
    maskStyle: {
        position: 'absolute',
        // backgroundColor: 'rgba(0, 0, 0, 0.0)',
        width: Screen.width,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    backViewStyle: {
        // backgroundColor: '#111', 
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    oldmaskStyle: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.0)',
        width: Screen.width,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
        oldbackViewStyle: {
        backgroundColor: '#111',
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    }
});