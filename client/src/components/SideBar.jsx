
import React from 'react';
import { Flex, Menu } from 'antd';
import { CarryOutOutlined, HomeOutlined, DollarOutlined } from '@ant-design/icons';
import { MdOutlineEggAlt } from 'react-icons/md';
import logoImage from '../assets/token.webp';
import ItemList from './ItemList';
import MealList from './MealList';

const Sidebar = () => {
    return ( 
        <div className='sideBar'>
            <Flex align="center" justify="center">
                <div className="logo">
                    <div style={{ marginTop: '20%'}}>
                        <a className="mainTag-dashbord" style={{marginLeft: '10px', marginBottom: '20%' , marginTop: '10%'}}>Meal Token Issuing</a>

                    </div>
                <img src={logoImage} alt="logo" className="absolute" style={{ width: '90px' , alignContent: 'center' , marginRight: '10%', marginLeft: '20%' , marginTop: '20%' ,marginBottom: '10%'}} />
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
                ]}
            />
        </div>
    );
};

export default Sidebar;