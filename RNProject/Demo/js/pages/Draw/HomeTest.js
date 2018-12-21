import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Dimensions,
    TouchableOpacity,
    ImageBackground,
    ActivityIndicator
} from 'react-native';
import Icon from "react-native-vector-icons/Feather";
import IconOne from "react-native-vector-icons/EvilIcons";
import IconTwo from "react-native-vector-icons/MaterialIcons";
import LoadingTest from "../LoadingTest";
import cityCode from './cityCode';
const {width,height} = Dimensions.get('window');
const url = 'http://t.weather.sojson.com/api/weather/city/';
const URL = 'https://api.dujin.org/bing/1366.php';
export default class HomeTest extends Component{
    static navigationOptions = {
        drawerLabel: '重庆',
        drawerIcon:({tintColor})=>(
            <IconTwo name={'location-city'} size={25} style={{color:tintColor}}/>
        ),
    };
    constructor(props){
        super(props);
        this.state={
            city:'重庆',
            data:null,
            detail:null,
            cityCode:'101040100'
       }
    }
    static defaultProps = {
        city:'重庆',
        cityCode:'101040100'
    };

    componentDidMount() {
        this.timer = setTimeout(
            () => this.fetchData(),
            2000
        );
    }
    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer);
    }

    fetchData =()=>{
        const city = cityCode;
        for(var i = 0; i < city.length; i++){
           if(this.props.city === city[i].city_name){
               this.state.cityCode = city[i].city_code;
           }
        }
        fetch(url+this.state.cityCode)
            .then((response)=>response.json())
            .then((json)=>{
                this.setState({
                    data:json.data.forecast,
                    city:this.props.city,
                    detail:json.data,
                });
                alert('加载完成');
            })
            .catch((error)=>{
                //alert(error)
            });
    };

    header(){
        if(this.state.detail){
            let detail = this.state.detail;
            return(
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <View style={{flexDirection:'row',marginRight:300}}>
                        <IconOne name={'location'} size={30} color={'white'}/>
                        <Text style={{marginLeft:10,fontSize:15,color:'white'}}>{this.state.city}</Text>
                    </View>
                    <View style={styles.partOne}>
                        <Text style={{fontSize:40,color:'white'}}>{this.state.detail.wendu} ℃</Text>
                        <Text style={{color:'white'}}>{detail.forecast[0].type}</Text>
                    </View>
                    <View style={styles.partTwo}>
                        <View style={{justifyContent:'center',flexDirection:'row',marginBottom:10}}>
                            <Text style={{color:'white'}}>空气湿度：{this.state.detail.shidu}</Text>
                        </View>
                        <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                            <Text style={{marginRight:50,color:'white'}}>空气质量：{this.state.detail.quality}</Text>
                            <Text style={{marginRight:50,color:'white'}}>PM2.5:  {this.state.detail.pm25}</Text>
                            <Text style={{color:'white'}}>PM10:  {this.state.detail.pm10}</Text>
                        </View>
                        <Text style={{marginTop:10,marginLeft:8,color:'white'}}>暖心建议：{this.state.detail.ganmao}</Text>
                    </View>
                </View>
            );
        }else{
            return  <View style={{flex:1,justifyContent:'center',alignItems:'center',height:height,width:width}}>
                       <ActivityIndicator size={"large"} color={"#C02842"} />
                    </View>
        }
    }
    RenderItem(item){
        if(this.state.detail){
            return(
                <View>
                    <Text style={{marginLeft:10,fontSize:17,color:'white'}}>{item.item.date}</Text>
                <View style={styles.title}>
                    <View style={{flexDirection:'row'}}>
                        <Icon name='sunrise' size={20} color={'white'}/>
                        <Text style={{color:'white'}}>{item.item.sunrise}~</Text>
                        <Icon name='sunset' size={20} color={'white'}/>
                        <Text style={{color:'white'}}>{item.item.sunset}</Text>
                    </View>
                    <Text style={{marginLeft:30,color:'white'}}>{item.item.type}</Text>
                    <Text style={{marginLeft:30,color:'white'}}>{item.item.low}~{item.item.high}</Text>
                </View>
                    <Text style={{marginLeft:10,color:'white'}}>建议：{item.item.notice}</Text>
                </View>
            );
        }else{
            return <Text>loading......</Text>
        }
    }
    Separator=()=>{
        return(
            <View style={{height:20}}/>
        );
    };
    foot=()=>{
        return(
            <View style={{height:30}}/>
        );
    };
    _keyExtractor = (item, index) => index.toString();
    render(){
        if(this.props.city !== this.state.city){
            this.fetchData();
        }
        let data = this.state.data;
        return(
            <ImageBackground
                source={{uri:URL}}
                style={{width:width,height:height+20,flex:1}}
                blurRadius={5}
            >
            <FlatList
                ListHeaderComponent={this.header.bind(this)}
                data={data}
                renderItem={this.RenderItem.bind(this)}
                ItemSeparatorComponent={this.Separator}
                ListFooterComponent={this.foot}
                keyExtractor={this._keyExtractor}
            />
            </ImageBackground>
        );
    }
}
const styles = StyleSheet.create({
    partOne:{
        justifyContent:'center',
        alignItems:'center',
        height:150,
        width:150,
        borderRadius:75,
        borderWidth:2,
        borderColor:'#00ffcc',
        marginTop:10
    },
    partTwo:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:40,
        marginBottom:30
    },
    title:{
        flexDirection:'row',
        //justifyContent:'space-between',
        width:width-25,
        marginLeft:10,
        marginRight:15,
        marginBottom:10,
        marginTop:10,
        alignItems:'center'
    },
    container:{
        marginTop:20,
        marginBottom:20
    }
});