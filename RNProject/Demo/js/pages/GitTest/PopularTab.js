import React,{ Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    TouchableOpacity,
    RefreshControl,
} from 'react-native';
const URL = 'https://api.github.com/search/repositories?q=';
const STR = '&sort=stars';
import DataRepository from "../../DataList/DataRepository";
export default class  PopularTab extends Component {
    constructor(props){
        super(props);
        this.dataRepository =new DataRepository();
        this.state={
            data:[],
            isLoading:false
        }
    }
    componentDidMount(){
        this.onLoad();
    }
    onLoad=()=>{
        this.setState({
            isLoading:true,
        });
        let url = this.getUrl(this.props.tabLabel);
        this.dataRepository
            .fetchRepository(url)
            .then(result=>{
                let items = result&&result.items?  result.items:result?result:[];
                this.setState({
                    data:items,
                    isLoading:false,
                });
                if(result&&result.update_data&&!this.dataRepository.checkData(result.update_data)){
                    return this.dataRepository.fetchNetRepository(url);
                }
            })
            .then(items=>{
                if(!items||items.length===0) return;
                this.setState({
                    data:items,
                })
            })
            .catch(error=>{
                console.log(error);
                this.setState({
                    isLoading:false
                });
            })
    };
    getUrl(key){
        return URL+key+STR;
    }
    RenderItem(item){

        return(
            <TouchableOpacity
                onPress={()=>this.props.navigation.navigate('WebTest',{full_name:item.item.full_name,url:item.item.html_url})}
            >
                <View style={{margin:10}}>
                    <Text style={{fontSize:15,paddingBottom:10}}>{item.item.full_name}</Text>
                    <Text style={{paddingBottom:10}}>{item.item.description}</Text>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row',paddingBottom:10}}>
                            <Text style={{paddingLeft:5}}>author:</Text>
                            <Image source={{uri:item.item.owner.avatar_url}}
                                   style={{width:20,height:20}}
                            />
                        </View>
                        <Text style={{paddingBottom:10}}>star:{item.item.stargazers_count}</Text>
                        <Image source={{uri:'http://ww1.sinaimg.cn/large/005T39qagy1ftwk08ktdkj301c01c3y9.jpg'}}
                               style={{width:20,height:20}}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        );
    };
    SeparatorComponent(){
        return(
            <View style={styles.item}/>
        );
    }
    render(){
        let data =this.state.data;
        return(
            <View style={{flex:1}}>
                <FlatList
                    renderItem={this.RenderItem.bind(this)}
                    data={data}
                    ItemSeparatorComponent={this.SeparatorComponent}
                    keyExtractor={(item, index) => index.toString()}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isLoading}
                            onRefresh={()=>this.onLoad()}
                            colors={['#2196f3']}
                            tintColor={'#2196f3'}
                            title={'Loading...'}
                        />
                    }
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    icon:{
        height:30,
        width:30,
        paddingLeft:20,
        paddingRight:10,
    },
    item:{
        borderWidth:1,
        borderColor:'orange',
        height:1,
    }
});