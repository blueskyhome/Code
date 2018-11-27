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
    StatusBar
} from 'react-native';
import LoadingTest from "./LoadingTest";
let pageNo = 1;
let totalPage = 20;
const {width} =Dimensions.get('window');
/*import Girl from '../DataList/Girl';*/
const first = 'https://www.apiopen.top/meituApi?page=';
//const last = '&count=20';
export default class GirlTest extends Component{
    constructor(props){
        super(props);
        this.state={
            dataArray:[],
            isLoading:true,
            showFoot:0,
            isRefreshing:false,
        }
    }
    componentDidMount(){
        this.timer = setTimeout(
            () => this.fetchData(pageNo),
            1000
        );
    }
    componentWillUnmount() {
        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer);
    }
    fetchData =(pageNo)=>{
        console.log(pageNo);
        if(pageNo >= 25){
            this.setState({showFoot:1})
        }else{
            const url = first+pageNo;
            fetch(url)
                .then((response)=>response.json())
                .then((json)=>{
                    let data = json.data;
                    let dataBlob = [];
                    let i = 0;
                    data.map(function (item) {
                        dataBlob.push({
                            key: i,
                            value: item,
                        });
                        i++;
                    });
                    this.setState({
                        dataArray:this.state.dataArray.concat(dataBlob),
                        showFoot:0
                    });
                    data = null;
                    dataBlob = null;
                })
                .catch((error)=>{
                    alert(error)
                });
        }
    };
    Header=()=>{
        return(
            <View style={styles.head}>
                  <Text style={{color:'white',fontSize:18}}>放松一下吧!</Text>
            </View>
        );
    };
    _keyExtractor = (item, index) => index.toString();
    RenderItem=({item})=>{
        const images = [
            {
                props:{
                    source:{url:item.value.url}
                },
                freeHeight:true,
            }
        ];
        if(!item){
            return <Text>loading.....</Text>
        }else {
            return (
                <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('GirlPhoto',{url:item.value.url})}>
                <Image style={{height:width/2*1.5,width:width/2}}
                       source={{uri:item.value.url === '' ? 'http://ww1.sinaimg.cn/large/005T39qagy1fui9apma58j321g19w000.jpg':item.value.url}}
                />

                </TouchableWithoutFeedback>
            );
        }
    };
    separator = () => {
        return <View style={{height:2,backgroundColor:'#FFB6C1'}}/>;
    };
    _renderFooter(){
        if(this.state.showFoot === 1){
            return (
                <View
                    style={{height:30,alignItems:'center',justifyContent:'flex-start'}}
                >
                    <Text style={{color:'#999999',fontSize:14,marginTop:5,marginBottom:5}}>没有数据了</Text>
                </View>
            );
        }else if(this.state.showFoot === 2){
            return(
                <View style={styles.footer}>
                    <ActivityIndicator/>
                    <Text>正在加载数据...</Text>
                </View>
            );
        }else if(this.state.showFoot ===0){
            return <View style={styles.footer}/>
        }
    }
    _onEndReached(){
        if(this.state.showFoot !== 0){
            return;
        }
        if((pageNo!==1)&& pageNo>=totalPage){
            return;
        }else{
            pageNo++;
        }
        this.setState({showFoot:2});
        this.fetchData(pageNo);
    }
    render(){
        if(this.state.dataArray){
            return(
                <FlatList
                    ListFooterComponent={this._renderFooter.bind(this)}
                    ListHeaderComponent={this.Header}
                    numColumns={2}
                    data={this.state.dataArray}
                    renderItem={this.RenderItem.bind(this)}
                    ItemSeparatorComponent={this.separator}
                    getItemLayout={(data, index) => (
                        {length: width/2*1.5, offset: (width/2*1.5+2) * index, index}
                    )}
                    keyExtractor={this._keyExtractor}
                    onEndReachedThreshold={0}
                    onEndReached={this._onEndReached.bind(this)}
                />
            );
        }else{
            return <LoadingTest/>
        }

    }
}
const styles=StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    foot:{
        justifyContent:'center',
        alignItems:'center',
        width:width,
        height:30
    },
    head:{
        justifyContent:'center',
        alignItems:'center',
        width:width,
        height:50,
        backgroundColor:'#00ffcc'
    },
    footer:{
        flexDirection:'row',
        height:24,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10,
    },
});