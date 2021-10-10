import React, { Fragment }  from 'react'
import {
    Player,
    ControlBar,
    PlayToggle, // PlayToggle 播放/暂停按钮 若需禁止加 disabled
    ReplayControl, // 后退按钮
    ForwardControl,  // 前进按钮
    CurrentTimeDisplay,
    TimeDivider,
    PlaybackRateMenuButton,  // 倍速播放选项
    VolumeMenuButton
} from 'video-react';
import "../../node_modules/video-react/dist/video-react.css";
import {NavBar, Space, Toast} from "antd-mobile";
import {MoreOutline, SearchOutline} from "antd-mobile-icons";
import '../config'
import st from './st.module.scss'
import axios from "axios";
const {Url}=global.data;

class Video extends React.Component{
    state={
        curTime:0
    }
    componentDidMount(){
        const userInfo=global.data.userInfo
        //----判断用户是否登录-----
        if (userInfo.length===0){
            global.data.tabIndex=5;
            this.props.history.push('/home');
            return
        }
        //console.log(this.player)
        this.player.subscribeToStateChange(this.handleStateChange.bind(this));
        let {playTime}=this.props.match.params;
        playTime=playTime?playTime:0;
        this.player.video.seek(playTime);//跳过60秒
    }

    handleStateChange(state, prevState) {
        //console.log(state)
        const curTime=parseInt(state.currentTime);
        this.setState({curTime})
    }
    render(){
        const right = (
            <div style={{ fontSize: 18 }}>
                <Space>
                    <SearchOutline onClick={()=>console.log('search')}/>
                    <MoreOutline onClick={()=>console.log('more')}/>
                </Space>
            </div>
        )
        const back=async()=>{
            const {curTime}=this.state;
            if (curTime>30){
                this.player.video.pause()
                const userInfo=global.data.userInfo;
                const params={params: {userId:userInfo.id, videoId: 1, videoTitle: 'xzxzxzx', playTime: curTime}};
                const rs=await axios.get('writeRecordVideo',params);
                if (rs){
                    Toast.show({duration:1000,content:'播放记录写入成功'})
                    global.data.tabIndex=3;
                    setTimeout(_=>{
                        this.props.history.goBack()
                    },1000)
                }else {
                    Toast.show('写入失败')
                }
            }else {
                this.props.history.goBack()
            }
        }
        const path=Url+'images/肖战 - 神奇 (梦圆东方·2020跨年盛典)_e0033w5pqqk_2_0 [mqms].mp4'
        return(
            <Fragment>
                <div className={st.st1}>
                    <NavBar right={right} onBack={()=>back()} className={st.st3}>
                        视频播放
                    </NavBar>
                    <Player className={st.st2}
                        ref={c => {
                            this.player = c;
                        }}
                        poster={Url+'images/a.jpg'}
                    >
                        <source
                            src={path}
                            type="video/mp4"
                        />
                        <ControlBar autoHide={false} disableDefaultControls={false}>
                            <ReplayControl seconds={10} order={1.1} />
                            <ForwardControl seconds={30} order={1.2} />
                            <PlayToggle />
                            <CurrentTimeDisplay order={4.1} />
                            <TimeDivider order={4.2} />
                            <PlaybackRateMenuButton rates={[5, 2, 1.5, 1, 0.5]} order={7.1} />
                            <VolumeMenuButton />
                        </ControlBar>
                    </Player>
                </div>
            </Fragment>
        )
    }
}
export default Video
