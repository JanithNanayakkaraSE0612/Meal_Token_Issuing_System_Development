import React from 'react'
import {Layout} from 'antd'


const {Sider , Header ,Content} = Layout;
const Dashobard = () => {
  return (
    <Layout>
        <Sider theme='light' trigger={null} collapsible collapsed={collapsed}className='slider'></Sider>
            <Layout>
                <Header></Header>
                <Content></Content>
            </Layout>
    </Layout>
  )
}

export default Dashobard
