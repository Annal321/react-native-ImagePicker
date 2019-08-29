
import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Keyboard, TouchableOpacity, SectionList, TextInput, NativeModules, ImageBackground, NativeEventEmitter, DeviceEventEmitter, Platform, BackHandler, Alert, PermissionsAndroid, UIManager, findNodeHandle, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Foundation, IsIos, Screen } from './src/common';
import { Toast } from './components/Toast'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';
import AliyunOSS from 'aliyun-oss-react-native';
import Loading from './components/NewLoading';
import MyApi from './src/api/MyApi';

AliyunOSS.enableDevMode();
const configuration = {
	maxRetryCount: 3,
	timeoutIntervalForRequest: 30,
	timeoutIntervalForResource: 24 * 60 * 60
};
const endpoint = "oss-cn-beijing.aliyuncs.com"
class ReportCentre extends React.Component {
	static navigationOptions = {
		title: global.I18nt('举报中心'),
	};
	constructor(props) {
		super(props);
		this.state = {
			isOptimize: false,
			isCheck: false,
			isKite: false,

			numAdd: 200,
			num: 0,
			imageUriArr: [],
			input: '',//意见描述
			imageUrls: [],//反馈图片阿里云
			reasonTitle: '',
			index: 0,
			imagefileName: [],
			isChangeText: true,
			immutableNum: 200,
			loading: false,
			minephtalTit: global.I18nt('请在iPhone的“设置-隐私-相机”选项中，允许'),
			minephtalCam: global.I18nt('访问您的相机'),
			minephtalSet: global.I18nt('请再次点击拍照，允许使用相机和读写手机存储，若点击拍照无反应请到【设置-应用-'),
			minephtalSeth: global.I18nt('-权限】中打开相机和读写手机存储权限！'),
			maxImgText: global.I18nt('举报说明最多三张图片'),
			maxImgLength: 3, //可上传几张图片

			informedUserId: this.props.navigation.getParam('informedUserId', ""), //被举报人id
			reportVarsList: [],
			selectIndex: null
		};
	}

	componentWillMount() {
		this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',
			this.keyboardDidHideHandler.bind(this))
	}

	//键盘收起
	keyboardDidHideHandler() {
		this.refs.keyboadrscroll.scrollToEnd({ animated: true })
	}

	componentWillUnmount() {
		//卸载键盘隐藏事件监听
		if (this.keyboardDidHideListener != null) {
			this.keyboardDidHideListener.remove();
		}
	}
	
	//上传图片start
	_selectImagePickerAction = () => {
		var options = {
			title: global.I18nt('请选择'),
			cancelButtonTitle: global.I18nt('取消'),
			takePhotoButtonTitle: global.I18nt('拍照'),
			chooseFromLibraryButtonTitle: global.I18nt('选择相册'),
			quality: 0.75,
			allowsEditing: true,
			noData: false,
			mediaType: 'photo',
			storageOptions: {
				skipBackup: true,
				path: 'images'
			},
			permissionDenied:{
				title:global.I18nt("提示"),
				text:global.I18nt("需要您同意拍照和存储权限"),
				reTryTitle:global.I18nt("去设置"),
				okTitle:global.I18nt('取消')
			}
		}

		ImagePicker.showImagePicker(options, (response) => {
			if (response.didCancel) {
				console.log('User cancelled photo picker');
			} else if (response.error) {
				if (IsIos) {
					Alert.alert(`${this.state.minephtalTit}${APP_CH_NAME}${this.state.minephtalCam}`, '', [{ text: '知道了' }]);
				} else {
					if (response.error == `Can't resize the image`) {
						Toast.show(global.I18nt('请选择图片格式'))
					} else {
						Alert.alert('', `${this.state.minephtalSet}${APP_CH_NAME}${this.state.minephtalSeth}`, [{ text: '知道了' }]);
					}
				}
			} else {
				if (response.uri.includes('.jpg') || response.uri.includes('.jpeg') || response.uri.includes('.png') || response.type == 'image/jpeg' || response.type == 'image/jpg' || response.type == 'image/png') {
					var array1 = this.state.imageUriArr
					if (array1.length < this.state.maxImgLength) {
						array1.splice(this.state.index, 0, response.uri)
					} else {
						Toast.show(global.I18nt(`最多选择${maxImgLength}张图片`))
						return
					}
					var array2 = this.state.imagefileName
					array2.splice(this.state.index, 0, { title: response.fileName })

					this._confirmUploadImageAction(response)
					this.setState({
						index: this.state.index + 1,
						imageUriArr: array1,
						imagefileName: array2,
					});
				} else {
					Toast.show(global.I18nt('您还没有选择举报类型'))
				}
			}
		});
	}

	//上传阿里云
	_confirmUploadImageAction = (file) => {
		this.setState({ loading: true })
		MyApi.getOssToken(file.fileName)
			.then(data => {
				AliyunOSS.initWithSecurityToken(data.securityToken, data.accessKeyId, data.accessKeySecret, endpoint, configuration);
				AliyunOSS.asyncUpload(data.bucket, data.key, file.uri)
					.then(res => {
						this.setState({ loading: false })
						var array = this.state.imageUrls
						array.splice(array.length - 1, 0, data.path)
						this.setState({
							imageUrls: array,
						});

					}).catch(error => {
						this.setState({ loading: false })
					})

			}).catch(error => {
				this.setState({ loading: false })
			})
	}

	//删除图片
	_deleate = (index) => {
		var array1 = this.state.imageUriArr
		var array2 = this.state.imagefileName
		var array3 = this.state.imageUrls

		array1.splice(index, 1)
		array2.splice(index, 1)
		array3.splice(index, 1)

		this.setState({
			imageUriArr: array1,
			imagefileName: array2,
			imageUrls: array3,
			index: this.state.index - 1,
		})
	}

	render() {
		let { maxImgLength } = this.state
		var width = Dimensions.get('window').width - 20;
		return (
			<KeyboardAwareScrollView
				ref="keyboadrscroll"
				style={styles.container}
				enableOnAndroid={true}
				keyboardDismissMode={'on-drag'}
				keyboardShouldPersistTaps={'handled'}
			>
				<View>
					<View style={{ width: '100%', backgroundColor: '#FFFFFF', marginTop: 10, paddingTop: 10 }}>
						<View style={{ width: Screen.width, flexDirection: 'row', flexWrap: 'wrap', marginRight: 30, paddingBottom: 15 }}>
							{this.state.index == 0 ? <TouchableOpacity onPress={() => this._selectImagePickerAction()} style={{ width: this.state.index == 0 ? 56 : 0, height: this.state.index == 0 ? 56 : 0, marginTop: 10, marginLeft: this.state.index == 0 ? 10 : 0 }}>{this.state.imageUriArr.length < 4 ? <Image source={require('./images/camera.png')} style={{ width: 56, height: 56, marginBottom: 15 }} /> : null}</TouchableOpacity> :
								this.state.imageUriArr.map((v, i) => {
									return (
										<View key={i}>
											<TouchableOpacity onPress={() => this._deleate(i)} style={{ zIndex: 9999, marginLeft: 6, marginBottom: -6 }} >
												<Image source={require('./images/search_clear.png')} style={{ width: 16, height: 16 }} />
											</TouchableOpacity>
											<Image key={i} style={{ width: 56, height: 56, marginLeft: 15, marginTop: -5, backgroundColor: '#F5F5F5', borderRadius: 5 }} source={{ uri: v }} />
										</View>
									)
								})
							}
							<TouchableOpacity onPress={() => this._selectImagePickerAction()} style={{ width: (this.state.index == 0 || this.state.index == 5) ? 0 : 56, height: (this.state.index == 0 || this.state.index == 5) ? 0 : 56, marginLeft: (this.state.index == 0 || this.state.index == 4) ? 0 : 10, marginTop: 5 }}>
								{this.state.imageUriArr.length < maxImgLength ? <Image source={require('./images/camera.png')} style={{ marginBottom: 15, width: (this.state.index == 0 || this.state.index == 5) ? 0 : 56, height: (this.state.index == 0 || this.state.index == 5) ? 0 : 56 }} /> : null}
							</TouchableOpacity>
						</View>
					</View>
					
				</View>
				<Loading show={this.state.loading} />
			</KeyboardAwareScrollView>
		);
	}

};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5F5F5'
	},
	intut_text: {
		marginTop: 15,
		backgroundColor: "#FFFFFF",
		marginBottom: 10
	},
	input: {
		padding: 10,
		height: 50
	},
	btn: {
		padding: 10,
		width: '100%',
		marginTop: 5
	},
	submitLinearGradient: {
		left: 0,
		top: 0,
		width: 250,
		height: 38,
		borderRadius: 4,
		backgroundColor: '#FF2929',
		justifyContent: 'center',
		alignItems: 'center',
	},
	contentStyle: {
		width: "90%",
		marginLeft: '5%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingTop: 15,
		paddingBottom: 15,

	},
	titleText: {
		color: '#333333',
		fontSize: 16,
	},
	img: {
		width: 20,
		height: 20
	},
	lineView: {
		marginLeft: 15,
		height: 1,
		backgroundColor: '#F5F5F5',
	}
});


user = (state) => {
	return state.user
}
export default connect(user)(ReportCentre);