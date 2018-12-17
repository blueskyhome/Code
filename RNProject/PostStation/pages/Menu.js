import React, {Component} from 'react';
import {Platform, Image,StyleSheet,Picker,Text,Dimensions,StatusBar, View,TextInput,TouchableOpacity} from 'react-native';
const {width,height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/AntDesign';
import IconTwo from 'react-native-vector-icons/Ionicons';
import IconThree from 'react-native-vector-icons/Entypo';
import Item from './Tab/Item';
export default class Menu extends Component{
    OnPress=()=>{
      this.props.navigation.navigate('OrderOne');
    };
    render(){
        return(
            <View style={styles.container}>
                <StatusBar
                    animated={true}
                    barStyle={'dark-content'}
                    backgroundColor={'white'}
                />
                <View style={styles.One}>
                   <Image source={{uri:'http://ww1.sinaimg.cn/large/005T39qaly1fxcluq8il8j31o01hctox.jpg'}}
                          style={styles.userImg}
                   />
                    <View>
                        <Text style={{fontSize:18,color:'black',marginBottom:10}}>喵星人</Text>
                        <Text style={{fontSize:13}}>130积分  9兑换券</Text>
                    </View>
                </View>
                <View style={styles.Two}>
                    <View style={styles.item}>
                        <IconThree name={'v-card'} size={25} color={'green'}/>
                        <Text style={{fontSize:12}}>个人资料</Text>
                    </View>
                    <View style={styles.item}>
                        <Icon name={'heart'} color={'red'} size={25}/>
                        <Text style={{fontSize:12}}>我的收藏</Text>
                    </View>
                    <View style={styles.item}>
                        <IconTwo name={'md-qr-scanner'} size={25} color={'gray'}/>
                        <Text style={{fontSize:12}}>扫一扫</Text>
                    </View>
                    <View style={styles.item}>
                        <IconTwo name={'md-browsers'} size={25} color={'blue'}/>
                        <Text style={{fontSize:12}}>浏览记录</Text>
                    </View>
                </View>
                <View style={styles.two}>
                    <Item text={'消息通知'} url={'message1'} />
                    <View style={{height:2}}/>
                    <Item text={'个人中心'} url={'aliwangwang-o1'}/>
                    <View style={{height:2}}/>
                    <Item text={'我的驿站'} url={'flag'}/>
                    <View style={{height:2}}/>
                    <Item text={'我的订单'} url={'profile'} OnPress={this.OnPress.bind(this)}/>
                    <View style={{height:2}}/>
                    <Item text={'我的评论'} url={'aliwangwang'}/>
                    <View style={{height:10}}/>
                    <Item text={'设置'} url={'setting'}/>
                    <View style={{height:2}}/>
                    <Item text={'帮助'} url={'questioncircle'}/>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    One:{
        paddingTop:15,
        flexDirection:'row',
        backgroundColor:'white',
        paddingBottom:20
    },
    userImg:{
        width:60,
        height:60,
        borderRadius:30,
        marginLeft:25,
        marginRight:10
    },
    Two:{
        backgroundColor:'white',
       justifyContent:'space-around',
        width:width*0.8,
        alignItems:'center',
        borderTopWidth:0.5,
        borderTopColor:'gray',
        paddingTop:10,
        flexDirection:'row'
    },
    item:{
        justifyContent:'center',
        alignItems:'center',
        margin:10
    },
    imgOne:{
        height:50,
        width:50
    },
    two:{
        marginTop:20
    }
});