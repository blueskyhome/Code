import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Dimensions,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import SideMenu from 'react-native-side-menu';
import HomeTest from "./HomeTest";
import Menu from './Menu';
export default class HomeMenu extends Component{
    constructor(props){
        super(props);
        this.state={
            isOpen:false,
            selectedItem:'重庆'
        }
    }
    updateMenuState(isOpen){
        this.setState({isOpen})
    }
    onMenuItemSelected = (city) =>{
      this.setState({
          isOpen:false,
          selectedItem:city
      })
    };
   render(){
       const menu = <Menu onItemSelected={this.onMenuItemSelected}/>;
        return(
            <SideMenu
                menu={menu}
                isOpen={this.state.isOpen}
                onChange={(isOpen)=>this.updateMenuState(isOpen)}
            >
             <HomeTest city={this.state.selectedItem} style={{flex:1}}/>
            </SideMenu>
        );

   }
}

