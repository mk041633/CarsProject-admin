import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import ruRU from "antd/es/locale/ru_RU";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ConfigProvider locale={ruRU}>
    <BrowserRouter>
    <App/>
    </BrowserRouter>
  </ConfigProvider>
);

