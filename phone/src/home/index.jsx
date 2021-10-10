import React from 'react'
import Article from "../article";
import {TabBar} from 'antd-mobile';
import st from './st.module.scss'
import History from "../history";
import My from '../my'
import Knowledgebase from "../knowledgebase";
import Video from "../video";
import {
    AppOutline,
    MessageOutline,
    UnorderedListOutline,
    UserOutline,
    BellOutline
} from 'antd-mobile-icons'
import '../config'

class Home extends React.Component {
    state = {
        component: null,
        tabIndex: global.data.tabIndex
    }

    selectCom(i) {
        switch (i) {
            case 1:
                this.setState({
                    component: <Article {...this.props}/>
                })
                break;
            case 2:
                this.setState({
                    component: <Knowledgebase {...this.props}/>
                })
                break;
            case 3:
                this.setState({
                    component: <Video {...this.props}/>
                })
                break;
            case 4:
                this.setState({
                    component: <History {...this.props}/>
                })
                break;
            case 5:
                this.setState({
                    component: <My {...this.props}/>
                })
                break;
            default:
        }
    }

    componentDidMount() {
        this.selectCom(this.state.tabIndex)
    }

    render() {
        const arr = [
            {
                id: 1,
                title: '文章',
                icon: <AppOutline/>,
                selectedTab: 'home',
                //component: <Article {...this.props}/>,
            },
            {
                id: 2,
                title: '音频',
                icon: <MessageOutline/>,
                selectedTab: 'music',
                //component: <Knowledgebase {...this.props}/>
            },
            {
                id: 3,
                title: '视频',
                icon: <UnorderedListOutline/>,
                selectedTab: 'quan',
                //component: <Study {...this.props}/>
            },
            {
                id: 4,
                title: 'vip',
                icon: <BellOutline/>,
                selectedTab: 'vip',
                //component: <History {...this.props}/>,
            },
            {
                id: 5,
                title: 'my',
                icon: <UserOutline/>,
                selectedTab: 'my',
                //component: <My {...this.props}/>,
            },
        ]
        const change = i => {
            global.data.tabIndex=i-0;
            this.selectCom(i - 0);
        }
        const {component, tabIndex} = this.state
        return (
            <div>
                {component}
                <TabBar className={st.st1} onChange={(i) => change(i)} defaultActiveKey={tabIndex+''}>
                    {
                        arr.map(el => {
                            return (
                                <TabBar.Item
                                    title={el.title}
                                    key={el.id}
                                    icon={el.icon}
                                />
                            )
                        })
                    }
                </TabBar>
            </div>
        );
    }

}

export default Home
