import React, {Component} from 'react';
import {Platform, Image,StatusBar,Picker,Text,Dimensions, View,TextInput,TouchableOpacity} from 'react-native';
const {width,height} = Dimensions.get('window');
import TabView from './Tab/TabView';
import Icon from 'react-native-vector-icons/AntDesign';
export default class Person extends Component{
    constructor(props){
        super(props);
        this.state={
            number:null,
            map:'one'
        }
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
                        <View style={{flexDirection:'row',marginTop:20,marginLeft:15,alignItems:'center'}}>
                            <View style={{height:10,width:5,borderRadius:5,backgroundColor:'blue'}}/>
                            <TextInput
                                style={{marginLeft:5,width:200}}
                                placeholder={'输入快递单号'}
                                keyboardType={'numeric'}
                                placeholderTextColor={'black'}
                                onChangeText={(num)=>{
                                    this.setState({
                                        number:num
                                    })
                                }}
                                underlineColorAndroid={'gray'}
                            />
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:15,marginBottom:20}}>
                            <Icon name={'scan1'} size={50} color={'gray'}
                                   onPress={()=>this.props.navigation.navigate('ScanTest')}
                            />
                            <Text style={{marginLeft:5,marginRight:20}}>扫一扫</Text>
                        </View>
                    </View>
                    <View style={styles.OneTwo}>
                        <TouchableOpacity onPress={()=>{
                            if(this.state.number){
                                this.setState({
                                    map:this.state.map === 'one'? 'two':'one'
                                });
                                this.props.navigation.navigate('Order');
                            }
                        }}>
                            <View style={styles.tran}>
                                <Text style={{color:'white',fontSize:20}}>开始配送</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Image source={{uri:'http://ww1.sinaimg.cn/large/005T39qaly1fxfucmm42pj30u00znmzx.jpg'}} style={styles.image} resizeMode={'stretch'}/>

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
    },
    OneOne:{
        flex:2,
        borderRightWidth:0.5,
        borderRightColor:'gray'
    },
    OneTwo:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:10
    },
    pickerOne:{
        backgroundColor:'gray',
        borderRadius:5,
        width:60,
        height:40,
        marginLeft:5,
    },
    tran:{
        backgroundColor:'#48A0DC',
        width:110,
        height:50,
        justifyContent:'center',
        alignItems:'center'
    },
    image:{
        width:width,
        height:height-100,
    }
};