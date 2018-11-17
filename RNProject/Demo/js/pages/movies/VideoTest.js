import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconOne from 'react-native-vector-icons/Feather';
import IconTwo from 'react-native-vector-icons/Entypo';
export default class VideoTest extends Component{
    constructor(props){
        super(props);
        //设置初始状态
        this.state={
            rate:1,
            volume:1,
            muted:false,
            resizeMode:'contain',
            duration:0.0,
            currentTime:0.0,
            paused:true,
            orientation:''
        }
    }

    //初始化屏幕
    componentWillMount(){
        const init = Orientation.getInitialOrientation();
        this.setState({
            orientation:init
        })
    }

    //添加监听
    componentDidMount(){
        Orientation.addOrientationListener(this.updataOrientation);
    }

    //移除监听
    componentWillUnmount(){
        Orientation.removeOrientationListener(this.updataOrientation);
        Orientation.lockToPortrait();
    }
    //获取手机屏幕情况，赋值个状态机
    updataOrientation =(orientation) =>this.setState({orientation});

    //切换横竖屏
    Change(){
        if(this.state.orientation === 'PORTRAIT'){
            this.video.presentFullscreenPlayer();//满屏
            Orientation.lockToLandscape();//锁定横屏
            this.setState({
                orientation:"LANDSCAPE"
            })
        }else{
            this.video.dismissFullscreenPlayer();//退出满屏
            Orientation.lockToPortrait();//锁定竖屏
            this.setState({
                orientation:'PORTRAIT'
            })
        }
    }

    //获取文件信息
    onLoad = (data) =>{
        this.setState({duration:data.duration})//获取时长
    };

    //获取视频当前时间
    onProgress = (data) =>{
        this.setState({currentTime:data.currentTime})
    };

    //视频结束后的回调
    onEnd = ()=>{
        this.setState({paused:true});//暂停
        this.video.seek(0);//设置初始时间为视频开始
    };

    //拔出耳机后视频暂停
    onAudioBecomingNoisy = () =>{
        this.setState({paused:true})
    };

    //制作进度条的准备函数
    getCurrentTimePercentage(){
        if(this.state.currentTime > 0){
            return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
        }
        return 0;
    }

    //倍数函数
    renderRateControl(rate){
        const isSelected = (this.state.rate === rate);

        return(
            <TouchableOpacity onPress={()=>{this.setState({rate})}}>
                <Text style={[styles.controlOption,{fontWeight:isSelected ? 'bold':'normal',fontSize: isSelected? 15:12}]}>
                    {rate}x
                </Text>
            </TouchableOpacity>
        );
    }

    //视图函数
    renderResizeModeControl(resizeMode) {
        const isSelected = (this.state.resizeMode === resizeMode);

        return (
            <TouchableOpacity onPress={() => { this.setState({ resizeMode }) }}>
                <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
                    {resizeMode}
                </Text>
            </TouchableOpacity>
        )
    }

    //音量函数
    renderVolumeControl(volume) {
        const isSelected = (this.state.volume === volume);

        return (
            <TouchableOpacity onPress={() => { this.setState({ volume }) }}>
                <Text style={[styles.controlOption, { fontWeight: isSelected ? 'bold' : 'normal' }]}>
                    {volume * 100}%
                </Text>
            </TouchableOpacity>
        )
    }

    //渲染函数
    render(){
        const flexCompleted =this.getCurrentTimePercentage()*100;
        const flexRemaining = (1-this.getCurrentTimePercentage())*100;
        const {params} = this.props.navigation.state;
        return(
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.fullScreen}
                    onPress={()=>this.setState({paused:!this.state.paused})}
                >
                    <Video
                        ref={(ref)=>this.video=ref}
                        source={{uri:params.url}}
                        playInBackground={true}
                        style={styles.fullScreen}
                        rate={this.state.rate}
                        paused={this.state.paused}
                        volume={this.state.volume}
                        muted={this.state.muted}
                        resizeMode={this.state.resizeMode}
                        onLoad={this.onLoad}
                        onProgress={this.onProgress}
                        onEnd={this.onEnd}
                        onAudioBecomingNoisy={this.onAudioBecomingNoisy}
                        repeat={false}
                    />
                </TouchableOpacity>
                {this.state.paused ? <Icon name={'pause'} size={50} color={'white'}/>:null}
                <View style={styles.controls}>
                    <View style={styles.generalControls}>
                        <View style={styles.rateControl}>
                            {this.renderRateControl(0.25)}
                            {this.renderRateControl(0.5)}
                            {this.renderRateControl(1.0)}
                            {this.renderRateControl(1.5)}
                            {this.renderRateControl(2.0)}
                        </View>

                        <View style={styles.volumeControl}>
                            {this.renderVolumeControl(0.5)}
                            {this.renderVolumeControl(1)}
                            {this.renderVolumeControl(1.5)}
                        </View>

                        <View style={styles.resizeModeControl}>
                            {this.renderResizeModeControl('cover')}
                            {this.renderResizeModeControl('contain')}
                            {this.renderResizeModeControl('stretch')}
                        </View>
                    </View>

                    <View style={styles.trackingControls}>
                        <View style={styles.progress}>
                            <View style={[styles.innerProgressCompleted, { flex: flexCompleted }]} />
                            <View style={[styles.innerProgressRemaining, { flex: flexRemaining }]} />
                        </View>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <TouchableOpacity
                            onPress={()=>{
                                if(this.state.muted){
                                    this.setState({muted:false})
                                }else{
                                    this.setState({muted:true})
                                }
                            }}
                        >
                            <IconOne name={'volume-x'} size={30} color={'white'}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.Change.bind(this)}
                        >
                            <IconTwo name={'resize-full-screen'} size={30} color={'white'}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    controls: {
        backgroundColor: 'transparent',
        borderRadius: 5,
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
    progress: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 3,
        overflow: 'hidden',
    },
    innerProgressCompleted: {
        height: 10,
        backgroundColor: '#cccccc',
    },
    innerProgressRemaining: {
        height: 10,
        backgroundColor: '#2C2C2C',
    },
    generalControls: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 4,
        overflow: 'hidden',
        paddingBottom: 10,
    },
    rateControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    volumeControl: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    resizeModeControl: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    controlOption: {
        alignSelf: 'center',
        fontSize: 11,
        color: 'white',
        paddingLeft: 2,
        paddingRight: 2,
        lineHeight: 12,
    },
});