import React, { Component } from 'react';
import HeaderTest from "../user/HeaderTest";
const {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    Dimensions,
} = require('react-native') ;
const {width} = Dimensions.get('window');
export default class Author extends Component{
    static navigationOptions=()=>{
        return{
           header:null
        }

    };
    render(){
        const {params} = this.props.navigation.state;
        return(
           <View style={styles.container}>
               <HeaderTest name={params.author[0].user_name} have={false} {...this.props}/>
                <Image source={{uri:params.author[0].web_url}}
                       style={{width:width-10,height:300}}
                />
               <Text style={{marginTop:10,marginLeft:10}}>姓名：{params.author[0].user_name}</Text>
               <Text style={{marginTop:7,marginBottom:10}}>描述：{params.author[0].desc}</Text>
               <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                   <Text style={{marginLeft:15,marginRight:40}}>爱豆数：{params.author[0].fans_total}</Text>
                   <Text style={{marginRight:15,marginLeft:40}}>微博名：{params.author[0].wb_name}</Text>
               </View>
           </View>
        );
    }
}
const styles =StyleSheet.create({
   container:{
       flex:1,
       alignItems:'center'
   }
});