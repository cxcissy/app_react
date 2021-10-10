import {NavBar, Popup, Button, Form, TextArea} from "antd-mobile";
import React from 'react'
import axios from "axios";
import '../config'
import st from './st.module.scss'
const {Url}=global.data;

class Comment extends React.Component{
    state={
        arr:[],
        visible:false,
        artId: 0,
    }
    componentDidMount(){
        this.showData()
    }

    async showData(){
        const id=this.props.match.params.id;
        this.setState({
            artId:id
        })
        let temp=await axios.get('getComment1?artId='+id);
        temp=temp.map(el=>{
            el.date=new Date(el.updatedAt).toLocaleDateString();
            if (el.imgPaths){
                el.imgPaths=JSON.parse(el.imgPaths);
                el.imgArr=el.imgPaths.map(el1=>{
                    el1=Url+'sourceImg/'+el1;
                    return el1
                })
            }
            return el
        })

        this.setState({
            arr:temp,
            artId: id - 0,
        })
    }
    back (){
        this.props.history.goBack()
    }
    showCom(){
        const userInfo=global.data.userInfo;
        if (userInfo.length===0){
            this.props.history.push('/login');
            return;
        }
        this.setState({ visible: true });
    }
    async public({ content }) {
        const userInfo=global.data.userInfo;
        const userId = userInfo[0];
        const artId = this.state.artId;
        const params = { params: { userId, content, artId } };
        const obj = await axios.get("postComment1", params);
        if (obj) {
            this.showData();
            this.setState({
                visible:false
            })
        }
    }
    render(){
        const right = (
            <div style={{ fontSize: 18 }} onClick={()=>this.showCom()}>
                发表评论
            </div>
        )
        const {arr,visible}=this.state;
        return(
            <div className="detail">
                <div className={st.st1}>
                    <NavBar right={right} onBack={()=>this.back()} className={st.st2}>
                        评论
                    </NavBar>
                    <ul>
                        {
                            arr.map(el=>{
                                return(
                                    <li key={el.id}>
                                        <h5>
                                            {el.nickName}
                                            <span>{el.date}</span>
                                        </h5>
                                        <p>{el.content}</p>
                                        {
                                            el.imgArr?(
                                                <aside>
                                                    {
                                                        el.imgArr.map(el1=>{
                                                            return(
                                                                <img src={el1} alt="" key={el1}/>
                                                            )
                                                        })
                                                    })

                                                </aside>
                                            ):null
                                        }

                                    </li>
                                )
                            })
                        }
                    </ul>
                    <Popup visible={visible}
                    onMaskClick={()=>this.setState({visible: false})}
                    postion="top"
                           bodyStyle={{minHeight:'40%'}}
                    >
                        <Form
                            onFinish={(val) => this.public(val)}
                            footer={
                                <Button block type="submit" color="primary">
                                    提交
                                </Button>
                            }
                        >
                            <Form.Item name="content" label="内容">
                                <TextArea placeholder="请输入内容" maxLength={100} rows={6} />
                            </Form.Item>
                        </Form>
                    </Popup>
                </div>
            </div>

        )
    }

}
export default Comment
