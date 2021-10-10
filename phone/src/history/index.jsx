import {Tabs} from 'antd-mobile'
import VideoHistory from './videoHistory'
import AudioHistory from './audioHistory'
 const History=(props)=>{
    return(
        <div className="history">
            <Tabs>
                <Tabs.TabPane title='音频记录' key='audio'>
                    <AudioHistory {...props}/>
                </Tabs.TabPane>
                <Tabs.TabPane title='视频记录' key='video'>
                    <VideoHistory {...props}/>
                </Tabs.TabPane>
            </Tabs>
        </div>
    )
}
export default History
