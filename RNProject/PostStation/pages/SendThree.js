import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    ImageBackground,
    FlatList,
    StatusBar,
    ProgressBarAndroid
} from 'react-native';
const {width,height} = Dimensions.get('window');
export default class Send extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            page:'one'
        }
    }

    componentDidMount(){
        this.timer = setTimeout(
            ()=>{
                this.setState({
                    page:'two'
                })
            },
            2000
        );
    }
    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer);
    }

    render(){
        if(this.state.page === 'two'){
            return(
                <View style={styles.ImgBack}>
                    <StatusBar
                        animated={true}
                        barStyle={'dark-content'}
                        backgroundColor={'white'}
                    />
                    <View style={styles.Three}>
                        <View style={styles.ThreeOne}>
                            <Image source={{uri:'http://ww1.sinaimg.cn/large/005T39qaly1fxclnbwnfoj319n15a7k7.jpg'}}
                                   style={{width:70,height:70}}
                            />
                            <View style={{marginLeft:10,width:250}}>
                                <Text style={{color:'black',marginBottom:5}}>快递员姓名:孙建</Text>
                                <Text>快递员电话:15923922770</Text>
                                <Text style={{color:'black',marginBottom:5,marginTop:15}}>收件人:汪小小</Text>
                                <Text>收件人电话:15320265107</Text>
                            </View>

                        </View>
                    </View>
                    <Image
                        resizeMode={'stretch'}
                        style={{width:width,height:height-100,}}
                        source={{uri:'http://ww1.sinaimg.cn/large/005T39qaly1fxfu8hyfq7j30u00umjtt.jpg'}}
                    />
                </View>
            );
        }else{
            return(
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <StatusBar
                        animated={true}
                        barStyle={'dark-content'}
                        backgroundColor={'white'}
                    />
                    <ProgressBarAndroid
                        color={'orange'}
                        styleAttr={'Large'}
                    />
                </View>
            );
        }
    }
}
const styles = StyleSheet.create({
    ImgBack:{
        flex:1,
        height:height+10,
        width:width+10,
    },
    container:{
        flex:1,
        width:width,
    },
    One:{
        margin:10,
        borderRadius:5,
        paddingLeft:10,
        paddingRight:10,
        width:width-20,
        height:50,
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'white',
        flexDirection:'row'
    },
    Two:{
        height:40,
        flexDirection:'row',
        borderRadius:25,
        alignItems:'center',
        justifyContent:'center',
        marginTop:30,
        backgroundColor:'white',
        marginLeft:10,
        marginRight:50,
        marginBottom:10
    },
    SendTest:{
        marginLeft:20,
        marginRight:10,
        fontSize:15,
        color:'red'
    },
    Three:{
        borderRadius:10,
        width:width,
        backgroundColor:'white'
    },
    ThreeOne:{
        justifyContent:'space-between',
        alignItems:'center',
        padding:10,
        flexDirection:'row',
        marginTop:15
    },
    Four:{
        borderRadius:10,
        backgroundColor:'white',
        marginTop:20,
        marginLeft:10,
        marginRight:10,
    }
});