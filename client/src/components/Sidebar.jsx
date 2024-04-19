import React from 'react'
import {Flex, Menu} from "antd";
import {FaLeaf} from "react-icons/fa6";
import {
    // UserOutlined,
    // ProfileOutlined,
    LogoutOutlined,
    DollarOutlined,
    // OrderedListOutlined,
    CarryOutOutlined,
    SettingOutlined,
    HomeOutlined,
} from '@ant-design/icons';
import {MdOutlineEggAlt} from "react-icons/md";


const Sidebar = () => {
  return (
    <>
      <Flex align="center" justify="center" >
          <div className="logo">
              {/*<img src={'client/src/assets/tokenn.png'} alt={'logo'} className={'absolute w-[1310px] top-[130px] h-[595px] px-2 bglogo bg-opacity-0 rounded-2xl rounded-2xl'}/>*/}
              <a className={"mainTag-dashbord"}>Meal Token Issueing</a>

          </div>
      </Flex>

        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          className="menu-bar"
          items={[
              {
                  key: '1',
                  icon: <HomeOutlined />,
                  label: 'Home',
              },
              {
                  key: '2',
                  icon: <CarryOutOutlined />,
                  label: 'Item',
              },
              {
                  key: '3',
                  icon: <MdOutlineEggAlt />,
                  label: 'Meal',
              },
              {
                  key: '4',
                  icon: <DollarOutlined />,
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
