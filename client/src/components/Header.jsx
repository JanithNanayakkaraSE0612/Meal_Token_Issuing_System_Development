import React from "react";
import {Avatar, Flex, Typography} from "antd";
import Search from "antd/es/input/Search.js";
import {BellOutlined, BackwardOutlined} from "@ant-design/icons";
import '../App.css'


const CustomHeader = () => {
        return(
            <Flex align='center' justify={"space-between"} gap='2px'>
                <Avatar className="backIcon" icon={<BackwardOutlined/>}/>


            <Flex align='center' justify='space-between'>
                <Typography.Title level={4} type='secondary'>
                    {/*Welcome back*/}
                </Typography.Title>



            {/* <Flex align="center" gap='3rem'>
                <Search placeholder="Search Dashboard" allowClear/>



                <Flex align='center' gap='10px'>
                    <Avatar icon={<BellOutlined/>}/>
                </Flex>
            </Flex> */}
        </Flex>
     </Flex>
    );
};

export default CustomHeader;