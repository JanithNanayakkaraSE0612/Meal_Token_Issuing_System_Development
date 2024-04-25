import React from "react";
import { Layout } from "antd";
import { HomeOutlined, TagOutlined, BiFoodMenu, OrderedListOutlined } from "@ant-design/icons";
import AppHeader from "./components/AppHeader";

const { Header, Content, Footer, Sider } = Layout;

const items = [
  { key: "1", icon: <HomeOutlined />, label: "Dashboard" },
  { key: "2", icon: <TagOutlined />, label: "Item" },
  { key: "3", icon: <BiFoodMenu />, label: "Dashboard" },
  { key: "4", icon: <OrderedListOutlined />, label: "n" },
];

const App = () => {
  return (
    <Layout>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="demo-logo-vertical" />
        {/* Menu items go here */}
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }}>
          <AppHeader /> {/* Replace Header with AppHeader */}
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div style={{ padding: 24, minHeight: 654 }}>
            {/* Content components go here */}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
