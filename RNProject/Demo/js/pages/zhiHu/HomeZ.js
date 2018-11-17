import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    ImageBackground,
    Dimensions,
    TouchableWithoutFeedback,
    RefreshControl,
    SectionList
} from 'react-native';
import Swiper from 'react-native-swiper';
import LoadingTest from "../LoadingTest";
import HeaderTest from "../user/HeaderTest";
const url = 'https://news-at.zhihu.com/api/4/news/latest';
const {width,height} = Dimensions.get('window');
export default class HomeZ extends Component{
  constructor(props){
      super(props);
      this.state={
          data1:[],
          data2:[],
          isRefreshing:true,
      }
  }
  componentDidMount(){
      this.fetchData();
  }
    handleRefresh = () => {
        this.setState({
            isRefreshing:true,//tag,下拉刷新中，加载完全，就设置成false
            dataArray:[]
        });
        this.fetchData()
    };
  fetchData=()=>{
      fetch(url)
          .then((response)=>response.json())
          .then((responseData)=>{
              this.setState({
                  data1:responseData.stories,
                  data2:responseData.top_stories,
                  isRefreshing:false,
              });
          })
          .catch((error)=>{
              alert(error);
          })
  };
  ImageTest(){
      let images = this.state.data2;
      let imageViews=[];
      for(let i=0;i<images.length;i++){
          imageViews.push(
              <TouchableWithoutFeedback
                  key={i}
                  onPress={()=>this.props.navigation.navigate('DetailZ',{id:images[i].id,title:images[i].title})}
              >
              <ImageBackground
                  style={{width:width,height:320,flex:1}}
                  source={{uri:images[i].image}}
                  resizeMode={'cover'}
              >
               <Text style={{position:'absolute',bottom:20,fontSize:20,color:'white'}}>{images[i].title}</Text>
              </ImageBackground>
              </TouchableWithoutFeedback>
          )
      }
      return imageViews;
  }
  RenderItem=(item)=>{
      return(
            <TouchableWithoutFeedback
                onPress={()=>this.props.navigation.navigate('DetailZ',{id:item.item.id,title:item.item.title})}
            >
                <View
                    style={styles.renderOne}
                >
            <Text style={{fontSize:15,color:'black',marginLeft:8,marginRight:8,width:width-150}}>{item.item.title}</Text>
            <Image source={{uri:item.item.images[0]}}
                   style={{height:80,width:100}}
            />
                </View>
            </TouchableWithoutFeedback>
      );
  };
  headerTest(){
      return <Text style={{margin:8}}>今日热闻</Text>
  };

    _keyExtractor = (item, index) => index.toString();
  render(){
      if(!this.state.isRefreshing){
          return(
              <View style={styles.container}>
                  <HeaderTest name={'知乎'} have={false} {...this.props}/>
                  <Swiper
                      autoplay={true}
                      horizontal={true}
                      autoplayTimeout={2.5}
                      paginationStyle={{position:'absolute',bottom:10}}
                  >
                      {this.ImageTest()}
                  </Swiper>
                  <FlatList
                      data={this.state.data1}
                      renderItem={this.RenderItem}
                      ListHeaderComponent={this.headerTest()}
                      keyExtractor={this._keyExtractor}
                      refreshing={this.state.isRefreshing}
                  />
              </View>
          );
      }else{
          return <LoadingTest/>
      }


  }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    renderOne:{
        width:width-16,
        marginLeft:8,
        height:100,
        alignItems:'center',
        flexDirection:'row',
        borderColor:'gray',
        borderRadius:5,
        borderWidth:0.5,
        marginBottom:5,
        backgroundColor:'white'
    }
});