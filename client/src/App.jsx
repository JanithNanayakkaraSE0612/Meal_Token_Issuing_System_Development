import React, {useState} from 'react'
import {Button, Flex, Layout} from "antd";
import {MenuUnfoldOutlined, MenuFoldOutlined} from "@ant-design/icons";
// import Sidebar from ".//client/src/components/Sidebar.jsx";
// import CustomHeader from ".//client/src/components/Header.jsx";
// import App from ".//client/src/App.jsx";
import Sidebar from "./components/Sidebar.jsx";
import CustomHeader from "./components/Header.jsx";


import './App.css'
import MainContent from "./components/MainContent.jsx";
import SideContent from "./components/SideContent.jsx";


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
            <Content className='content'>
                <Flex gap={"large"}>
                    <MainContent/>
                    <SideContent/>
                </Flex>
            </Content>
        </Layout>
    </Layout>

  );
};

export default App


