import React from 'react';
import { Layout, Menu } from 'antd';
import ManageItems from '../components/ManageItems';

const { Header, Content, Footer } = Layout;

const AdminDashboard = () => {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">Manage Items</Menu.Item>
          <Menu.Item key="2">Compile Meals</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content"><ManageItems/></div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Admin Dashboard</Footer>
    </Layout>
  );
};

export default AdminDashboard;
