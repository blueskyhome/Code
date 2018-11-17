import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import  ScrollableTabView,{ScrollableTabBar} from 'react-native-scrollable-tab-view';

import PopularTab from "./GitTest/PopularTab";
export default class TransportTest extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ScrollableTabView
                    tabBarBackgroundColor={'#2196F3'}
                    tabBarInactiveTextColor={'mintcream'}
                    tabBarActiveTextColor={'white'}
                    tabBarUnderlineStyle={{backgroundColor: '#e7e7e7', height: 2}}
                    renderTabBar={() => <ScrollableTabBar/>}
                >
                    <PopularTab  tabLabel={'Android'}
                                 style={{color: 'white'}}
                                 {...this.props}
                    >android</PopularTab>
                    <PopularTab tabLabel={'java'}
                                style={{color: 'white'}}
                                {...this.props}
                    >java</PopularTab>
                    <PopularTab tabLabel={'ios'}
                                style={{color: 'white'}}
                                {...this.props}
                    >ios</PopularTab>
                    <PopularTab tabLabel={'JavaScript'}
                                style={{color: 'white'}}
                                {...this.props}
                    >js</PopularTab>
                    <PopularTab tabLabel={'python'}
                                style={{color: 'white'}}
                                {...this.props}
                    >Python</PopularTab>
                    <PopularTab tabLabel={'c++'}
                                style={{color: 'white'}}
                                {...this.props}
                    >c++</PopularTab>
                    <PopularTab tabLabel={'php'}
                                style={{color: 'white'}}
                                {...this.props}
                    >PHP</PopularTab>
                    <PopularTab tabLabel={'CSS'}
                                style={{color: 'white'}}
                                {...this.props}
                    >CSS</PopularTab>
                </ScrollableTabView>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    icon:{
        height:30,
        width:30,
        paddingLeft:20,
        paddingRight:10,
    },
    item:{
        borderWidth:1,
        borderColor:'orange',
        height:1,
    }
});