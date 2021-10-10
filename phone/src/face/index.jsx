import { Button } from 'antd-mobile';
import '../config'
import st from './st.module.scss'
const {screenH,Url}=global.data;

const Face=(props)=>{
    const enter=()=>{
        props.history.replace('/target')
    }
    return(
        <div className={st.st1} style={{height:`${screenH}px`,backgroundImage:`url('${Url}images/bg.jpg')`}} >
            <Button className={st.st2} onClick={enter} type="warning" color="danger"
                    size={"small"}>进入</Button>
        </div>
    )
}
export default Face
