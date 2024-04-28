import React, { useEffect, useState } from "react";
import {
  BellFilled,
  MailOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Badge, Drawer, Flex, Image, Layout, List, Menu, Typography, theme } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import AppRoute from "./routes/AppRoute";
import logoImage from "./assets/token.webp";
import { getComments, getOrders } from "./API";
const { Header, Content, Footer, Sider } = Layout;
const items = [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined];
// ].map((icon, index) => ({
//   key: String(index + 1),
//   icon: React.createElement(icon),
//   label: `Dashboard ${index + 1}`,
// }));
const App = () => {
  const [comments, setComments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    getComments().then((res) => {
      setComments(res.comments);
    });
    getOrders().then((res) => {
      setOrders(res.products);
    });
  }, []);
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
    <Layout style={{ minHeight: "" }}>
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
        <Menu
          theme="light"
          mode="inline"
          style={{ minHeight: "100vh" }}
          defaultSelectedKeys={["4"]}
          items={[
            { label: "Dashobard" },
            { label: "ManageItems" },
            { label: "CompileMeals" },
            { label: "Token" },
            { label: "View Item Details" },
          ]}
        >
          {/* {items.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              {item.label}
            </Menu.Item>
          ))} */}
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Flex wrap="wrap" >
            <Image style={{marginLeft:"40px"}} width={40} src={logoImage}></Image>
            <Typography.Title level={4}style={{marginLeft:"420px"}}>Eato Token</Typography.Title>
            <Badge count={comments.length} dot>
        <MailOutlined className={'mailIcon'}
          style={{ fontSize: 24 }}
          onClick={() => {
            setCommentsOpen(true);
          }}
        />
      </Badge>
      <Badge count={orders.length}>
        <BellFilled className={'bellIcon'}
          style={{ fontSize: 24 }}
          onClick={() => {
            setNotificationsOpen(true);
          }}
        />
      </Badge>
      <Drawer
      title="Comments"
      open={commentsOpen}
      onClose={() => {
        setCommentsOpen(false);
      }}
      maskClosable
    >
      <List
        dataSource={comments}
        renderItem={(item) => {
          return <List.Item>{item.body}</List.Item>;
        }}
      ></List>
    </Drawer>
    <Drawer
      title="Notifications"
      open={notificationsOpen}
      onClose={() => {
        setNotificationsOpen(false);
      }}
      maskClosable
    >
      <List
        dataSource={orders}
        renderItem={(item) => {
          return (
            <List.Item>
              <Typography.Text strong>{item.title}</Typography.Text> has been
              ordered!
            </List.Item>
          );
        }}
      ></List>
    </Drawer>
          </Flex>
        </Header>
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
