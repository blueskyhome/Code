import React, {Component} from 'react';
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

} from 'react-native';
import LoadingTest from "../LoadingTest";
import HeaderTest from "../user/HeaderTest";
const URL ='http://v3.wufazhuce.com:8000/api/reading/index/?version=3.5.0&platform=android';
import {pWidth, pHeight, pSize} from '../user/util';
let {width} = Dimensions.get('window');
export default class ReadList extends Component{
    static navigationOptions=()=>{
        return{
            header:null
        }
    };
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
    }
    componentDidMount(){
        this.GetTwo();
    }
    shouldComponentUpdate(){
       if(this.state.data){
           return true;
       }else{
           return false;
       }
    }
    fetchData = ()=>{
            fetch(URL)
                .then(response=>response.json())
                .then((jsonData)=>{
                    let data = jsonData.data.essay;
                    this.Save(data);
                    this.Get();
                })
                .catch(error=>{
                    alert(error);
                });
    };
    Save=(data)=>{
       storage.save({
           key:'essay',
           data:data,
           expires:null,
       });
    };
    Get(){
        storage.load({
            key:'essay',
            autoSync:true,
            syncInBackground:true,
        }).then(ret =>{
            this.setState({data:ret});
        }).catch(err => {
            console.warn(err.message);
            switch (err.name) {
                case 'NotFoundError':
                    // TODO;
                    break;
                case 'ExpiredError':
                    // TODO
                    break;
            }
        });
    }
    GetTwo=()=>{
        let r;
        storage.load({
            key:'essay',
            autoSync:true,
            syncInBackground:true,
        }).then(ret =>{
           this.setState({data:ret});
            r = ret;
        }).catch(err => {
            console.warn(err.message);
            switch (err.name) {
                case 'NotFoundError':
                    // TODO;
                    break;
                case 'ExpiredError':
                    // TODO
                    break;
            }
        });
        if(!r){
            this.fetchData();
        }
    };
    _keyExtractor = (item, index) => index.toString();
    RenderItem(item){
        if(this.state.data){
            return(
                <TouchableWithoutFeedback
                    onPress={()=>this.props.navigation.navigate('One',{id:item.item.content_id,text:item.item.guide_word})}
                >
                    <View style={styles.container}>
                    <Image source={{uri:item.item.author[0].web_url}}
                           style={{width:100,height:100}}
                    />
                    <View style={styles.One}>
                        <Text style={{marginTop:10,fontSize:pSize(20),height:50}}
                              numberOfLines={2}
                        >{item.item.hp_title}</Text>
                        <Text style={{marginTop:pHeight(10),marginRight:5}}
                              numberOfLines={2}
                        >导读：{item.item.guide_word}</Text>
                    </View>
                </View>
                </TouchableWithoutFeedback>

            );
        }else{
           return <LoadingTest/>
        }

    }
    render(){
        let data =this.state.data;
        return(
            <View style={{flex:1}}>
                <HeaderTest name={'闲文'} have={false} {...this.props}/>
               <FlatList
                   data={data}
                   renderItem={this.RenderItem.bind(this)}
                   keyExtractor={this._keyExtractor}
               />
            </View>
        );
    }
}
const styles =StyleSheet.create({
   container:{
       flex:1,
       flexDirection:'row',
       borderRadius:5,
       justifyContent:'center',
       borderWidth:0.5,
       borderColor:'gray',
       width:width-pWidth(20),
       height:pHeight(120),
       alignItems:'center',
       marginLeft:pWidth(10),
       marginTop:pHeight(10),
       marginRight:pWidth(10),
       marginBottom:pHeight(10),
       backgroundColor:'white'
   },
    One:{
       width:width-pWidth(120),
        height:pHeight(120),
        alignItems:'stretch',
        margin:pHeight(10)
    }
});