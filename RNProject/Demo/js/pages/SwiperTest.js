import React from 'react';
import {
    AppRegistry,
    Text,
    View,
    TouchableOpacity,
    Image,
    ImageBackground,

    Dimensions
} from 'react-native';
import * as Animatable from 'react-native-animatable';
let {width,height} = Dimensions.get('window');

export default class SwiperTest extends React.Component{
    render(){
        return(
            <ImageBackground source={{uri:'http://ww1.sinaimg.cn/large/005T39qagy1fuvrgxcb90j30dw0ku3yf.jpg'}}
                             style={{width:width,height:height+15,alignItems:'center'}}
            >
                <Animatable.Text animation="zoomInUp"
                                 style={{fontSize:20,color:'black',position:'absolute',bottom:170}}
                >welcome to HelloWorld 魔法世界！</Animatable.Text>
            </ImageBackground>
        );
    }
}
