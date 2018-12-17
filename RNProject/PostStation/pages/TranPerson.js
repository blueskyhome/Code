import React, {Component} from 'react';
import {Platform, Image,StatusBar,Picker,Text,Dimensions, View,TextInput,TouchableOpacity} from 'react-native';
const {width,height} = Dimensions.get('window');
import TabView from './Tab/TabView';
import Icon from 'react-native-vector-icons/AntDesign';
export default class TranPerson extends Component{
    constructor(props){
        super(props);
        this.state={
            numberOne:null,
            numberTwo:null,
            thing:'小件',
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
                <TabView press={this.props.drawer}/>
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
                                      numberOne:num
                                  })
                              }}
                              underlineColorAndroid={'gray'}
                          />
                      </View>
                        <View style={{flexDirection:'row',marginTop:10,marginLeft:15,alignItems:'center'}}>
                            <View style={{height:10,width:5,borderRadius:5,backgroundColor:'yellow'}}/>
                            <TextInput
                                style={{marginLeft:5,width:200}}
                                placeholder={'输入快递地址'}
                                placeholderTextColor={'black'}
                                onChangeText={(num)=>{
                                    this.setState({
                                        numberTwo:num
                                    })
                                }}
                                underlineColorAndroid={'gray'}
                            />
                        </View>
                        <View style={{flexDirection:'row',height:60,alignItems:'center',marginTop:10,marginLeft:15,marginRight:20,justifyContent:'space-between'}}>
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                <View style={{height:10,width:5,borderRadius:5,backgroundColor:'red'}}/>
                                <Picker
                                    style={{width:100,height:30}}
                                    selectedValue={this.state.thing}
                                    onValueChange={(lang) => this.setState({thing: lang})}>
                                    <Picker.Item label="小件" value="小件" />
                                    <Picker.Item label="大件" value="大件" />
                                    <Picker.Item label="生鲜" value="生鲜" />
                                </Picker>
                            </View>
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                <Icon name={'scan1'} size={30} color={'gray'}
                                      onPress={()=>this.props.navigation.navigate('ScanTest')}
                                />
                                <Text style={{marginLeft:5,marginRight:20}}>扫一扫</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.OneTwo}>
                        <TouchableOpacity onPress={()=>{
                            if(this.state.numberOne && this.state.numberTwo){
                                this.setState({
                                    map:this.state.map === 'one'? 'two':'one'
                                });
                                this.props.navigation.navigate('Send');
                            }
                        }}>
                           <View style={styles.tran}>
                               <Text style={{color:'white',fontSize:20}}>预约驿站</Text>
                           </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Image resizeMode={'stretch'} source={{uri:'http://ww1.sinaimg.cn/large/005T39qaly1fxfutmc617j30u00vxac0.jpg'}} style={styles.image}/>
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
      width:90,
      height:60,
      justifyContent:'center',
      alignItems:'center'
  },
  image:{
      width:width,
      height:height-100,
  }
};