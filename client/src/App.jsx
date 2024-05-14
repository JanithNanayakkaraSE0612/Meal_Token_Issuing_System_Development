import React, { useEffect, useState } from "react";
import {
  BellFilled,
  ShoppingCartOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Drawer,
  Flex,
  Image,
  Layout,
  List,
  Menu,
  Typography,
  theme,
} from "antd";
import AppRoute from "./routes/AppRoute";
import logoImage from "./assets/token.webp";
import { getComments, getOrders } from "./API";
import { Link } from "react-router-dom";
import AppCart from "./components/AppCart";
const { Header, Content, Footer, Sider } = Layout;
const items = [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined];

const App = () => {
  const [comments, setComments] = useState([]);
  const [orders, setOrders] = useState([]);
  // const [cartItems, setCartItems] = useState([]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    getComments().then((res) => {
      setComments(res.comments);
    });
    getOrders().then((res) => {
      setOrders(res.products);
    });
  }, []);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
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
          style={{ minHeight: "100%" }}
          defaultSelectedKeys={["6"]}
          items={[
            { label: <Link to={"/"}>{"Dashboard"}</Link> },
            { label: <Link to={"/manageItems"}>{"ManageItems"}</Link> },
            { label: <Link to={"/CompileMeals"}>{"CompileMeals"}</Link> },
            { label: <Link to={"/mealList"}>{"MealList"}</Link> },
            {
              label: <Link to={"/viewItem"}>{"View Item"}</Link>,
            },
          ]}
        ></Menu>
      </Sider>
      <Layout>
        <header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Flex wrap="wrap" justifyContent="space-between" alignItems="center">
            <Flex style={{ marginLeft: "20px" }}>
              <Image width={40} src={logoImage} />
            </Flex>
            <Typography.Title level={4} style={{ margin: "0 auto" }}>
              Eato Token Issuing System
            </Typography.Title>
            <Flex
              wrap="wrap"
              gap={10}
              style={{ marginRight: "40px", marginTop: "10px" }}
            >
               <AppCart />
              {/* <Badge
                onClick={() => {
                  setCartDrawerOpen(true);
                }}
                count={cartItems.length}
                className="soppingCartIcon"
              >
                <ShoppingCartOutlined 
                style={{fontSize:24}}/>
              </Badge> */}
              {/* <Badge count={comments.length} dot>
                <MailOutlined
                  className={"mailIcon"}
                  style={{ fontSize: 24 }}
                  onClick={() => {
                    setCommentsOpen(true);
                  }}
                />
              </Badge> */}
              <Badge count={orders.length}>
                <BellFilled
                  className={"bellIcon"}
                  style={{ fontSize: 24 ,color:"darkorange" }}
                  onClick={() => {
                    setNotificationsOpen(true);
                  }}
                />
              </Badge>
             
            </Flex>
          </Flex>

          {/* <Drawer
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
            />
          </Drawer> */}
         
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
                    <Typography.Text strong>{item.title}</Typography.Text> has
                    been ordered!
                  </List.Item>
                );
              }}
            />
          </Drawer>

          
        </header>
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
