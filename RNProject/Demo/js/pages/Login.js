import React, {Component} from 'react';
import {Platform,TouchableOpacity, StyleSheet,AsyncStorage, Text,Dimensions, View,TextInput,Image,DeviceEventEmitter} from 'react-native';
const {width,height} = Dimensions.get('window');
import * as Animatable from 'react-native-animatable';
import Bmob from "hydrogen-js-sdk";
export default class Login extends Component {
    constructor(props){
        super(props);
        this.state ={
            call_number:null,
            code_number:null,
            color1:'#7B8DF9',
            color2:'gray',
            line_height1:2,
            line_height2:1,
            Active:'one',
            thing:'收件人',
            page:'one',
            password:null,
            username:null
        }
    }
    componentDidMount(){
        this.readData();
        this.timer = setTimeout(
                ()=>{
                    this.setState({
                        page:'two'
                    })
                },
            3000
        );

    }
    storeData = async () =>{
      try{
          await AsyncStorage.setItem('username',this.state.call_number);
          await AsyncStorage.setItem('password',this.state.code_number);
      }  catch (e) {
          console.log(e);
      }
    };

    readData = async()=>{
        try{
            const value1 = await AsyncStorage.getItem("username");
            const value2 = await AsyncStorage.getItem("password");
            if(value1 !== null && value2 !== null){
                DeviceEventEmitter.emit('go', 'go');
            }
        }catch (e) {
            console.log(e);
        }
    };
    OnPress = ()=>{
        Bmob.initialize("6af700e4a7f2a5b2f9d3940daa218cdd", "42c5c6d106988281cf70f23620872bcc");
          if(this.state.Active === 'one'){
              if(this.state.call_number !== null && this.state.code_number !== null){
                  Bmob.User.login(this.state.call_number,this.state.code_number).then(res => {
                      console.log(res);
                      DeviceEventEmitter.emit('go', 'go');
                      this.storeData();
                  }).catch(err => {
                      alert(err.error);
                      console.log(err);
                  });
              }
          }else{
              let params = {
                  username:this.state.call_number,
                  password:this.state.code_number,
                  image:null
              };
              Bmob.User.register(params).then(res =>{
                  console.log(res);
                   alert("注册成功");
              }).catch(err =>{
                  alert(err.error);
                  console.log(err+".");
              });
              this.setState({
                  Active:'one'
              });
          }
    };
    render() {
        if(this.state.page === 'two'){
            return (
                <View style={styles.container}>
                    <View style={{justifyContent:'center',alignItems:'center',marginTop:80}}>
                        <Image source={{uri:'http://ww1.sinaimg.cn/large/005T39qaly1fycbcz5vt8j30dw0dzt96.jpg'}}
                               style={{width:70,height:70,borderRadius:35}}
                        />
                    </View>
                    <View style={styles.One}>
                        <View style={[styles.OneItem,{borderBottomColor:this.state.color1,borderBottomWidth:this.state.line_height1}]}>
                            <Text style={{fontSize:20,color:this.state.color1}}
                                  onPress={()=>{
                                      this.setState({
                                          Active:'one',
                                          color1:'#7B8DF9',
                                          color2:'gray',
                                          line_height1:2,
                                          line_height2:0.5
                                      })
                                  }}
                            >登陆</Text>
                        </View>
                        <View style={[styles.OneItem,{marginLeft:30,borderBottomColor:this.state.color2,borderBottomWidth:this.state.line_height2}]}>
                            <Text style={{fontSize:20,color:this.state.color2}}
                                  onPress={()=>{
                                      this.setState({
                                          Active:'two',
                                          color1:'gray',
                                          color2:'#7B8DF9',
                                          line_height1:0.5,
                                          line_height2:2,
                                      })
                                  }}
                            >注册</Text>
                        </View>
                    </View>
                    {
                        this.state.Active === 'one' ?
                            <View style={styles.Two}>
                                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                    <TextInput
                                        style={{marginLeft:25,height:50,flex:2.5}}
                                        placeholder={'请输入用户名'}
                                        keyboardType={'numeric'}
                                        placeholderTextColor={'black'}
                                        onChangeText={(num)=>{
                                            this.setState({
                                                call_number:num
                                            });
                                            console.log("call"+this.state.call_number);
                                        }}
                                        underlineColorAndroid={'gray'}
                                    />
                                </View>
                                <TextInput
                                    style={{marginLeft:25,marginTop:20,height:50}}
                                    keyboardType={'default'}
                                    placeholder={'请输入密码'}
                                    placeholderTextColor={'black'}
                                    onChangeText={(num)=>{
                                        this.setState({
                                            code_number:num
                                        })
                                    }}
                                    underlineColorAndroid={'gray'}
                                    secureTextEntry={true}
                                />
                            </View>
                            :
                            <View style={styles.Two}>
                                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                                    <TextInput
                                        style={{marginLeft:25,height:50,flex:2.5}}
                                        placeholder={'用户名'}
                                        keyboardType={'numeric'}
                                        placeholderTextColor={'black'}
                                        onChangeText={(num)=>{
                                            this.setState({
                                                call_number:num
                                            });
                                            console.log("call"+this.state.call_number);
                                        }}
                                        underlineColorAndroid={'gray'}
                                    />
                                </View>
                                <TextInput
                                    style={{marginLeft:25,marginTop:20,height:50}}
                                    keyboardType={'default'}
                                    placeholder={'密码'}
                                    placeholderTextColor={'black'}
                                    onChangeText={(num)=>{
                                        this.setState({
                                            code_number:num
                                        })
                                    }}
                                    underlineColorAndroid={'gray'}
                                    secureTextEntry={true}
                                />
                            </View>
                    }
                    <TouchableOpacity  onPress={this.OnPress.bind(this)}>
                        <View style={styles.three}>
                            {
                                this.state.Active === 'one' ?
                                    <Text style={{fontSize:25,color:'white'}}>登陆</Text>
                                    :
                                    <Text style={{fontSize:25,color:'white'}}>注册</Text>
                            }
                        </View>
                    </TouchableOpacity>
                    {
                        this.state.Active === 'one' ?
                            <Text style={{marginTop: 30}}>忘记密码？</Text>
                            :
                            null
                    }
                </View>
            );
        }else{
            return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                         <Image source={{uri:'http://ww1.sinaimg.cn/large/005T39qaly1fycbcz5vt8j30dw0dzt96.jpg'}} style={{width:80,height:80,borderRadius:40}}/>
                         <Animatable.Text animation="zoomInUp"
                                 style={{fontSize:20,color:'black',position:'absolute',bottom:170}}
                          >CoTime让闲暇时光不一样！</Animatable.Text>
                   </View>
        }

    }
}
const styles = {
  container:{
      flex:1,
      alignItems:'center',
  },
  One:{
      width:width,
      justifyContent:'center',
      flexDirection:'row',
      marginTop:50,
      marginLeft:30,
      marginRight:30,
  },
  OneItem:{
      justifyContent:'center',
      alignItems:'center',
      height:50,
      width:150,
  },
  Two:{
      marginTop:80,
      width:width-40,
      marginLeft:20,
      marginRight:20,
      justifyContent:'center',
  },
  three:{
      marginTop:40,
      width:width-60,
      marginLeft:30,
      marginRight:30,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#7B8DF9',
      height:50,
      borderRadius:25,
  }
};