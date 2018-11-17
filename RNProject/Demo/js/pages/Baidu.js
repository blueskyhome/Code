import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList,
    Button,
    Image,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
const URL = 'http://baike.baidu.com/api/openapi/BaikeLemmaCardApi?scope=103&format=json&appid=379020&bk_key=';
const last = '&bk_length=600';
export default class Baidu extends Component{
    constructor(props){
        super(props);
        this.state={
            text:'',
            data:null
        }
    }
    fetchData =()=>{
        fetch(URL+text+last)
            .then((response)=>response.json())
            .then((json)=>{
                this.setState({
                    data:json,
                });
            })
            .catch((error)=>{
                alert(error)
            })
    };
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.one}>
                    <TextInput
                        placeholder={'百科内容'}
                        placeholderTextColor={'black'}
                        underlineColorAndroid={'green'}
                        onChangeText={(text)=>this.setState({text:text})}
                        style={{width:width-120}}
                    />
                    <TouchableOpacity
                        onPress={this.fetchData.bind(this)}
                        style={{marginLeft:5,paddingTop:10}}
                    >
                        <Icon name={'search'} size={30} color='blue'/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,

    },
    one:{

    }
});
