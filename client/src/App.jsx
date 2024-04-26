import React from 'react';
import {
    ForkOutlined,
    HomeOutlined, OrderedListOutlined,
    TagOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import ManageItems from './components/ManageItems';

import {BiFoodMenu} from "react-icons/bi";

const { Header, Content, Footer, Sider } = Layout;
const items = [HomeOutlined, TagOutlined,BiFoodMenu, OrderedListOutlined].map(
  (icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: nav,
  }),
    (icon, index) => ({
        key: String(index + 2),
        icon: React.createElement(icon),
        label: n,
    }),
);



const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="light" mode="inline" defaultSelectedKeys={['4']} items={items} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >

          </Header>
        <Content
          style={{
            margin: '24px 16px 0',
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 654,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
              {/* <AppHeader/> */}
          <ManageItems/>
          

          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
           ©{new Date().getFullYear()} Created by BizSoft Software Solutions
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;