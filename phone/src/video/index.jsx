import {Link} from 'react-router-dom'
import '../config'
import st from './st.module.scss'
//const {screenH,Url}=global.data;

const Video=(props)=>{  //Video
    return(
        <div className={st.st1}>
            <Link to="/videoPlay/1/0">播放视频</Link>
        </div>
    )
}
export default Video
