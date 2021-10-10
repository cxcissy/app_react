import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import 'antd-mobile/dist/antd-mobile.css';
import axios from "axios";

//------axios的全局配置--------
axios.defaults.baseURL="http://localhost:1337/users"
axios.defaults.timeout=5000
axios.interceptors.response.use(
    response=>{
        return Promise.resolve(response.data)
    },
    error => {
        return Promise.reject(error.response)
    }
)

ReactDOM.render(
  <div>
    <App />
  </div>,
  document.getElementById('root')
);

reportWebVitals();
