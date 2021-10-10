import '../config'
import st from './st.module.scss'
//const {screenH,Url}=global.data;
import {Form, Button, Input, Toast, NavBar, Space} from 'antd-mobile'
import axios from "axios";
import {MoreOutline, SearchOutline} from "antd-mobile-icons";

const Login=(props)=>{
    const onfinish=(values)=>{
        const regObj= {phone:/^1\d{10}$/,password:/^\w{3,6}$/}
        let flag=true
        for (let attr in values){
            flag=regObj[attr].test(values[attr]);
            if (!flag){
                break
            }
        }
        if (flag){
            delete values.repassword;
            axios.get('login',{params:values}).then(obj=>{
                if (obj){
                    global.data.userInfo=[obj.id, obj.nickName];
                    props.history.goBack()
                }else{
                    Toast.show('账号或者密码不正确')
                }
            })
        }else {
            Toast.show('账号或者密码不正确')
        }
    }
    const right = (
        <div style={{ fontSize: 18 }}>
            <Space>
                <SearchOutline onClick={()=>console.log('search')}/>
                <MoreOutline onClick={()=>console.log('more')}/>
            </Space>
        </div>
    )
    const back=()=>{
        global.data.tabIndex=1;
        props.history.goBack()
    }
    return(
        <div className={st.st1}>
            <div>
                <NavBar right={right} onBack={()=>back()} className={st.st2}>
                    登录
                </NavBar>
                <Form layout="horizontal"
                      onFinish={onfinish}
                      footer={<Button block type="submit" color="primary">
                          登录
                      </Button>}>
                    <Form.Item name="phone" label="电话号码"
                               rules={[{required:true,message:'电话不能为空'}]}>
                        <Input placeholder="请输入电话" clearable/>
                    </Form.Item>
                    <Form.Item name="password" label="密码"
                               rules={[{required:true,message:'密码不能为空'}]}>
                        <Input placeholder="请输入密码" clearable type="password"/>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
export default Login
