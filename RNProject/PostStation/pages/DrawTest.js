import React, {Component} from 'react';
import {Platform, Image,StyleSheet,Picker,Text,Dimensions, View,TextInput,TouchableOpacity} from 'react-native';
const {width,height} = Dimensions.get('window');
import  Drawer from 'react-native-drawer';
import TranPerson from "./TranPerson";
import Menu from "./Menu";
import  TabView from './Tab/TabView';
export default class DrawTest extends Component{
    constructor(props){
        super(props);
    }
    closePane = ()=>{
      this._drawer.close();
    };
    openPane = () =>{
      this._drawer.open();
    };
    render(){
        return(
            <View style={{flex:1}}>
            <Drawer
                ref={(ref)=>this._drawer = ref}
                content={<Menu {...this.props}/>}
                type={'displace'}
                tapToClose={true}
                panOpenMask={0.2}
                openDrawerOffset={0.2}
                panCloseMask={0.2}
                closedDrawerOffset={0}
            >
                <TranPerson drawer={this.openPane.bind(this)} {...this.props}/>
            </Drawer>
            </View>
        );
    }
}