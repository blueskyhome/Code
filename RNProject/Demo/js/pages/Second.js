import React, {Component} from "react";
import {StyleSheet,View, Text,Image,Dimensions,WebView} from "react-native";
let {width} = Dimensions.get('window');
export default class Second extends React.Component{
    static navigationOptions = {
        title:'详情页'
    };
    render(){
        const {params} = this.props.navigation.state;
        return(
            <View style={styles.container}>
                <Image source={{uri:params.picSmall}}
                       style={styles.ImageView}
                />
                <Text style={styles.textName}>{params.name}</Text>
                <Text style={styles.text}>{params.description}</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    ImageView:{
        height:200,
        width:width,
        paddingTop:10,
        paddingBottom:20
    },
    textName:{
        fontSize:25,
        color:'red',
        textAlign:'center',
        paddingBottom:5
    },
    text:{
        fontSize:15,
        color:'black',
        paddingLeft:10
    }

});