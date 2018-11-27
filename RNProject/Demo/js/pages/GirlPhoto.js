import React, { Component } from 'react';
import {
    Image,
    Dimensions,
    TouchableWithoutFeedback,
    CameraRoll,
    Alert,
    Platform,
    Modal,
    View,
    Button,
    Text,
    PermissionsAndroid
} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import ImageViewer from 'react-native-image-zoom-viewer';
const {width,height} = Dimensions.get('window');
export default class GirlPhoto extends Component{
    static navigationOptions = {
        header:null
    };
    componentDidMount(){
        this.requestExternalStoragePermission();
    }
     saveImageAlbum() {
         let {params} = this.props.navigation.state;
         let imageUrl =params.url;
         let dirs = RNFetchBlob.fs.dirs;
         if (imageUrl.length > 0) {
             RNFetchBlob
                 .config({
                     // add this option that makes response data to be stored as a file,
                     // this is much more performant.
                     fileCache: true,
                     path:'/storage/emulated/0/ocamera/pic/one.jpg',
                 })
                 .fetch('GET', imageUrl, {
                     //some headers ..
                 })
                 .then((res) => {
                     // the temp file path
                     console.log(res.path());
                     CameraRoll.saveToCameraRoll(res.path(),'photo').then(() => {
                         imageView = <Image source={{ uri : Platform.OS === 'android' ? 'file://' + res.path()  : '' + res.path() }}/>;
                         alert(res.path()+ '保存成功!');
                     }).catch((err) => {
                         Alert.alert(err, '保存失败!');
                         console.warn(err.toString());
                     });
                 })
         }
    }
    requestExternalStoragePermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'My App Storage Permission',
                    message: 'My App needs access to your storage ' +
                    'so you can save your photos',
                },
            );
        } catch (err) {
            console.error('Failed to request permission ', err);
        }
    };
    saveImg() {
        let {params} = this.props.navigation.state;
        let img =params.url;
        let promise = CameraRoll.saveToCameraRoll(img);
        promise.then(function(result) {
            alert('保存成功！地址如下：\n' + result);
        }).catch(function(error) {
            alert('保存失败！\n' + error);
        });
    }
   constructor(props){
         super(props);
   }
    render(){
        const {params} = this.props.navigation.state;
        return(
            <ImageViewer
                imageUrls={[{url:params.url}]}
                enableImageZoom={true}
                enableSwipeDown={true}
                style={{backgroundColor:'white'}}
                onSave={()=>this.saveImageAlbum()}
                saveToLocalByLongPress={true}
            >
            </ImageViewer>

        );
    }
}