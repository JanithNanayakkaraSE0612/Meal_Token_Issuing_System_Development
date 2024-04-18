import React from 'react'
import '../App.css'
import { Card, Col, Row } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar} from 'antd';
import { Flex, Layout } from 'antd';
const { Sider, Content } = Layout;
const { Meta } = Card;
const contentStyle = {
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: 'white',
  };
  const siderStyle = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: 'white',
  };

const MealList = () => {
  return (

    <div className='MealList'>
      <Content style={contentStyle}>
      <Row gutter={16}>
    <Col span={8}>
    <Card
    style={{
      width: 300,
    }}
    cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    }
    actions={[
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta
      avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
      title="Card title"
      description="This is the description"
    />
  </Card>
    </Col>
    <Col span={8}>
    <Card
    style={{
      width: 300,
    }}
    cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    }
    actions={[
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta
      avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
      title="Card title"
      description="This is the description"
    />
  </Card>
    </Col>
    <Col span={8}>
    <Card
    style={{
      width: 300,
    }}
    cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    }
    actions={[
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta
      avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
      title="Card title"
      description="This is the description"
    />
  </Card>
    </Col>
  </Row>
      </Content>
      <Sider width="25%" style={siderStyle}>
        Sider
      </Sider>
    
   

  
      </div>
  );
}

export default MealList
