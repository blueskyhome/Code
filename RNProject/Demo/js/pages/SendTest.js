import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View ,
    Image,
    TextInput,
    Picker,
    TouchableOpacity,
    FlatList,
    PixelRatio,
    Dimensions,
    ImageBackground
} from 'react-native';
import Icon from "react-native-vector-icons/Feather";
const URL = 'http://www.kuaidi100.com/query?type=';
const Add = '&postid=';
const {width,height} = Dimensions.get('window');
export default class SendTest extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            transport:'yuantong',
            number:'',
        }
    }
    GetUrl=(type,number)=>{
       return URL+type+Add+number;
    };
    fetchData =()=>{
        let type = this.state.transport;
        let number = this.state.number;
        alert(type+number);
        fetch(this.GetUrl(type,number))
            .then((response)=>response.json())
            .then((json)=>{
                this.setState({
                    data:json.data
                });
            })
            .catch((error)=>{
                alert(error)
            })
    };
    RenderItem=(item)=>{
        if(this.state.data){
            let color = item.index === 0 ? 'green':'white';
            return(
                <View style={{marginLeft:8,justifyContent:'center'}}>
                    <Text style={{marginBottom:7,color:color}}>{item.item.context}</Text>
                    <Text style={{color:color}}>{item.item.time}</Text>
                </View>
            );
        }
    };
    separator=()=>{
        if(this.state.data)
       return <View style={{backgroundColor:'black',borderWidth:1/PixelRatio.get(),borderColor:'green'}}/>;
        else return <View/>;
    };
    header=()=>{
      return(
          <View style={{flexDirection:'row',marginTop:10,}}>
             <Icon name={'shopping-bag'} size={60} color={'blue'} style={{marginLeft:30}}/>
              <View style={{justifyContent:'center',marginLeft:50,marginBottom:20}}>
                  <Text style={{marginBottom:5,color:'white'}}>物流单号：{this.state.number}</Text>
                  <Text style={{color:'white'}}>竭诚为你服务!</Text>
              </View>
          </View>
      );
    };
    _keyExtractor = (item, index) => index;
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.partOne}>
                    <Picker
                        selectedValue = {this.state.transport}
                        onValueChange ={(transport)=>this.setState({transport:transport})}
                        androidmode={'dropdown'}
                        androidprompt={'快递名称'}
                        style={{width:80}}
                    >
                        <Picker.Item label='圆通' value='yuantong'/>
                        <Picker.Item label='中通' value='zhongtong'/>
                        <Picker.Item label='申通' value='shentong'/>
                        <Picker.Item label='顺丰' value='shunfeng'/>
                        <Picker.Item label='韵达' value='yunda'/>
                        <Picker.Item label='天天' value='tiantian'/>
                        <Picker.Item label='EMS' value='ems'/>
                        <Picker.Item label='德邦' value='debangwuliu'/>
                        <Picker.Item label='宅急送' value='zhaijisong'/>
                    </Picker>
                    <TextInput
                        placeholder={'请输入快递单号'}
                        placeholderTextColor={'black'}
                        underlineColorAndroid={'green'}
                        onChangeText={(number)=>this.setState({number:number})}
                        style={{width:width-120}}
                    />
                    <TouchableOpacity
                        onPress={this.fetchData.bind(this)}
                        style={{marginLeft:5,paddingTop:10}}
                    >
                        <Icon name={'search'} size={30} color='blue'/>
                    </TouchableOpacity>
                </View>
                <ImageBackground
                    source={{uri:'http://ww1.sinaimg.cn/large/005T39qagy1fuvrffydz5j31lf2qf7wi.jpg'}}
                    style={{width: '100%', height: '100%'}}
                    blurRadius={5}
                >
                <FlatList
                    data={this.state.data}
                    renderItem={this.RenderItem.bind(this)}
                    ItemSeparatorComponent={this.separator.bind(this)}
                    keyExtractor={this._keyExtractor}
                    ListFooterComponent={()=>{
                        return <View style={{height:10}}/>
                    }}
                    ListHeaderComponent={this.header.bind(this)}
                />
                </ImageBackground>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    partOne:{
        flexDirection:'row',
        marginBottom:5,
        backgroundColor:'orange'
    }
});