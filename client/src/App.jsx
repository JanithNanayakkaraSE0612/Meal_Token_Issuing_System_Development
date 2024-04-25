import React from "react";
import {
  ForkOutlined,
  HomeOutlined,
  OrderedListOutlined,
  TagOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import ManageItems from "./components/ManageItems";
import CompileMeals from "./components/CompileMeals";
import BrowseMeals from "./components/BrowseMeals";
import ViewItem from "./components/ViewItem";
import ItemDetailsPage from "./components/ItemDetailsPage";
import RedeemPage from "./components/RedeemPage";
import { useLocation, useNavigate } from "react-router-dom";
import { MdNoMealsOuline } from "react-icons/md";
import AppHeader from "./components/AppHeader.jsx";
import { BiFoodMenu } from "react-icons/bi";
import OrderDetails from "./components/OrderDetails.jsx";
import Dashboard from "./pages/Dashobard.jsx";
const { Header, Content, Footer, Sider } = Layout;
const items = [HomeOutlined, TagOutlined, BiFoodMenu, OrderedListOutlined].map(
  (icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `Dashboard`,
  }),
  (icon, index) => ({
    key: String(index + 2),
    icon: React.createElement(icon),
    label: `n`,
  })
);

// function SideMenu() {
//     const location = useLocation();
//     const [selectedKeys, setSelectedKeys] = useState("/");
//
//     useEffect(() => {
//         const pathName = location.pathname;
//         setSelectedKeys(pathName);
//     }, [location.pathname]);
//
//     const navigate = useNavigate();
//     return (
//         <div className="SideMenu">
//             <Menu
//                 className="SideMenuVertical"
//                 mode="vertical"
//                 onClick={(item) => {
//                     //item.key
//                     navigate(item.key);
//                 }}
//                 selectedKeys={[selectedKeys]}
//                 items={[
//                     {
//                         label: "Dashbaord",
//                         icon: <AppstoreOutlined />,
//                         key: "/",
//                     },
//                     {
//                         label: "Inventory",
//                         key: "/inventory",
//                         icon: <ShopOutlined />,
//                     },
//                     {
//                         label: "Orders",
//                         key: "/orders",
//                         icon: <ShoppingCartOutlined />,
//                     },
//                     {
//                         label: "Customers",
//                         key: "/customers",
//                         icon: <UserOutlined />,
//                     },
//                 ]}
//             ></Menu>
//         </div>
//     );
// }

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
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
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
            <AppHeader />
            <ManageItems/>
            {/*<CompileMeals/>*/}
            {/*<BrowseMeals/> */}
            {/*<ItemDetailsPage/>*/}
            {/*<RedeemPage/>*/}
            {/*   <Dashboard/>*/}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;
