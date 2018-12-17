import React, {Component} from 'react';
import {Platform,TouchableOpacity, StyleSheet,Picker, Text,Dimensions, View,TextInput,Image} from 'react-native';
const {width,height} = Dimensions.get('window');
export default class App extends Component<Props> {
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
    OnPress = ()=>{
           switch (this.state.thing) {
                case '收件人':
                    this.props.navigation.navigate('DrawTest');
                    break;
                case '驿站':
                    this.props.navigation.navigate('Port');
                    break;
                case '快递员':
                    this.props.navigation.navigate('Person');
                    break;
                default:
                    break;
            }
    };
    render() {
        if(this.state.page === 'two'){
            return (
                <View style={styles.container}>
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
                    <View style={styles.Two}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                            <TextInput
                                style={{marginLeft:25,height:50,flex:2.5}}
                                placeholder={'请输入手机号码'}
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
                            <Picker
                                style={{width:100,height:30,flex:1}}
                                selectedValue={this.state.thing}
                                androidmode={'dropdown'}
                                onValueChange={(lang) => this.setState({thing: lang})}>
                                <Picker.Item label="收件人" value="收件" />
                                <Picker.Item label="驿站" value="驿站" />
                                <Picker.Item label="快递员" value="快递员" />
                            </Picker>
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
                    <TouchableOpacity  onPress={this.OnPress.bind(this)}>
                        <View style={styles.three}>
                            <Text style={{fontSize:25,color:'white'}}>登陆</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={{marginTop:50}}>忘记密码？</Text>
                </View>
            );
        }else{
            return <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                         <Image source={{uri:'http://ww1.sinaimg.cn/large/005T39qaly1fxfrzhq4dgj319n15a7k7.jpg'}} style={{width:80,height:80,borderRadius:40}}/>
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
      marginTop:100,
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