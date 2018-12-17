import React, {Component} from 'react';
import {Platform, StyleSheet, Text,Dimensions, View,TextInput} from 'react-native';
const {width,height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Octicons';
import IconTwo from 'react-native-vector-icons/Entypo';
export default class TranPerson extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Icon name={'three-bars'} color={'white'} size={30}
                      onPress={this.props.press}
                />
                <Text style={{color:'white',fontSize:20}}>啦啦移动驿站</Text>
                <IconTwo name={'dots-three-vertical'} color={'white'} size={30}/>
            </View>
        );
    }
}
const styles = {
    container:{
        width:width,
        backgroundColor:'#48A0DC',
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        height:60,
        paddingLeft:15,
        paddingRight:15
    }
};