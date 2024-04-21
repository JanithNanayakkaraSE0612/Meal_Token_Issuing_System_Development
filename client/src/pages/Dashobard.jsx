import React, {useState} from 'react'
import {Button, Flex, Layout} from "antd";
import {MenuUnfoldOutlined, MenuFoldOutlined} from "@ant-design/icons";
// import Sidebar from ".//client/src/components/Sidebar.jsx";
// import CustomHeader from ".//client/src/components/Header.jsx";
// import App from ".//client/src/App.jsx";
import Sidebar from '../components/SideBar.jsx';
import CustomHeader from "../components/Header.jsx";

import '../App.css'
import MainContent from "../components/MainContent.jsx";
import ContentLayout from '../components/ContentLayout.jsx';




const {Sider,Header,Content} = Layout


const Dashobard = () => {
  
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
                  {/* <MainContent/> */}
                  <ContentLayout/>
              </Flex>
          </Content>
      </Layout>
  </Layout>
  )
}

export default Dashobard



