import {useState} from 'react'
import '../config'
import st from './st.module.scss'
import {Button, Form, Input, NavBar, Space, Toast,Selector,DatePicker} from "antd-mobile";
import {MoreOutline, SearchOutline} from "antd-mobile-icons";
import dayjs from 'dayjs'
import axios from "axios";
// const {screenH,Url}=global.data;

const Register=(props)=>{
    const right = (
        <div style={{ fontSize: 18 }}>
            <Space>
                <SearchOutline onClick={()=>console.log('search')}/>
                <MoreOutline onClick={()=>console.log('more')}/>
            </Space>
        </div>
    )
    const back=()=>{
        props.history.goBack()
    }
    const onfinish=(values)=>{
        if (values.password!==values.repassword){
            Toast.show('两次密码不一致');
            return
        }
        const regObj= {username:/^\S{2,6}$/,phone:/^1\d{10}$/,
            password:/^\w{3,6}$/,nickName:/^\S+$/,repassword:/^\w{3,6}$/}
        let flag=true
        for (let attr in regObj){
            if (!regObj[attr].test(values[attr])){
                flag=false;
                break;
            }
        }
        delete values.repassword;
        if (flag){
            const params={params:values}
            console.log(params)
            axios.get('registed',params).then(obj=>{
                console.log(obj)
                if (obj){
                    global.data.userInfo=obj;
                    props.history.goBack()
                }else{
                    Toast.show('电话号码已经被注册')
                }
            })
        }else{
            Toast.show('输入字段内容不符合规则')
        }
    }
    const [pickerVisible, setPickerVisible] = useState(false)
    return(
        <div className={st.st1}>
            <NavBar right={right} onBack={()=>back()} className={st.st2}>
                登录注册
            </NavBar>
            <Form layout="horizontal"
                  onFinish={onfinish}
                  footer={
                      <div>
                          <Button block type="submit" color="primary">
                              注册
                          </Button>
                          <Button block type="reset" className={st.st3}>
                              重置
                          </Button>
                      </div>

                  }>
                <Form.Item name="username" label="姓名"
                           rules={[{required:true,message:'姓名不能为空'}]}>
                    <Input placeholder="请输入姓名" clearable/>
                </Form.Item>
                <Form.Item name="phone" label="电话号码"
                           rules={[{required:true,message:'电话不能为空'}]}>
                    <Input placeholder="请输入电话" clearable/>
                </Form.Item>
                <Form.Item name="password" label="密码"
                           rules={[{required:true,message:'密码不能为空'}]}>
                    <Input placeholder="请输入密码" clearable type="password"/>
                </Form.Item>
                <Form.Item name="repassword" label="确认密码"
                           rules={[{required:true,message:'密码不能为空'}]}>
                    <Input placeholder="请输入密码" clearable type="password"/>
                </Form.Item>
                <Form.Item name="nickName" label="昵称">
                    <Input placeholder="请输入昵称" clearable/>
                </Form.Item>
                <Form.Item name='birthday' label='生日' trigger='onConfirm'
                    onClick={() => {
                        setPickerVisible(true)
                    }}>
                    <DatePicker
                        visible={pickerVisible}
                        onClose={() => {
                            setPickerVisible(false)
                        }}
                        onClick={e => {
                            e.stopPropagation()
                        }}
                    >
                        {value =>
                            value ? dayjs(value).format('YYYY-MM-DD') : '请选择日期'
                        }
                    </DatePicker>
                </Form.Item>
                <Form.Item name='love' label='爱好'>
                    <Selector
                        columns={3}
                        multiple
                        options={[
                            { label: '肖战', value: 'xz' },
                            { label: '龚俊', value: 'gj' },
                            { label: '李易峰', value: 'lyf' },
                        ]}
                    />
                </Form.Item>

            </Form>
        </div>
    )
}
export default Register


