import React, {useState} from 'react'
import {Button, Layout} from "antd";
import {MenuUnfoldOutlined, MenuFoldOutlined} from "@ant-design/icons";
import Sidebar from "./components/Sidebar.jsx";
import { blue } from '@ant-design/colors';
import CustomHeader from "./components/Header.jsx";

import './App.css'


const {Sider,Header,Content} = Layout
const App = () => {
    const [collapsed, setCollapsed] = useState(false)
  return (
    <Layout>
        <Sider
               theme='light'
               trigger={null}
               collapsible
               collapsed={collapsed}
               className="sider">

            <Sidebar/>

            <Button
                type='text'
                icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined /> }
                onClick={() => setCollapsed(!collapsed)}
                className="triger-btn"/>

        </Sider>
        <Layout>
            <Header className='header'>
                <CustomHeader />
            </Header>

            <Content className='content'></Content>
        </Layout>
    </Layout>

  );
};

export default App