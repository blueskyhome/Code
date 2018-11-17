import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    TextInput,
    TouchableOpacity,
    RefreshControl,
    WebView
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
export default class WebTest extends  Component{
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.full_name,
    });
    render(){
        const {params} = this.props.navigation.state;
        return(
            <View style={{flex:1}}>
            <WebView
                ref={webView => this.webView = webView}
                source={{uri:params.url}}
            />
            </View>
        );
    }
}