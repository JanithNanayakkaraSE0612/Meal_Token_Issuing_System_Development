import React, { useEffect, useState } from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { useLocation ,useNavigate } from "react-router-dom";
import AppRoute from "./routes/AppRoute";
const { Header, Content, Footer, Sider } = Layout;
const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  UserOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `Dashboard ${index + 1}`,
}));
const App = () => {
  // const location = useLocation();
  // const [selectedKeys , setSelectedKeys] = useState("/");

  // useEffect(() =>{
  //   const pathName = location.pathname;
  //   setSelectedKeys(pathName);
  // },[location.pathname]);

  // const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{minHeight:""}}>
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
        <div className="demo-logo-vertical  " />
        <Menu theme="light" mode="inline" style={{ minHeight: "100vh" }} defaultSelectedKeys={["4"]}>
          {items.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        ></Header>
        <Content
          style={{
            margin: "24px 16px 0",
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
            <AppRoute />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          ©{new Date().getFullYear()} Created by BizSoft Software Solutions
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;
