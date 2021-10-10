//import st from './st.module.scss'
import {Tabs, Swiper} from 'antd-mobile';
import SubCom from "./subComponent";
import React from "react";
import '../config'
const navArr = [
    {id: '0', title: '推荐', dataType: 'tj'},
    {id: '1', title: '热门', dataType: 'zb'},
    {id: '2', title: '关注', dataType: 'gz'},
]
class Knowledgebase extends React.Component{
    state={
        menuIndex:global.data.menuIndex,
    }
    changeIndex(i){
        this.setState({
            menuIndex:i+''
        })
    }
    getIndex(i){
        const swiper=this.refs.swiper;
        swiper?.swipeTo(i-0)
        this.setState({
            menuIndex:i
        });
        global.data.menuIndex=i;
    }
    render() {
        const {menuIndex}=this.state;
        return (
            <div className="Knowledgebase">
                <div>
                    <Tabs activeKey={menuIndex} onChange={(i)=>this.getIndex(i)}>
                        {
                            navArr.map(el => {
                                return <Tabs.TabPane title={el.title} key={el.id}/>
                            })
                        }
                    </Tabs>
                    <Swiper onIndexChange={(i) => this.changeIndex(i)}
                            ref="swiper" defaultIndex={menuIndex}
                            indicator={() => null}>
                        {
                            navArr.map(el => {
                                return <Swiper.Item key={el.id}>
                                    <SubCom dataType={el.dataType} {...this.props}/>
                                </Swiper.Item>
                            })
                        }
                    </Swiper>
                </div>
            </div>
        )
    }
}
export default Knowledgebase
