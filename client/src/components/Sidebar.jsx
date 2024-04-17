import React from 'react'
import {Flex, Menu} from "antd";
import {FaLeaf} from "react-icons/fa6";
import {UserOutlined, ProfileOutlined, LogoutOutlined, OrderedListOutlined, CarryOutOutlined, SettingOutlined,}from '@ant-design/icons';


const Sidebar = () => {
  return (
    <>
      <Flex align="center" justify="center" >
          <div className="logo">
              <a>Dashboard</a>
              <FaLeaf/>
          </div>
      </Flex>

        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          className="menu-bar"
          items={[
              {
                  key: '1',
                  icon: <UserOutlined />,
                  label: 'Home',
              },
              {
                  key: '2',
                  icon: <CarryOutOutlined />,
                  label: 'Item',
              },
              {
                  key: '3',
                  icon: <OrderedListOutlined />,
                  label: 'Meal',
              },
              {
                  key: '4',
                  icon: <ProfileOutlined />,
                  label: 'Order',
              },
              {
                  key: '5',
                  icon: <SettingOutlined />,
                  label: 'Setting',
              },
              {
                  key: '6',
                  icon: <LogoutOutlined />,
                  label: 'Logout',
              },
            ]}
      />
    </>
  );
};

export default Sidebar;
