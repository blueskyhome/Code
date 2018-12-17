import React, {Component} from 'react';
import {Platform, StyleSheet,Image, Text,Dimensions,TouchableOpacity, View,TextInput} from 'react-native';
const {width,height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/AntDesign';
export default class Item extends Component{
    render(){
        if(this.props.text==='我的订单'){
            return(
                <TouchableOpacity
                    onPress={()=>this.props.OnPress()}
                >
                    <View style={styles.container}>
                        <View style={styles.one}>
                            <Icon name={this.props.url}  size={20} color={'gray'} style={{marginLeft:10,paddingLeft:5}}/>
                            <Text>{this.props.text}</Text>
                        </View>
                        <Icon name={'right'} size={20} color={'gray'}/>
                    </View>
                </TouchableOpacity>
            );
        }else{
            return(
                    <View style={styles.container}>
                        <View style={styles.one}>
                            <Icon name={this.props.url}  size={20} color={'gray'} style={{marginLeft:10,paddingLeft:5}}/>
                            <Text>{this.props.text}</Text>
                        </View>
                        <Icon name={'right'} size={20} color={'gray'}/>
                    </View>
            );
        }
    }
}
const styles = StyleSheet.create({
    container:{
        width:width*0.8,
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft:10,
        paddingRight:10,
        flexDirection:'row',
        backgroundColor:'white',
        height:60
    },
    one:{
        width:150,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
    }
});