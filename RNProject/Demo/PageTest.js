import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
    Dimensions,
    Text,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import Swiper from 'react-native-swiper';
let {height} = Dimensions.get('window');
let {width} = Dimensions.get('window');
export default class PageTest extends Component{
    render(){
        return(
            <View height={height}>
                <Swiper
                    style={styles.wrap}
                    height={height}                   //组件高度
                    loop={false}                    //如果设置为false，那么滑动到最后一张时，再次滑动将不会滑到第一张图片。
                    autoplay={false}                //自动轮播
                    horizontal={true}              //水平方向，为false可设置为竖直方向
                    paginationStyle={{bottom:10}}
                    dotStyle={styles.notactive}
                    activeDotStyle={styles.active}
                >
                    <Image resizemode={'stretch'} style={styles.image} source={{uri:'http://ww1.sinaimg.cn/large/005T39qagy1ftvovunr07j30qo0go77d.jpg'}}/>
                    <Image resizemode={'stretch'} style={styles.image} source={{uri:'http://ww1.sinaimg.cn/large/005T39qagy1ftvovunr07j30qo0go77d.jpg'}}/>
                    <ImageBackground
                        style={styles.image}
                        source={{uri:'http://ww1.sinaimg.cn/large/005T39qagy1ftvovunr07j30qo0go77d.jpg'}}
                    >
                        <TouchableOpacity
                            activeOpacity={0.5}
                            //onPress={()=>this.props.navigation.navigate('First')}
                            style={styles.button}
                        >

                                <Text>立即体验</Text>

                        </TouchableOpacity>
                    </ImageBackground>
                </Swiper>
            </View>

        )
    }
}
const styles= StyleSheet.create({
    wrap:{
    },
    image:{
        width:width,
        height:height,
        flex:1,
        alignItems:'center',
        flexDirection:'column-reverse',
        paddingBottom:50
    },
    button:{
        backgroundColor:'yellow',
        borderRadius:10,
        width:width/2,
        height:50,
        justifyContent:'center',
        alignItems:'center'

    },
    notactive: {
        backgroundColor:'gray',
        height:10,
        width:10,
        borderRadius:5,
    },
    active: {
        backgroundColor:'yellow',
        height:10,
        width:20,
        borderRadius:5,
    },
});

