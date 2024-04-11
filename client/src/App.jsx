import React, {useState} from 'react'
import {Layout} from "antd";
import Dashobard from "./components/Dashobard.jsx";
import './App.css'


const {Sider,Header,Content} = Layout
const App = () => {
    const [collapsed, setCollapsed] = useState()
  return (
    <Layout>
        <Sider theme='light' trigger={null} collapsible collapsed={collapsed} className={'sider'}>
            <Dashobard/>
        </Sider>
        <Layout>
            <Header className={'header'}></Header>
            <Content className={'content'}></Content>
        </Layout>
    </Layout>

  )
}

export default App