import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    WebView,
    Dimensions,
    TouchableWithoutFeedback,
    Easing,
    Animated
} from 'react-native';
import HeaderTest from "../user/HeaderTest";
import LoadingTest from "../LoadingTest";
const URL='http://daily.zhihu.com/story/';
const {width,height} = Dimensions.get('window');
export default class DetailZ extends Component{
    static navigationOptions=()=>{
        return{
            header:null
        }
    };
    constructor(props){
        super(props);
        this.spinValue = new Animated.Value(0);
        this.state={
            time:true,
        }
    }
    componentDidMount(){
        this.spin();
    }
    spin(){
        this.spinValue.setValue(0);
        Animated.timing(
            this.spinValue,
            {
                toValue:1,
                duration:5000,
                easing:Easing.linear
            }
        ).start(()=>this.setState({time:false}));
    }
    render(){
        const { params } = this.props.navigation.state;
        const spin = this.spinValue.interpolate({
            inputRange:[0,1],
            outputRange:['0deg','360deg']
        });
        if(this.state.time){
            return(
                <LoadingTest/>
            );
        }else{
            return (
                <View style={styles.container}>
                    <HeaderTest name={'详情'}  {...this.props}/>
                    <WebView
                        style={{width:width,height:height-20,backgroundColor:'gray'}}
                        source={{uri:URL+params.id,method:'GET'}}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        scalesPageToFit={false}
                    />
                </View>
            );
        }

    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
});