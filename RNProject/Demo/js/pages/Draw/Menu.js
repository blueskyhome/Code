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
    DeviceEventEmitter
} = require( 'react-native');

import PickerTest from './PickerTest';
import ItemTest from './ItemTest';
export default class Menu extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            num:1,
        }
    }
    componentDidMount(){
      this.Load();
    }
    Load(){
        storage.getIdsForKey('city').then(ids => {
            this.setState({
                data:this.state.data.concat(ids),
            });
            console.log(this.state.data);
        });
    }
    Change=(city)=>{
       this.setState({
           data:this.state.data.concat(city),
       })
    };
    RenderItem(item){
      return <ItemTest item ={item}{...this.props}/>;
    }
    _keyExtractor = (item, index) => index.toString();
    render(){
        let data = this.state.data;
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={{uri:'http://ww1.sinaimg.cn/large/005T39qagy1fu7c741zp0j31hc0u07wi.jpg'}}
                    style={{width:300,height:200}}
                >
                    <Text style={{flexDirection:'column-reverse',justifyContent:'center'}}>天气情况</Text>
                </ImageBackground>
                <PickerTest Change={this.Change}/>
                <FlatList
                    data={data}
                    keyExtractor={this._keyExtractor}
                    renderItem={this.RenderItem.bind(this)}
                />
            </View>
        );

    }
}

const styles = StyleSheet.create({
  container:{
     flex:1
  }
});