import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    Dimensions,
    TouchableWithoutFeedback,
    AccessibilityInfo,
    ActivityIndicator,
    ScrollView,
    WebView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import IconOne from 'react-native-vector-icons/Entypo'
export default class heartTest extends Component{
    constructor(props){
        super(props);
        this.state={
            add:0
        }
    }
    render(){
        return(
            <TouchableWithoutFeedback
                onPress={()=>{this.setState({
                    add:this.state.add === 0 ? 1:0,
                })}}
            >
            <View style={{flexDirection:'row'}}>
                <Text style={{marginRight:5,color:'red'}}>{this.props.praisenum + this.state.add}</Text>
                {this.state.add === 1 ? <IconOne name={'heart'} size={20} color={'red'}/> : <Icon name={'heart'} size={20} color={'red'}/> }
            </View>
            </TouchableWithoutFeedback>
        );
    }

}