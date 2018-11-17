import React, {Component} from "react";
import {StyleSheet,
    View,
    Text,
    Image,
    ImageBackground,
    Dimensions,
    TouchableOpacity,
    AsyncStorage
} from "react-native";
const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');
import HTMLView from 'react-native-htmlview';
import ImagePicker from 'react-native-image-picker';
export default class Mine extends Component{
    constructor(props){
        super(props);
        this.state={
            Image:null
        }
    }
    componentDidMount(){
        this.load();
    }
    ImagePickerTest=()=>{
        var options={
            title:'上传头像',
            takePhotoButtonTitle:'拍照',
            cancelButtonTitle:'取消',
            chooseFromLibraryButtonTitle:'选择相册',
            quality:0.75,
            aspectX:2,
            aspectY:1,
            allowsEditing:true,
            storageOptions:{
                skipBackup:true
            }
        };
        ImagePicker.showImagePicker(options,(response)=>{
            if(response.didCancel){
                return;
            }else if(response.error){
                alert("出现错误"+ response.error)
            }else{
                let source = response.uri;
                this.save(source);
                this.load();
            }
        })
    };
    save(url){
        AsyncStorage.setItem('Image',url,(error)=>{
            if(error){
                alert(error)
            }else{
                alert('成功')
            }
        })
    }
    load(){
        AsyncStorage.getItem('Image',(error,result)=>{
            if(!error){
                this.setState({
                    Image:result,
                });
            }
        })
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.One}>
                    <TouchableOpacity
                        onPress={this.ImagePickerTest.bind(this)}
                    >
                        {
                            this.state.Image === null ?
                                <Image
                                    style={{width:60,height:60,borderRadius:30,marginLeft:20}}
                                    source={{uri:'http://ww1.sinaimg.cn/large/005T39qagy1fu93xcfehqj30hs0hst92.jpg'}}
                                />: <Image
                                    style={{width:60,height:60,borderRadius:30,marginLeft:20}}
                                    source={{uri:this.state.Image}}
                                />
                        }
                    </TouchableOpacity>
                    <View style={styles.partOne}>
                        <Text style={{fontSize:20}}>北冥有鱼</Text>
                        <Text>用程序丈量人生，用键盘敲出天下</Text>
                    </View>
                </View>
                <View style={styles.Two}>
                    <TouchableOpacity style={styles.partTwo}
                                      onPress={()=>this.props.navigation.navigate('Menu')}
                    >
                        <Image style={{width:40,height:40}}
                               source={{uri:'http://ww1.sinaimg.cn/large/005T39qagy1fu2f38n4j6j307407475d.jpg'}}
                        />
                        <Text style={{fontSize:15,color:'black'}}>天气</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.partThree}
                                      onPress={()=>this.props.navigation.navigate('SendTest')}
                    >
                        <Image style={{width:40,height:40}}
                               source={{uri:'http://ww1.sinaimg.cn/large/005T39qagy1fu2ezflcspj30m80i8jtj.jpg'}}
                        />
                        <Text style={{fontSize:15,color:'black'}}>快递</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.Two}>
                    <TouchableOpacity style={styles.partTwo}
                                      onPress={()=>this.props.navigation.navigate('HomeZ')}
                    >
                        <Image style={{width:40,height:40}}
                               source={{uri:'http://ww1.sinaimg.cn/large/005T39qagy1fuao8fr5ovj31kq16m41s.jpg'}}
                        />
                        <Text style={{fontSize:15,color:'black'}}>知乎日报</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.partThree}
                                      onPress={()=>this.props.navigation.navigate('ReadList')}
                    >
                        <Image style={{width:40,height:40}}
                               source={{uri:'http://ww1.sinaimg.cn/large/005T39qagy1fuf5yvo2yvj302s02s3yd.jpg'}}
                        />
                        <Text style={{fontSize:15,color:'black'}}>闲文</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.TwoTwo}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('HomeZ')}
                                      style={{justifyContent:'center',alignItems:'center'}}
                    >
                        <Image style={{width:40,height:40}}
                               source={{uri:'http://ww1.sinaimg.cn/large/005T39qagy1fv3o2nqdxaj30ar08p747.jpg'}}
                        />
                        <Text style={{fontSize:15,color:'black'}}>百度百科</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}
const styles=StyleSheet.create({
   container:{
       flex:1,
   },
    One:{
       backgroundColor:'#00ff66',
        flexDirection:'row',
        height:80,
        alignItems:'center',
        marginTop:20
    },
    partOne:{
       marginLeft:10,
        justifyContent:'center'
    },
    Two:{
       marginTop:40,
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'white',
        borderRadius:5,
        width:width-40,
        marginLeft:20
    },
    partTwo:{
       justifyContent:'center',
        alignItems:'center',
        paddingLeft:75
    },
    partThree:{
        justifyContent:'center',
        alignItems:'center',
        paddingRight:75
    },
    TwoTwo:{
        marginTop:40,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        borderRadius:5,
        width:width-40,
        marginLeft:20
    }

});