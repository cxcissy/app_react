import React from 'react'
import {Button, Swiper} from 'antd-mobile';
import '../config'
import st from './st.module.scss'
//import {useEffect, useState} from 'react'

const {screenH, Url} = global.data;
const arr = [
    {id: 1, title: '我们喜欢', content: `加油`},
    {id: 2, title: '我们喜欢你', content: `加油`},
    {id: 3, title: '我们喜欢你们', content: `加油`},
]
const Target = (props) => {
    const enter = () => {
        props.history.replace('/home')
    };
    const enter1 = (i) => {
        if (i === 2) {
            props.history.replace('/home')
        }
    };

    return (
        <div className={st.st1} style={{height: `${screenH}px`, backgroundImage: `url('${Url}images/gj.jpg')`}}>
            <Swiper onIndexChange={(i)=>enter1(i)}>
                {
                    arr.map(el => {
                        return <Swiper.Item key={el.id}>
                            <div style={{display: 'inline-block', width: '100%', height: '380px'}}>
                                <h2>{el.title}</h2>
                                <p>{el.content}</p>
                            </div>
                        </Swiper.Item>
                    })
                }
            </Swiper>
            <Button onClick={enter} type="warning" size={"small"} color="danger"
                    style={{position: 'fixed', bottom: '50px', left: 'calc(50% - 40px)'}}
            >点击进入</Button>
        </div>
    )
}
export default Target
