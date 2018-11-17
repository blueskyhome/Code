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
    ImageBackground
} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
const {width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Entypo';
import IconOne from 'react-native-vector-icons/Ionicons';
import LoadingTest from "../LoadingTest";
const URL = 'https://ticket-api-m.mtime.cn/movie/detail.api?locationId=291&movieId=';
export default class moviesTest extends Component{
 constructor(props){
     super(props);
     this.state={
         data:null,
         lines:4,
         text:'展开',
         basic:null,
     }
 }
 componentDidMount(){
     this.fetchData();
 }
 fetchData = () =>{
     const { params } = this.props.navigation.state;
     fetch(URL+params.id)
        .then(response => response.json())
        .then(jsonData => {
            this.setState({
                data:jsonData.data,
               basic:jsonData.data.basic
            });
        })
        .catch(error =>{
            alert(error);
        })
 };
 ImageTest(){
     const { params } = this.props.navigation.state;
     return(
         <View style={styles.One}>
              <Image source={{uri:params.url}}
                     style={{width:180,height:250}}
              />
         </View>
     );

 }
 PartTwo(){
     let title = this.state.data.basic;
     if(title){
         return(
             <View style={styles.Two}>
                 <View style={styles.TwoOne}>
                     <View style={styles.TwoOneOne}>
                         <Text style={{fontSize:20,color:'black',marginBottom:10}}>{title.name}</Text>
                         <Text style={{marginTop:5,fontSize:12}}>{title.type[0]}/{title.type[1]}/{title.type[2]}</Text>
                         <Text style={{fontSize:12}}>上映时间：{title.releaseDate}（{title.releaseArea}）</Text>
                         <Text style={{fontSize:12}}>片长：{title.mins}</Text>
                     </View>
                     <View style={styles.TwoOneTwo}>
                         <Text style={{fontSize:12}}>豆瓣评分</Text>
                         <Text style={{fontSize:20,color:'black'}}>{title.overallRating}</Text>
                         <Text style={{fontSize:12}}>获奖：{title.totalWinAward}</Text>
                     </View>
                 </View>
                 <View style={styles.TwoTwo}>
                     <Text style={{marginBottom:10}}>简介</Text>
                     <Text
                         style={{fontSize:15,color:'black'}}
                         numberOfLines={this.state.lines}
                         ellipsizeMode={'middle'}
                     >{title.story}</Text>
                     <Text onPress={()=>this.setState({
                         lines:this.state.lines === 4 ? 20:4,
                         text:this.state.text === '展开' ? '收起':'展开',
                     })}
                           style={{color:'green'}}
                     >{this.state.text}</Text>
                 </View>
             </View>
         )
     }else{
         return <View/>;
     }
 }
    ImageOne(){
        let actors = this.state.basic.actors;
        let imageView = [];
        if(actors){
            for(let i = 0;i < actors.length ; i++){
                imageView.push(
                    <View style={styles.renderTest}
                          key={i}
                    >
                        <Image source={{uri:actors[i].img}}
                               style={styles.ImageTwo}
                        />
                        <Text style={{fontSize:12,color:'black'}}>{actors[i].name}</Text>
                        <Text style={{fontSize:10}}>饰：{actors[i].roleName}</Text>
                    </View>
                );
            }
            return imageView;
        }else{
            return <View/>
        }

    };
 ScrollTest=()=>{
     let basic = this.state.basic.director;
         return(
             <View style={styles.Flat}>
                 <Text>影人</Text>
                 <ScrollView
                     horizontal={true}
                 >
                    <View style={styles.renderTest}>
                         <Image source={{uri:basic.img}}
                                style={styles.ImageTwo}
                         />
                         <Text style={{fontSize:12,color:'black'}}>{basic.name}</Text>
                         <Text style={{fontSize:10}}>导演</Text>
                     </View>
                     {this.ImageOne()}
                 </ScrollView>
             </View>
         );
 };
  render(){
        if(this.state.data && this.state.basic){
            let basic = this.state.basic;
            return(
                    <ParallaxScrollView
                        style={{backgroundColor: 'pink', overflow: 'hidden' }}
                        renderBackground={() =>(
                                <View style={{flex:1}}>
                                    <View style={{height:50,justifyContent:'space-between',alignItems:'center',backgroundColor:'#cccc99',flexDirection:'row',paddingLeft:10}}>
                                        <TouchableWithoutFeedback
                                            onPress={()=>{ this.props.navigation.goBack()}}
                                        >
                                            <IconOne name={'md-arrow-back'} size={30} color={'black'}/>
                                        </TouchableWithoutFeedback>
                                        <Text style={{fontSize:20,color:'black'}}>电影</Text>
                                        <Text>  </Text>
                                    </View>
                                    {this.ImageTest()}
                                </View>
                            )
                        }
                        renderStickyHeader={() => (
                            <View key="sticky-header" style={{paddingLeft:10,height:50,justifyContent:'space-between',alignItems:'center',backgroundColor:'#cccc99',flexDirection:'row'}}>
                                <TouchableWithoutFeedback
                                    onPress={()=>{ this.props.navigation.goBack()}}
                                >
                                    <IconOne name={'md-arrow-back'} size={30} color={'black'}/>
                                </TouchableWithoutFeedback>
                                <Text style={{color:'black',fontSize:20}}>{basic.name}</Text>
                                <Text>  </Text>
                            </View>
                        )}
                        parallaxHeaderHeight={ 350 }
                        stickyHeaderHeight={50}
                    >
                        {this.PartTwo()}
                        {this.ScrollTest()}
                        <TouchableWithoutFeedback
                            onPress={()=>this.props.navigation.navigate('VideoTest',{url:basic.video.url})}
                        >
                            <ImageBackground
                                style={{width:width,height:170,marginTop:20,justifyContent:'center',alignItems:'center',marginBottom:20}}
                                source={{uri:basic.video.img}}
                            >
                                <Icon name={'controller-next'} color={'white'} size={50}/>
                            </ImageBackground>
                        </TouchableWithoutFeedback>
                    </ParallaxScrollView>
            );
        }else{
            return <LoadingTest/>
        }
  }
}
const styles = StyleSheet.create({
   container:{
       flex:1
   },
    One:{
       backgroundColor:'#cccc99',
        justifyContent:'center',
        alignItems:'center',
        width:width,
        height:300
    },
    Two:{
       flex:1
    },
    TwoOne:{
       alignItems:'center',
        marginLeft:15,
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:15,
        marginRight:15
    },
    TwoOneOne:{

    },
    TwoOneTwo:{
       alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        width:80,
        height:80
    },
    TwoTwo:{
       marginRight:15,
        marginTop:15,
       marginLeft:15
    },
    renderTest:{
        marginRight:10,
        justifyContent:'center',
        alignItems:'center'
    },
    ImageTwo:{
       width:100,
        height:150,
        borderColor:'gray',
        borderWidth:0.5,
        borderRadius:5
    },
    Flat:{
       flex:1,
        marginLeft:15
    }
});