import React from 'react'
import '../../config'
import st from './st.module.scss'
import axios from "axios";
import {Search, List} from 'antd-mobile'
const {screenH}=global.data;

class AudioHistory extends React.Component{
    state={
        arr:[],
        subArr:[]
    }
    async componentDidMount(){
        const userInfo=global.data.userInfo;
        if (userInfo.length===0){
            global.data.tabIndex=4;
            this.props.history.push('/login')
        }else {
            const userId=userInfo.userId;
            let temp=await axios.get('getRecords?userId'+userId)
            temp=temp.map(el=>{
                let json={};
                json.id=el.id;
                json.title=el.audioTitle;
                json.playTime=el.playTime;
                json.audioId=el.audioId;
                json.date=new Date(el.updatedAt).toLocaleDateString();
                return json;
            })
            this.setState({
                arr:temp,
                subArr:temp
            })
        }
    }
    onSearch(val){
        const arr=this.state.arr;
        const temp=arr.filter(el=>{
            return el.title.indexOf(val)>=0
        })
        this.setState({
            subArr:temp
        })
    }
    onChange(val){
        const arr=this.state.arr;
        if (val.trim()===''){
            this.setState({
                subArr:arr
            })
        }
    }
    onToAudio(audioId,playTime){
        console.log(audioId)
        this.props.history.push('/audioPlay/'+audioId+'/'+playTime)
    }
    render(){
        const {subArr}=this.state
        return(
            <div className="history_audio">
                <div className={st.st1}>
                    <Search
                        className={st.st2}
                        placeholder='请输入内容'
                        showCancelButton
                        onSearch={(val)=>this.onSearch(val)}
                        onChange={(val)=>this.onChange(val)}
                    />
                    <List style={{height:screenH-145+'px'}} className={st.st3}>
                        {
                            subArr.map(el=>{
                                return(
                                    <List.Item
                                               key={el.id}
                                               extra={el.playTime}
                                               description={el.date}
                                               clickable
                                               onClick={()=>this.onToAudio(el.audioId,el.playTime)}
                                    >
                                        <aside>{el.title}</aside>
                                    </List.Item>
                                )

                            })
                        }

                    </List>
                </div>
            </div>
        )
    }
}
export default AudioHistory
