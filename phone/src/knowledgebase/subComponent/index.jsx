import React from 'react'
import axios from "axios";
import '../../config'
import {InfiniteScroll, List, Toast} from 'antd-mobile';
import st from "./st.module.scss";

const {Url,screenH} = global.data;

class SubCom extends React.Component{
    state={
        isLoading:false,
        refreshing:false,
        arr:[],
        hasData:true,
        dataType:this.props.dataType
    }
    componentDidMount(){
        this.loadData()
    }
    async loadData(){
        const {dataType,arr}=this.state
        this.setState({
            isLoading:true
        })
        const start=arr.length;
        const params = {params: {start, dataType, isAudio: true, pageSize: 5}};
        let temp = await axios.get('mediaData', params);
        if (temp.length === 0) {
            Toast.show('已经没有数据了！')
            this.setState({
                hasData:false
            })
        }
        temp = temp.map(el => {
            el.date = new Date(el.updatedAt).toLocaleDateString();
            el.con = '内容';
            el.src = Url + el.smallSrc
            return el
        })
        this.setState({
            arr:[...arr,...temp],
            isLoading:false,
            refreshing:false
        })
    }

    onRefresh(){
        this.setState({
            refreshing:true,
            arr:[],
            hasData:true
        })
        this.loadData();
    }
    toDetail(id){
        this.props.history.push('/audioPlay/'+id)
    }
    loadMore(){
        const {isLoading,hasData}=this.state;
        if (isLoading||!hasData){
            return
        }
        this.loadData();
    }
    render() {
        const {hasData,arr}=this.state;
        return (
            <div className={st.st1} style={{height:screenH-100+'px'}}>
                <List>
                    {
                        arr.map((el) => {
                            return (
                                <List.Item onClick={() => this.toDetail(el.id)} key={el.id} className={st.st2}>
                                    <div className={st.st3}>
                                        <section style={{flex: 7}}>
                                            <h3>{el.title}</h3>
                                            <aside>{el.date}</aside>
                                            <p>{el.con}</p>
                                        </section>
                                        <div style={{flex: 3}}>
                                            <img src={el.src} alt=""/>
                                        </div>
                                    </div>
                                </List.Item>
                            )
                        })
                    }
                </List>
                <InfiniteScroll loadMore={() => this.loadMore()} hasMore={hasData}/>
            </div>
        )
    }
}
export default SubCom
