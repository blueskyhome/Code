import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import TransportTest from './TransportTest';
import GirlTest from './GirlTest';
import Mine from './Mine';
import ScrollTabTest from "./movies/ScrollTabTest";
import SwiperTest from "./SwiperTest";
export default class TabTest extends Component{
    state={
       selectedTab:'Transport',
        welcome:true,
        color:'#2196F3'
    };
    componentDidMount(){
        this.timer=setTimeout(()=>{
            this.setState({
                welcome:false
            })
        },2000);
    }
    componentWillUnmount(){
        this.timer&&clearTimeout(this.timer)
    }
    render(){
        if(!this.state.welcome){
            return(
                <TabNavigator tabBarStyle={{backgroundColor:'white',height:60}}>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'Transport'}
                        title={'Github'}
                        titleStyle={styles.TabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={()=><Image style={styles.icon}
                                               source={{uri:'http://ww1.sinaimg.cn/large/005T39qagy1fuf61z9hgzj301e01e0sh.jpg'}}
                        />}
                        renderSelectedIcon={()=><Image style={styles.icon}
                                                       source={{uri:'http://ww1.sinaimg.cn/large/005T39qagy1fuf62k2772j301c01ca9t.jpg'}}
                        />}
                        onPress={()=>this.setState({selectedTab:'Transport',color:'#2196F3'})}
                    >
                        <TransportTest {...this.props}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'Girl'}
                        title={'图片'}
                        titleStyle={styles.TabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={()=><Image style={styles.icon}
                                               source={{uri:'http://ww1.sinaimg.cn/large/005T39qagy1ftv772yafqj3014014q2p.jpg'}}
                        />}
                        renderSelectedIcon={()=><Image style={styles.icon}
                                                       source={{uri:'http://ww1.sinaimg.cn/large/005T39qagy1ftv77mhgdwj301c01ca9t.jpg'}}
                        />}
                        onPress={()=>this.setState({selectedTab:'Girl',color:'#00ffcc'})}
                    >
                        <GirlTest {...this.props}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'movies'}
                        title={'电影'}
                        titleStyle={styles.TabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={()=><Image style={styles.icon}
                                               source={{uri:'http://ww1.sinaimg.cn/large/005T39qagy1fufcipwpk2j301e01ea9t.jpg'}}
                        />}
                        renderSelectedIcon={()=><Image style={styles.icon}
                                                       source={{uri:'http://ww1.sinaimg.cn/large/005T39qagy1fufcjmvi10j301s01s0sj.jpg'}}
                        />}
                        onPress={()=>this.setState({selectedTab:'movies',color:'white'})}
                    >
                        <ScrollTabTest {...this.props}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'Mine'}
                        title={'我的'}
                        titleStyle={styles.TabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={()=><Image style={styles.icon}
                                               source={{uri:'http://ww1.sinaimg.cn/large/005T39qagy1ftv79c36f1j3014014mwx.jpg'}}
                        />}
                        renderSelectedIcon={()=><Image style={styles.icon}
                                                       source={{uri:'http://ww1.sinaimg.cn/large/005T39qagy1ftv79qne62j301c01c0sh.jpg'}}
                        />}
                        onPress={()=>this.setState({selectedTab:'Mine',color:'white'})}
                    >
                        <Mine {...this.props}/>
                    </TabNavigator.Item>
                </TabNavigator>
            );
        }else{
           return <SwiperTest/>
        }
    }
}
const styles=StyleSheet.create({
    container:{

    },
    TabText:{
       color:'black',
        fontSize:15,
    },
    selectedTabText:{
        color:'black',
    },
    icon:{
        width:30,
        height:30
    }

});