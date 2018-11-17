import React,{Component} from 'react';
const {
    StyleSheet,
    Dimensions,
    ScrollView,
    Text,
    Image,
    TouchableOpacity,
    View,
    ImageBackground,
    FlatList,

} =require( 'react-native');

import Icon from 'react-native-vector-icons/MaterialIcons';
import Swipeout from 'react-native-swipeout';
export default class ItemTest extends Component{
    constructor(props){
        super(props);
        this.state={
            num:1
        }
    }
    render(){
        let item = this.props.item;
        let city = item.item;
        let swipeOutBtns = [
            {
                text:'删除',
                onPress:()=>{
                    storage.remove({
                        key: 'city',
                        id: item.item,
                    });
                    this.setState({
                        num:2
                    })
                },
                backgroundColor:'#ff9933',
                type:'delete'
            }
        ];
        if(this.state.num === 1){
            return(
                <Swipeout right={swipeOutBtns}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',margin:10}}>
                        <Icon name={'location-city'} size={25} color={'black'}/>
                        <Text onPress={()=>this.props.onItemSelected(city)}>{item.item}</Text>
                    </View>
                </Swipeout>
            );
        }else{
            return <View/>
        }
    }
}
