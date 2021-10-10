import {NavBar, Space,Badge} from "antd-mobile";
import {MoreOutline, SearchOutline} from "antd-mobile-icons";
import React from 'react'
import axios from "axios";
import '../config'
import st from './st.module.scss'
const {Url}=global.data;

class Detail extends React.Component{
    state={
        obj:{},
        num:0,
    }
    async componentDidMount(){
        const id=this.props.match.params.id;
        const rs=await axios.get('getArtId?id='+id);
        const obj1=rs.obj;
        obj1.content=obj1.content.replace(/{{imgUrl}}/g,Url)
        obj1.date=new Date(obj1.updatedAt).toLocaleDateString();
        this.setState({
            obj:obj1,
            num:rs.num
        })
    }

    back (){
        global.data.tabIndex=1;
        this.props.history.goBack()

    }
    goComment(id){
        this.props.history.push('/comment/'+id)
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
        const {obj,num}=this.state;
        return(
            <div className="detail">
                <div className={st.st1}>
                    <NavBar right={right} onBack={()=>this.back()} className={st.st2}>
                        文章详情
                    </NavBar>
                    <section>
                        <h3>{obj.title}</h3>
                        <aside>{obj.date}</aside>
                        <article dangerouslySetInnerHTML={{__html: obj.content}}></article>
                    </section>
                    <div className={st.st3}  onClick={()=>this.goComment(obj.id)}>
                        <Badge content={num}>
                            <span className={st.st4}/>
                        </Badge>
                    </div>
                </div>
            </div>

        )
    }

}
export default Detail
