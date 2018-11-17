
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    FlatList,
    Button,
    Image,
    TouchableOpacity
} from 'react-native';
import Http  from './Http';
var url='http://www.imooc.com/api/teacher?type=4&num=100';
export  default class book extends Component{
    /*static navigationOptions = {
        title:'详情页',
        header:null,
    };*/
    state={
        data:null,
    };
    fetchData =()=>{
        Http.get(url)
            .then((jsonData)=>{
                this.setState({
                    data:jsonData.data,
                })
            })
            .catch((error)=>{
                alert(error);
            });
    };
    Header(){
        return(
            <View style={styles.header}>
                <Text style={{fontSize:25,color:'red'}}>书目信息</Text>
            </View>
        );
    };

    Separator=()=>{
        return(
            <View style={{height:10}}></View>
        );
    };
    extraUniqueKey(item ,index){
        return "index"+index+item;
    }
    render(){
        if(!this.state.data){
            return(
                <Text>loading.....</Text>
            );
        }else{
            return(
                <View style={styles.container}>
                    <FlatList
                        data={this.state.data}
                        renderItem={this.RenderItem}
                        ListHeaderComponent={this.Header}
                        refreshing={true}
                        ItemSeparatorComponent={this.Separator}
                        OnRefresh={()=>{}}
                        keyExtractor = {this.extraUniqueKey}
                    />
                </View>
            );
        }

    }
    componentDidMount(){
        this.fetchData();
    }

    RenderItem=(item)=>{
        let {navigate} = this.props.navigation;
        return(
            <TouchableOpacity style={styles.lvRow}
                              onPress={()=>navigate('Second',{name:item.item.name,picSmall:item.item.picSmall,description:item.item.description})}
            >
                <Image style={styles.img}
                       source={{uri:item.item.picSmall}}
                />
                <View style={styles.textView}>
                    <Text style={styles.textView}
                          numberOfLines={1}
                    >{item.item.name}</Text>
                    <Text style={styles.textContent}>{item.item.description}</Text>
                </View>
            </TouchableOpacity>
        );

    }

}
const styles =StyleSheet.create({
    lvRow:{
        flex:1,
        flexDirection:'row',
        padding:10,
    },
    textView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:5
    },
    textTitle:{
        flex:1,
        textAlign:'center',
        color:'#f00',
    },
    textContent:{
        flex:1,
        fontSize:11,
        color:'#000',
        textAlign:'center',
    },
    img:{
        height:55,
        width:100,
    },
    header:{
        height:30,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'blue'
    }
})