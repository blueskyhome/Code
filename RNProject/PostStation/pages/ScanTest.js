import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    StatusBar,
    View,

} from 'react-native';
import Camera from 'react-native-camera';
export default class ScanTest extends Component{
    constructor(props){
        super(props);
        this.state = {
            cameraType: Camera.constants.Type.back
        };
    }
    componentDidMount(){
        this.timer = setTimeout(
            ()=>{
               alert('订单完成');
               this.props.navigation.goBack();
            },
            4000
        );
    }
    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer);
    }
    render(){
        return(
            <View style={styles.container}>
                <StatusBar
                    animated={true}
                    barStyle={'dark-content'}
                    backgroundColor={'white'}
                />
                <View style={styles.container}>
                    <Camera
                        ref={(cam) => {
                            this.camera = cam;
                        }}
                        style={styles.preview}
                        type={this.state.cameraType}
                     />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
    preview: {
        justifyContent: 'space-between',
        height:100,
        width:200,
        borderColor:'blue',
        borderWidth:1
    },
});