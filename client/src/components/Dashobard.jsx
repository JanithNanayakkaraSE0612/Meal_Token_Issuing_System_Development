import React from 'react'
import {Layout} from 'antd'


const {Sider , Header ,Content} = Layout;
const Dashobard = () => {
  return (
    <Layout>
        <Sider></Sider>
            <Layout>
                <Header></Header>
                <Content></Content>
            </Layout>
    </Layout>
  )
}

export default Dashobard
