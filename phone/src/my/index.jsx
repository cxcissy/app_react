import {useEffect,useState} from 'react'
import {UserOutline} from 'antd-mobile-icons'
import '../config'
import st from './st.module.scss'
//const {screenH,Url}=global.data;
import { Form,Button,Input,Toast } from 'antd-mobile'
import axios from "axios";

const My=(props)=>{
    let [userInfo,setUserInfo]=useState(global.data.userInfo)
    useEffect(()=>{
        setUserInfo(global.data.userInfo);
    },[])
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
                    obj=[obj.id,obj.nickName]
                    global.data.userInfo=obj;
                    setUserInfo(obj);
                }else{
                    Toast.show('账号或者密码不正确')
                }
            })
        }else {
            Toast.show('账号或者密码不正确')
        }
    }
    const register=()=>{
        props.history.push('/register')
    }
    const logout=()=>{
        global.data.userInfo=[];
        setUserInfo([]);
    }
    const LoginUI=(
        <div>
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
            <div className={st.st2}>
                <Button color="primary" fill="none" onClick={register}>新用户注册</Button>
            </div>
        </div>
    );

    const Logined=(
        <div className={st.st3}>
            <UserOutline fontSize={100}/>
            <aside>欢迎你：
                <span>
                    {userInfo[1]}
                </span>
            </aside>
            <Button color="waring" className={st.st4} onClick={()=>logout()}>注销</Button>
        </div>
    )
    return(
        <div className={st.st1}>
            {userInfo.length===0?LoginUI:Logined}
        </div>
    )
}
export default My
