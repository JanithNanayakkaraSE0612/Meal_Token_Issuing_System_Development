import React, { useState } from 'react';
import { Button, Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import Sidebar from '../components/SideBar.jsx';

import ContentLayout from '../components/ContentLayout.jsx';
import '../App.css';

const { Sider, Header, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="sider"
      >
        <Sidebar />
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          className="trigger-btn"
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="header">
          <CustomHeader />
        </Header>
        <Content className="content">
          <ContentLayout />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;

