import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Text,
    Image,
    DeviceEventEmitter
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import TransportTest from './TransportTest';
import GirlTest from './GirlTest';
import Mine from './Mine';
import ScrollTabTest from "./movies/ScrollTabTest";
import Login from "./Login";
export default class TabTest extends Component{
    state={
       selectedTab:'Transport',
        screen:'welcome'
    };
    componentDidMount(){
        this.deEmit = DeviceEventEmitter.addListener('go',(a)=>{
            if(a==='go'){
                this.setState({
                    screen:'Go'
                })
            }
        })
    }
    componentWillUnmount(){
        this.deEmit&&clearTimeout(this.deEmit);
    }
    render(){
        if(this.state.screen === 'welcome'){
            return <Login/>;
        }else{
            return(
                <TabNavigator tabBarStyle={{backgroundColor:'white'}}>
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
                        onPress={()=>this.setState({selectedTab:'Transport'})}
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
                        onPress={()=>this.setState({selectedTab:'Girl'})}
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
                        onPress={()=>this.setState({selectedTab:'movies'})}
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
                        onPress={()=>this.setState({selectedTab:'Mine'})}
                    >
                        <Mine {...this.props}/>
                    </TabNavigator.Item>
                </TabNavigator>
            );

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
        width:20,
        height:20
    }

});