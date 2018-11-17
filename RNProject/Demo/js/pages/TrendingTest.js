import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    AsyncStorage,
    TextInput,
    Slider,
    ProgressBarAndroid,
    Picker,
    Switch
} from 'react-native';
import GitHubTrending from 'GitHubTrending';
const URL = 'http://github.com/trending/';
export default class TrendingTest extends Component{
    constructor(props){
        super(props);
        this.trending =new GitHubTrending;
        this.state={
            data:[],
        }
    }
    onLoad(){
        let url = URL+this.text;
        this.trending.fetchTrending(url)
            .then(result=>{
                 this.setState({
                     data:JSON.stringify(result)
                 })
            })
            .catch(error=>{
                this.setState({
                    data:JSON.stringify(error)
                })
            })
    }
    render(){
        return(
            <View>
                <TextInput
                    placeholder={'text'}
                    style={{borderWidth:1,height:40,margin:6}}
                    onChangeText={text=>this.text=text}
                    underlineColorAndroid={'transparent'}
                />
            <View style={{flexDirection:'row'}}>
                <Text style={styles.tips}
                      onPress={()=>this.onLoad()}
                >保存</Text>
                <Text style={{flex:1}}>{this.state.data}</Text>
            </View>
            </View>

        );
    }
}
const styles=StyleSheet.create({
    tips:{
        fontSize:29,
        margin:5
    }
})