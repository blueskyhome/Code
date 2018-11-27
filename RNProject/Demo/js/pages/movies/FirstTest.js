import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions
} from 'react-native';
const url = 'https://api-m.mtime.cn/Showtime/LocationMovies.api?locationId=291';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoadingTest from '../LoadingTest';
const {width} = Dimensions.get('window');
export default class FirstTest extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
    }
    componentDidMount(){
        this.timer = setTimeout(
            () => this.fetchData(),
            500
        );
    }
    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer);
    }
    fetchData=()=>{
        fetch(url)
            .then(response=>response.json())
            .then(jsonData => {
                this.setState({
                    data:jsonData.ms,
                })
            })
            .catch(error=>{
                alert(error);
            });
    };
    _keyExtractor = (item, index) => index.toString();
    Star(item){
        let r = item.item.r;
        if(r>0&&r<2.5){
            return(
                <View style={styles.Star}>
                    <Icon name={'star'} color={'orange'} size={10}/>
                    <Icon name={'star'} color={'gray'} size={10}/>
                    <Icon name={'star'} color={'gray'} size={10}/>
                    <Icon name={'star'} color={'gray'} size={10}/>
                    <Icon name={'star'} color={'gray'} size={10}/>
                    <Text style={{fontSize:10,marginLeft:3}}>{item.item.r}</Text>
                </View>
            );
        }else if(r>=2.5 && r < 3.5){
            return(
                <View style={styles.Star}>
                    <Icon name={'star'} color={'orange'} size={10}/>
                    <Icon name={'star-half-empty'} color={'orange'} size={10}/>
                    <Icon name={'star'} color={'gray'} size={10}/>
                    <Icon name={'star'} color={'gray'} size={10}/>
                    <Icon name={'star'} color={'gray'} size={10}/>
                    <Text style={{fontSize:10,marginLeft:3}}>{item.item.r}</Text>
                </View>
            );
        }else if(r>=3.5 && r < 4.5){
            return(
                <View style={styles.Star}>
                    <Icon name={'star'} color={'orange'} size={10}/>
                    <Icon name={'star'} color={'orange'} size={10}/>
                    <Icon name={'star'} color={'gray'} size={10}/>
                    <Icon name={'star'} color={'gray'} size={10}/>
                    <Icon name={'star'} color={'gray'} size={10}/>
                    <Text style={{fontSize:10,marginLeft:3}}>{item.item.r}</Text>
                </View>
            );
        }else if(r>=4.5 && r < 5.5){
            return(
                <View style={styles.Star}>
                    <Icon name={'star'} color={'orange'} size={10}/>
                    <Icon name={'star'} color={'orange'} size={10}/>
                    <Icon name={'star-half-empty'} color={'orange'} size={10}/>
                    <Icon name={'star'} color={'gray'} size={10}/>
                    <Icon name={'star'} color={'gray'} size={10}/>
                    <Text style={{fontSize:10,marginLeft:3}}>{item.item.r}</Text>
                </View>
            );
        }else if(r>=5.5 && r < 6.5){
            return(
                <View style={styles.Star}>
                    <Icon name={'star'} color={'orange'} size={10}/>
                    <Icon name={'star'} color={'orange'} size={10}/>
                    <Icon name={'star'} color={'orange'} size={10}/>
                    <Icon name={'star'} color={'gray'} size={10}/>
                    <Icon name={'star'} color={'gray'} size={10}/>
                    <Text style={{fontSize:10,marginLeft:3}}>{item.item.r}</Text>
                </View>
            );
        }else if(r>=6.5 && r< 7.5){
            return(
                <View style={styles.Star}>
                    <Icon name={'star'} color={'orange'} size={10}/>
                    <Icon name={'star'} color={'orange'} size={10}/>
                    <Icon name={'star'} color={'orange'} size={10}/>
                    <Icon name={'star-half-empty'} color={'orange'} size={10}/>
                    <Icon name={'star'}  size={10}/>
                    <Text style={{fontSize:10,marginLeft:3}}>{item.item.r}</Text>
                </View>
            );
        }else if(r>=7.5&& r<8.5){
            return(
                <View style={styles.Star}>
                    <Icon name={'star'} color={'orange'} size={10}/>
                    <Icon name={'star'} color={'orange'} size={10}/>
                    <Icon name={'star'} color={'orange'} size={10}/>
                    <Icon name={'star'} color={'orange'} size={10}/>
                    <Icon name={'star'} color={'gray'} size={10}/>
                    <Text style={{fontSize:10,marginLeft:3}}>{item.item.r}</Text>
                </View>
            );
        }else if(r>=8.5 && r<9.5){
            return(
                <View style={styles.Star}>
                    <Icon name={'star'} color={'orange'} size={10}/>
                    <Icon name={'star'} color={'orange'} size={10}/>
                    <Icon name={'star'} color={'orange'} size={10}/>
                    <Icon name={'star'} color={'orange'} size={10}/>
                    <Icon name={'star-half-empty'} color={'orange'} size={10}/>
                    <Text style={{fontSize:10,marginLeft:3}}>{item.item.r}</Text>
                </View>
            );
        }else if(r>= 9.5){
            return(
                <View style={styles.Star}>
                    <Icon name={'star'} color={'orange'} size={10}/>
                    <Icon name={'star'} color={'orange'} size={10}/>
                    <Icon name={'star'} color={'orange'} size={10}/>
                    <Icon name={'star'} color={'orange'} size={10}/>
                    <Icon name={'star'} color={'orange'} size={10}/>
                </View>
            );
        }else{
            return <Text style={{fontSize:12}}>暂无评分</Text>
        }

    }
    RenderItem(item){
        return(
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={()=>this.props.navigation.navigate('moviesTest',{id:item.item.id,url:item.item.img})}
            >
                <View style={styles.container}>
                    <View style={{flexDirection:'row'}}>
                    <Image source={{uri:item.item.img}}
                           style={styles.image}
                    />
                    <View style={styles.Two}>
                        <Text style={{fontSize:16,color:'black'}}>{item.item.t}</Text>
                        <View style={{flexDirection:'row'}}>
                            {this.Star(item)}
                        </View>
                        <Text style={{fontSize:12}}>导演：{item.item.dN}</Text>
                        <Text style={{fontSize:12}}
                              maxOfLine={2}
                        >主演：{item.item.actors}</Text>
                        <Text style={{fontSize:12}}>类型：{item.item.movieType}</Text>
                    </View>
                    </View>
                    <View style={styles.Three}>
                        <Text style={{fontSize:10,color:'red',marginBottom:20}}>附近有{item.item.NearestCinemaCount}家电影院在热播</Text>
                            <TouchableOpacity
                                onPress={()=>{}}
                                style={styles.Touch}
                            >
                                <Text style={{color:'red'}}>购票</Text>
                            </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
   render(){
        if(this.state.data !== null){
            return(
                <FlatList
                    data = {this.state.data}
                    renderItem ={this.RenderItem.bind(this)}
                    ItemSeparator = {()=>{
                        return <View style={{height:0.5,backgroundColor:'gray'}}/>
                    }}
                    keyExtractor={this._keyExtractor}
                />
            );
        }else{
            return <LoadingTest/>
        }

   }
}
const styles = StyleSheet.create({
   container:{
       flex:1,
       width:width-20,
       flexDirection:'row',
       backgroundColor:'white',
       justifyContent:'space-between',
       marginLeft:10,
       marginRight:6
   },
    image:{
       height:128,
        width:90,
        marginTop:20,
        marginBottom:20,
        marginRight:10
    },
    Two:{
       paddingTop:20,
        width:130
    },
    Star:{
      flexDirection:'row'
    },
    Touch:{
       borderWidth:1,
        borderColor:'red',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:1.5,
        paddingTop:4,
        paddingBottom:4,
        paddingLeft:8,
        paddingRight:8
   },
    Three:{
        alignItems:'center',
        marginTop:35,
        width:70
    }
});