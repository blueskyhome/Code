import React, {Component} from 'react';
import {Platform, Image,StatusBar,Picker,Text,Dimensions,Alert, View,TextInput,TouchableOpacity,ImageBackground} from 'react-native';
const {width,height} = Dimensions.get('window');
import TabView from './Tab/TabView';
import Icon from 'react-native-vector-icons/AntDesign';
export default class Port extends Component{
    constructor(props){
        super(props);
        this.state={
            map:'one'
        }
    }
    componentDidMount(){
        this.timer = setTimeout(
            ()=>{
                Alert.alert(
                    '有一个快递进驿站',
                    '信息如下:\n'+
                    '收件人:汪小小 \n'+
                    '电话:15320265107    ',
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                )
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
        return(
            <View style={styles.container}>
                <StatusBar
                    animated={true}
                    barStyle={'dark-content'}
                    backgroundColor={'#48A0DC'}
                />
                <TabView/>
                <View style={styles.One}>
                    <View style={styles.OneOne}>
                        <View style={{justifyContent:'center',alignItems:'center',marginLeft:30,marginBottom:25,marginTop:30,}}>
                            <Icon name={'scan1'} size={60} color={'gray'}
                                  onPress={()=>this.props.navigation.navigate('ScanTest')}
                            />
                            <Text style={{marginTop:10,fontSize:18}}>扫一扫</Text>
                        </View>
                    </View>
                    <View style={styles.OneTwo}>
                        <TouchableOpacity onPress={()=>{
                            this.props.navigation.navigate('SendTest');
                        }}>
                            <View style={styles.tran}>
                                <Text style={{color:'white',fontSize:20}}>开始接单</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.image}>
                    <Image resizeMode={'stretch'} source={{uri:'http://ww1.sinaimg.cn/large/005T39qaly1fxftzelbpij30u00vgjtw.jpg'}} style={styles.image}/>
                </View>
            </View>
        );
    }
}
const styles = {
    container:{
        flex:1
    },
    One:{
        width:width,
        backgroundColor:'white',
        alignItems:'center',
        paddingRight:10,
        paddingLeft:10,
        flexDirection:'row',
        justifyContent:'space-around',
        height:120
    },
    OneOne:{
        justifyContent:'center',
        alignItems:'center'
    },
    OneTwo:{
        justifyContent:'center',
        alignItems:'center',
        marginLeft:10
    },
    tran:{
        backgroundColor:'#48A0DC',
        width:130,
        height:60,
        borderRadius:30,
        justifyContent:'center',
        alignItems:'center'
    },
    image:{
        width:width,
        height:height-100,
    }
};