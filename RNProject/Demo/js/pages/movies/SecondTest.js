import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions,
    ScrollView,
    InteractionManager
} from 'react-native';
import LoadingTest from "../LoadingTest";
const url ='https://api-m.mtime.cn/Movie/MovieComingNew.api?locationId=291';
const {width} = Dimensions.get('window');
export default class FirstTest extends Component{
    constructor(props) {
        super(props);
        this.state={
            dataOne:[],
            dataTwo:[],
            isFreshing:true
        }
    }
    componentDidMount(){
      this.fetchData();
    }
    fetchData=()=>{
      fetch(url)
          .then(response => response.json())
          .then(jsonData =>{
              this.setState({
                  dataOne:jsonData.moviecomings,
                  dataTwo:jsonData.attention,
                  isFreshing:false
              })
          })
          .catch(error=>{
              console.log(error);
          })
    };
    RenderItem(){
        let item = this.state.dataOne;
        let ImageView = [];
        if(item){
            for(let i = 0 ; i < item.length ;i++){
                ImageView.push(
                    <View style={styles.renderOne}
                          key={i}
                    >
                        <View style={{width:100}}>
                            <Text style={{fontSize:10}}>{item[i].rMonth}.{item[i].rDay}</Text>
                            <View style={{height:0.5}}/>
                        </View>
                        <TouchableOpacity
                            onPress={()=>this.props.navigation.navigate('moviesTest',{id:item[i].id,url:item[i].image})}
                            activeOpacity={0.8}
                            style={styles.Touch}
                        >
                            <Image source={{uri:item[i].image}}
                                   style={{width:100,height:160}}
                            />
                        </TouchableOpacity>
                        <Text style={{fontSize:13,color:'black'}}
                              numberOfLines={1}
                              ellipsizeMode={'middle'}
                        >{item[i].title}</Text>
                        <Text style={{fontSize:10}}>{item[i].type}</Text>
                    </View>
                )
            }
            return ImageView;
        }else{
            return <Text>loading....</Text>
        }

    }
    Footer(){
        return <View style={styles.Footer}>
            <Text>全部</Text>
        </View>
    }
    _RenderItem(item){
        if(this.state.dataTwo){
            return(
                <View style={styles.renderOne}>
                    <TouchableOpacity
                        onPress={()=>this.props.navigation.navigate('moviesTest',{id:item.item.id,url:item.item.img})}
                        activeOpacity={0.8}
                        style={styles.Touch}
                    >
                        <Image source={{uri:item.item.image}}
                               style={{width:100,height:160}}
                        />
                    </TouchableOpacity>
                    <Text style={{fontSize:13,color:'black'}}
                          numberOfLines={1}
                          ellipsizeMode={'middle'}
                    >{item.item.title}</Text>
                    <Text style={{fontSize:10}}>{item.item.type}</Text>
                    <Text style={{fontSize:10}}>{item.item.wantedCount}人想看</Text>
                </View>
            )
        }else{
            return <LoadingTest/>;
        }
    }
    _keyExtractor = (item, index) => index.toString();
    FlatListTest(){
        let data = this.state.dataTwo;
        return(
            <FlatList
                data={data}
                ref={(flatList)=>this._flatList=flatList}
                renderItem={this._RenderItem.bind(this)}
                keyExtractor={this._keyExtractor}
                numColumns={3}
                columnWrapperStyle={{marginBottom:10}}
                getItemLayout={(data, index) => ({length: 160, offset: 160 * index, index})}
            />
        );
    }
    ScrollTest = ()=>{
        return(
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={true}
                indicatorStyle={'white'}
            >
                {this.RenderItem()}
            </ScrollView>
        );
    };
    render(){
        if(!this.state.isFreshing){
            return(
                <ScrollView
                    style={styles.container}
                >
                    <View style={styles.One}>
                        <Text style={{color:'black'}}>院线即将上映</Text>
                        <Text style={{fontSize:12,marginLeft:200}}>全部 > </Text>
                    </View>
                    {this.ScrollTest()}
                    <Text style={{marginTop:20,marginBottom:10}}>最受关注</Text>
                    {this.FlatListTest()}
                </ScrollView>
            );
        }else{
            return <LoadingTest/>
        }

    }
}
const styles = StyleSheet.create({
    container:{
        flex:1 ,
        marginLeft:15 ,
        backgroundColor:'#F5FCFF'
    },
    One:{
        flexDirection:'row',
        marginTop:10
    },
    renderOne:{
        flex:1,
        marginRight:10,
        width:100
    },
    Touch:{
        borderRadius:5,
    },
    Footer:{
        width:100,
        height:200,
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center'
    }
});