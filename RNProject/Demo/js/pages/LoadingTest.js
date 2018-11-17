import React,{ Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    TouchableOpacity,
    RefreshControl,
    Animated,
    Easing,
    Dimensions,
} from 'react-native';
const {height} = Dimensions.get('window');
export default class LoadingTest extends Component{
    constructor(props){
        super(props);
        this.Animated = new Animated.Value(0);
    }
    componentDidMount(){
      this.AnimatedTest(3000);
    }
    AnimatedTest(time){
        this.Animated.setValue(0);
        Animated.timing(this.Animated,{
            toValue:1,
            duration:time,
            easing:Easing.linear
        }).start(()=>this.AnimatedTest());
    }
    render(){
        const spin = this.Animated.interpolate({
            inputRange:[0,1],
            outputRange:['0deg','360deg']
        });
        const spin1 = this.Animated.interpolate({
            inputRange:[0,1],
            outputRange:['0deg','180deg']
        });
        return(
            <View style={{justifyContent:'center',alignItems:'center',height:height,backgroundColor:'white'}}>
                <Animated.View style={[styles.downViewStyle,{transform:[{rotate:spin}]}]}>
                    <Animated.View style={[styles.Two,{transform:[{rotate:spin1}]}]}/>
                </Animated.View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
   downViewStyle:{
       justifyContent:'center',
       alignItems:'center',
       borderRadius:50,
       width:100,
       height:100,
       borderBottomColor:'red',
       borderTopColor:'green',
       borderRightColor:'yellow',
       borderLeftColor:'blue',
       borderWidth:10,
       backgroundColor:'white'

   },
    Two:{
       height:70,
        width:70,
        borderRadius:35,
        borderWidth:35,
        borderBottomColor:'red',
        borderRightColor:'blue',
        borderTopColor:'yellow',
        borderLeftColor:'green'
    }
});