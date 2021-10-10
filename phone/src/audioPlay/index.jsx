import React from 'react'
import '../config'
import st from './st.module.scss'
import { NavBar, Space, Slider,ProgressBar,Toast,Image} from 'antd-mobile'
import { SearchOutline, MoreOutline } from 'antd-mobile-icons'
import axios from "axios";
const {Url}=global.data;

class AudioPlay extends React.Component{
    state={
        obj:{},
        myAudio:null,
        playIcon:Url+'tabbar/img/play.png',
        prog:0,
        curTime:0,
        totalTime:0,
        id:0,
        dataType:'',
        isPlaying:false,
        useInfo:global.data.userInfo
    }
    async componentDidMount() {
        //----判断用户是否登录-----
        if (this.state.useInfo.length===0){
            global.data.tabIndex=5;
            this.props.history.push('/home');
            return
        }
        //-------初始化Audio---------
        const myAudio=new Audio();
        const {id,playTime}=this.props.match.params;
        myAudio.currentTime=playTime?playTime:0;//判断当前时间是否存在
        myAudio.volume=1;
        myAudio.preload=true;
        this.setState({
            myAudio
        })
        //-------获取后台数据----------
        const obj=await axios.get('getAudioId?id='+id);
        const dataType=obj.dataType
        this.setState({
            id,
            dataType
        })
        this.setData(obj)
    }

    setData(obj){
        const {myAudio}=this.state;
        myAudio.src=Url+obj.url+'?cb='+new Date().getTime();
        obj.src=Url+obj.smallSrc;
        obj.date=new Date(obj.updatedAt).toLocaleDateString();
        obj.con='xzxzxzxzxzxz'
        this.setState({
            obj,
        })
    }
    play(){
        const {myAudio}=this.state;
        myAudio.play().catch(error=>{//播放异常流程
        })
        this.setState({
            playIcon:Url+'tabbar/img/play1.png',
            isPlaying:true
        })
        myAudio.ontimeupdate=()=>{
            let totalTime=parseInt(myAudio.duration);
            const curTime=parseInt(myAudio.currentTime);
            this.setState({
                curTime,
                totalTime,
                prog: (curTime/totalTime)*100
            })
        }
    }
    pause(){
        const {myAudio,isPlaying}=this.state;
        if (isPlaying){
            myAudio.pause()
            this.setState({
                playIcon:Url+'tabbar/img/pause1.png',
            })
        }
    }
    async back (){
        const {obj,curTime,myAudio}=this.state;
        if (curTime>30){
            myAudio.pause()
            const userInfo=global.data.userInfo;
            const params={params: {userId:userInfo.id, audioId: obj.id, audioTitle: obj.title, playTime: curTime}};
            const rs=await axios.get('writeRecord',params);
            if (rs){
                Toast.show({duration:1000,content:'播放记录写入成功'})
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
    onChange(val){
        const {myAudio}=this.state
        myAudio.currentTime=parseInt(( val /100)*myAudio.duration);
        this.setState({
            prog:val,
        })
        this.pause()
    }
    async prev(){
        const {id,dataType,myAudio}=this.state;
        const params={params:{id,dataType}};
        const obj=await axios.get('getAudioPrev',params);
        if (obj){
            myAudio.currentTime=0;
            this.pause();
            this.setData(obj);
            this.setState({
                id:obj.id,
                prog:0
            })
        }else {
            Toast.show('已经是第一首了')
        }
    }
    async next(){
        const {id,dataType,myAudio}=this.state;
        const params={params:{id,dataType}};
        const obj=await axios.get('getAudioNext',params);
        if (obj){
            myAudio.currentTime=0;
            this.pause();
            this.setData(obj);
            this.setState({
                id:obj.id,
                prog:0
            })
        }else {
            Toast.show('已经是最后一首了')
        }
    }
    render() {
        const right = (
            <div style={{ fontSize: 18 }}>
                <Space>
                    <SearchOutline onClick={()=>console.log('search')}/>
                    <MoreOutline onClick={()=>console.log('more')}/>
                </Space>
            </div>
        )
        const {obj,playIcon,prog,curTime,totalTime}=this.state;
        return(
            <div className={st.st1}>
                <NavBar right={right} onBack={()=>this.back()} className={st.st2}>
                    音频播放
                </NavBar>
                <div className={st.st3}>
                    <h3>{obj.title}</h3>
                    <aside>{obj.date}</aside>
                    <div className={st.st4}>
                        <span className={st.prev} onClick={()=>this.prev()}></span>
                        <span className={st.play}
                              onClick={()=>{this.play()}}>
                            <img src={playIcon} alt=""/>
                        </span>
                        <span className={st.pause} onClick={()=>this.pause()}></span>
                        <span className={st.next} onClick={()=>this.next()}></span>
                    </div>
                    <ProgressBar percent={prog} strokeWidth={2} style={{color:'red'}}/>
                    <div className={st.st5}>
                        <span className={st.current}>{curTime}</span>
                        /
                        <span className={st.total}>{totalTime?totalTime:0}</span>
                    </div>
                    <Slider onChange={(val)=>this.onChange(val)}/>
                    <div className={st.st6}>
                        <section>{obj.con}</section>
                        <Image src={obj.src} width="100%"/>
                    </div>
                </div>
            </div>
        )
    }


}
export default AudioPlay
