import React from 'react'
import {Link} from "react-router-dom";
import { InfiniteScroll,PullToRefresh,List,Toast } from 'antd-mobile';
import '../config'
import st from './st.module.scss'
import axios from "axios";

const {screenH,Url} = global.data;
const headArr = [
    '朝辞白帝彩云间',
    '千里江陵一日还',
    '两岸猿声啼不住',
    '轻舟已过万重山'
]
class Article extends React.Component {
    state = {
        timer: null,
        timer2: null,
        isLoading:false,
        refreshing:false,
        pageSize:5,
        arr:[],
        hasData:true
    }

    componentDidMount() {
        //----------字幕-------
        const ul = this.refs.myul;
        const scroll = this.refs.myscroll;
        const ulH = ul.offsetHeight;
        ul.innerHTML += ul.innerHTML;
        scroll.scrollTop = 0;
        const timer = setInterval((_) => {
            if (scroll.scrollTop >= ulH) {
                scroll.scrollTop = 0;
            } else {
                this.move()
            }
        }, 3000)
        this.setState({
            timer
        })
        //-------------调用函数实现数据加载----------------
        this.loadData();
    }
    async loadData(){
        this.setState({
            isLoadiong:true
        })
        const {pageSize,arr}=this.state;
        const start=arr.length;
        const params={params:{start,pageSize}}
        let temp=await axios.get('getArt',params)
        if(temp.length===0){
            Toast.show('已经没有数据了！')
            this.setState({
                hasData:false
            })
        }
        temp=temp.map(el=>{
            el.date=new Date(el.updatedAt).toLocaleDateString();
            el.con=el.content.match(/<p>[^<]+/)[0].substr(3);
            el.src=el.content.match(/upload[^"]+/)[0]
            el.src=Url+el.src
            return el
        })
        this.setState({
            arr:[...arr,...temp],
            isLoading:false,
            refreshing:false
        })
    }
    componentWillUnmount() {
        clearInterval(this.state.timer)
        clearInterval(this.state.timer2)
    }

    move() {
        let i = 0;
        const scroll = this.refs.myscroll;
        const timer2 = setInterval((_) => {
            if (i < 40) {
                scroll.scrollTop++;
                i++;
            } else {
                clearInterval(timer2);
            }
        }, 30)
        this.setState({
            timer2
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
        this.props.history.push('/detail/'+id)
    }
    loadMore(){
        const {isLoading,hasData}=this.state;
        if (isLoading||!hasData){
            return
        }
        this.loadData();
    }
    render() {
        const {arr}=this.state;
        return (
            <div className="Article">
                <div className={st.st1} style={{height: `${screenH}px`}}>
                    <Link className={st.st2} ref="myscroll" to="/search">
                        <ul ref="myul">
                            {
                                headArr.map((el, i) => {
                                    return (
                                        <li key={i}>{el}</li>
                                    )
                                })
                            }
                        </ul>
                    </Link>
                    <PullToRefresh
                        onRefresh={()=> this.onRefresh()}>
                        <List className={st.st3}>
                            {
                                arr.map((el) => (
                                    <List.Item key={el.id} className={st.st4} onClick={()=>this.toDetail(el.id)}>
                                        <div className={st.st5}>
                                            <section style={{flex:7}}>
                                                <h3>{el.title}</h3>
                                                <aside>{el.date}</aside>
                                                <p>{el.con}</p>
                                            </section>
                                            <div style={{flex:3}}>
                                                <img src={el.src} alt=""/>
                                            </div>
                                        </div>
                                    </List.Item>
                                ))
                            }
                        </List>
                    </PullToRefresh>
                    <InfiniteScroll loadMore={()=>this.loadMore()} hasMore={this.state.hasData} />
                </div>
            </div>

        )
    }
}

export default Article
