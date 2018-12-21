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
import Http from "../Http";
import HeartTest from './heartTest';
import HTMLView from 'react-native-htmlview';
import LoadingTest from "../LoadingTest";
import HeaderTest from "../user/HeaderTest";
const {width} = Dimensions.get('window');
const URL = 'http://v3.wufazhuce.com:8000/api/essay/';
const url = 'http://v3.wufazhuce.com:8000/api/comment/praiseandtime/essay/';
const last = '?version=3.5.0&platform=android';

export default class One extends Component{
    static navigationOptions=()=>{
        return{
            header:null
        }
    };
    constructor(props){
        super(props);
        this.state={
            data:null,
            comment:null,
        }
    }
    fetchData =()=>{
        const {params} = this.props.navigation.state;
        Http.get(URL+params.id+last)
            .then((jsonData)=>{
                this.setState({
                    data:jsonData.data,
                });
            })
            .catch((error)=>{
                alert(error);
            });
        Http.get(url+params.id+'/0'+last)
            .then((jsonData)=>{
                this.setState({
                    comment:jsonData.data.data,
                });
            })
            .catch((error)=>{
                alert(error);
            });
    };
    componentDidMount(){
        this.fetchData();
    }
    _keyExtractor = (item, index) => index.toString();
    RenderItem=(item)=>{
      return(
        <View style={styles.container}>
           <View style={styles.PartOne}>
               <View style={{flexDirection:'row',width:100}}>
               <Image style={styles.images}
                      source={{uri:item.item.user.web_url}}
               />
                   <View style={{justifyContent:'center',alignItems:'center',marginLeft:5}}>
                       <Text style={{fontSize:10,color:'black'}}>{item.item.user.user_name}</Text>
                       <Text style={{fontSize:7}}>{item.item.input_date}</Text>
                   </View>
               </View>
              <HeartTest praisenum={item.item.praisenum}/>
           </View>
            <Text style={{fontSize:15,color:'black',marginLeft:40,marginRight:10,marginBottom:20,marginTop:10}}>{item.item.content}</Text>
        </View>
      );
    };
   render(){
        if(!this.state.data){
          return <View style={{flex:1,justifyContent:'center',alignItems:'center',height:height,width:width}}>
              <ActivityIndicator size={"large"} color={"#C02842"} />
          </View>
        }else{
            return(
                <View style={{flex:1}}>
                    <HeaderTest name={'阅读'} have={true} {...this.props}/>
                <ScrollView style={styles.container}>

                    <View style={styles.One}>
                        <Text style={{fontSize:25,marginBottom:5,marginLeft:10}}>{this.state.data.hp_title}</Text>
                        <View style={{height:1,width:width-10,backgroundColor:'gray'}}/>
                        <Text style={{marginTop:5,marginBottom:10,color:'orange'}}
                              onPress={()=>this.props.navigation.navigate('Author',{author:this.state.data.author})}
                        >{this.state.data.hp_author}#</Text>
                    </View>
                    <View style={{marginLeft:10,marginRight:10}}>
                        <HTMLView value={this.state.data.hp_content} stylesheet={stylesTwo}/>
                    </View>
                    <View style={styles.Two}>
                       <Text style={{fontSize:10}}>{this.state.data.hp_author_introduce}</Text>
                        <Text style={{fontSize:10}}>{this.state.data.hp_makettime}</Text>
                    </View>
                    <Text style={{marginLeft:5,marginTop:20}}>精彩评论</Text>
                    <FlatList
                        data={this.state.comment}
                        renderItem={this.RenderItem}
                        keyExtractor={this._keyExtractor}
                        ItemSeparatorComponent={()=>{
                            return <View style={{opacity:0.5,height:1,backgroundColor:'gray'}}/>
                        }}
                    />
                </ScrollView>
                </View>
            );
        }

   }
}
const stylesTwo = StyleSheet.create({
    p: {
        fontSize:16,
        color:'black',
        lineHeight:30,
        // make links coloured pink
    },
});
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    One:{
        justifyContent:'center',
        alignItems:'center'
    },
    Two:{
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:15,
        flexDirection:'row'
    },
    PartOne:{
        flexDirection:'row',
        marginTop:10,
        justifyContent:'space-between',
        marginRight:5,
        marginLeft:5
    },
    images:{
        width:30,
        height:30,
        borderRadius:15
    }

});