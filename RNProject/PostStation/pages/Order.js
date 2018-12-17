import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    StatusBar
} from 'react-native';
const {width,height} = Dimensions.get('window');
export default class Order extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={styles.container}>
                <StatusBar
                    animated={true}
                    barStyle={'dark-content'}
                    backgroundColor={'white'}
                />
                <ScrollView>
                    <Text style={{fontSize:27,color:'black',marginTop:15,marginBottom:15,marginLeft:10}}>订单情况</Text>

                    <View style={styles.Three}>
                        <Text style={{fontSize:23,color:'black',margin:10}}>快递员信息</Text>
                        <View style={styles.ThreeOne}>
                            <Text>配送服务</Text>
                            <Text style={{color:'black'}}>快递员配送</Text>
                        </View>
                        <View style={styles.ThreeOne}>
                            <Text>快递员姓名</Text>
                            <Text style={{color:'black'}}>孙建</Text>
                        </View>
                        <View style={styles.ThreeOne}>
                            <Text>快递员电话</Text>
                            <Text style={{color:'black',}}>15923922770</Text>
                        </View>
                    </View>

                    <View style={styles.Four}>
                        <Text style={{fontSize:23,color:'black',margin:10}}>驿站信息</Text>
                        <View style={styles.ThreeOne}>
                            <Text>驿站名称</Text>
                            <Text style={{color:'black'}}>啦啦驿站010 23</Text>
                            <View style={{borderWidth:1,borderColor:'gray',justifyContent:'center',alignItems:'center'}}><Text>复制</Text></View>
                        </View>
                        <View style={styles.ThreeOne}>
                            <Text>驿站地址</Text>
                            <Text numberOfLines={10} style={{marginLeft:5,color:'black',width:200}}>重庆市渝北区空港新城福畅路二号爱加欧郡二期4栋3一4</Text>
                        </View>
                        <View style={styles.ThreeOne}>
                            <Text>驿站电话</Text>
                            <Text style={{color:'black'}}>13452400685</Text>
                        </View>
                    </View>
                    <View style={{width:width,justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity
                        onPress={()=>{
                            alert('你的快递正在赶来');
                        }}
                        style={{width:width-100,marginLeft:50,marginRight:50,height:50,borderRadius:25,backgroundColor:'#7B8DF9',marginTop:50,
                         justifyContent:'center',alignItems:'center'
                        }}
                    >
                        <Text style={{fontSize:25,color:'white'}}>送货上门</Text>
                    </TouchableOpacity>
                    </View>
                </ScrollView>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    One:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:"white",
        width:width-20,
        marginLeft:10,
        marginRight:10,
        marginTop:8,
        borderRadius:4
    },
    Two:{
        backgroundColor:'white',
        borderRadius:3,
        marginLeft:10,
        marginRight:10,
        marginBottom:5,
        height:140,
        width:width-20
    },
    TwoOne:{
        flexDirection:'row',
        height:70,
        borderBottomWidth:1,
        justifyContent:'space-between',
        width:width-40,
        alignItems:'center'
    },
    TwoTwo:{
        justifyContent:'flex-end',
        alignItems:'center',
        width:width-40,
        height:70,
        flexDirection:'row'
    },
    Three:{
        backgroundColor:'white',
        borderRadius:3,
        marginLeft:10,
        marginRight:10,
        marginBottom:5,
        height:200,
        width:width-20
    },
    ThreeOne:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:40,
        width:width-40,
        paddingRight:10,
        paddingLeft:10
    },
    ThreeTwo:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingTop:5,
        height:40,
        width:width-40,
    },
    Four:{
        backgroundColor:'white',
        borderRadius:3,
        marginLeft:10,
        marginRight:10,
        marginBottom:5,
        height:200,
        width:width-20
    }
});