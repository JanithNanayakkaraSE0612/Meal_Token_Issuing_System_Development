
import React from 'react';
import { Flex, Menu } from 'antd';
import { CarryOutOutlined, HomeOutlined, DollarOutlined } from '@ant-design/icons';
import { MdOutlineEggAlt } from 'react-icons/md';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logoImage from '../assets/token.webp';
import ItemList from './ItemList';
import MealList from './MealList';
import '../App.css'

const Sidebar = () => {
    const location = useLocation();
    const [selectedKeys, setSelectedKeys] = useState("/");
  
    useEffect(() => {
      const pathName = location.pathname;
      setSelectedKeys(pathName);
    }, [location.pathname]);
  
    const navigate = useNavigate();
    return ( 
        <div className='SideMenuVertical'>
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
                ]}
            />
        </div>
    );
};

export default Sidebar;