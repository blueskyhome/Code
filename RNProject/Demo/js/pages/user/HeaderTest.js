import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
    ScrollView,
    Dimensions,
    ImageBackground,
} from 'react-native';
const {width} = Dimensions.get('window');
import IconOne from 'react-native-vector-icons/Ionicons';
import { ActionSheet} from 'antd-mobile-rn';
export default class HeaderTest extends Component{
    static defaultProps={
        name: '',
        backgroundColor:'white',
        have:false
    };
    constructor(props){
        super(props);
    }

    Share(){
        const opts = {
            url: 'https://www.alipay.com/',
            message: 'https://www.baidu.com',

            subject: '123123',
        };

        ActionSheet.showShareActionSheetWithOptions(opts, (error) => alert(error), (success, method) => {
            let text;
            if (success) {
                text = `通过 ${method} 分享`;
            }
            else {
                text = '您没有分享';
            }
            alert(text)  ;
        });

    }


    render(){
        return(
           <View style={[styles.container,{backgroundColor:this.props.backgroundColor}]}>
               <TouchableWithoutFeedback
                   onPress={()=>{ this.props.navigation.goBack()}}
               >
               <IconOne name={'md-arrow-back'} size={30} color={'black'}/>
               </TouchableWithoutFeedback>
               <Text style={{fontSize:20,color:'black'}}>{this.props.name}</Text>
               {this.props.have ? <Text style={{fontSize:20,color:'black'}} onPress={()=>this.Share()}>分享</Text>:<Text>  </Text>}
           </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        height:50,
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'white',
        width:width,
        paddingRight:7,
        paddingLeft:7
    }
});