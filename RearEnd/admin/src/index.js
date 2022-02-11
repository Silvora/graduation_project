import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';
import {ConfigProvider}  from 'antd';
import locale from 'antd/es/locale/zh_CN';
import 'moment/locale/zh-cn';

import {BrowserRouter} from 'react-router-dom'
ReactDOM.render(
  
    <BrowserRouter>
    <ConfigProvider locale={locale}>
    <App />

    </ConfigProvider>
    </BrowserRouter>
  ,
  document.getElementById('root')

  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
