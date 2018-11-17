import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Text,
    Image,
    TouchableWithoutFeedback
} from 'react-native';
import FirstTest from './FirstTest';
import SecondTest from './SecondTest';

export default class ScrollTabTest extends Component{
    constructor(props){
        super(props);
        this.state ={
            width1:2,
            width2:0.5,
            selected:1,
        }
    }
    Change=()=>{
      this.setState({
          width1:2,
          width2:0.5,
          selected:1,
      })
    };
    ChangeOne=()=>{
        this.setState({
            width1:0.5,
            width2:2,
            selected:2,
        })
    };
    Movies(){
        if(this.state.selected === 1){
            return <FirstTest {...this.props}/>
        }else{
            return <SecondTest {...this.props}/>
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.One}>
                    <View style={{borderBottomWidth:this.state.width1,height:50,marginRight:50,justifyContent:'center'}}>
                    <Text style={styles.text}
                          onPress={this.Change.bind(this)}
                    >正在热映</Text>
                    </View>
                    <View style={{borderBottomWidth:this.state.width2,height:50,marginLeft:50,justifyContent:'center'}}>
                    <Text style={styles.text}
                          onPress={this.ChangeOne.bind(this)}
                    >即将上映</Text>
                    </View>
                </View>
                {this.Movies()}
            </View>
        );
    }
}
const styles = StyleSheet.create({
   container:{
       flex:1,
       backgroundColor:'white'
   },
    One:{
       flexDirection:'row',
        backgroundColor:'white',
        justifyContent:'center',
    },
    text:{
        fontSize:20,
        borderBottomColor:'gray',
    }
});