import React from 'react'
import { Table } from 'antd';
import { Col, Row } from 'antd';

const columns = [
  {
    title: 'ID',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: 'Name',
    width: 300,
    dataIndex: 'age',
    key: 'age',
    fixed: 'left',
    sorter: true,
  },
  {
    title: 'Price',
    width:200,
    dataIndex: 'address',
    key: '1',
  },
  {
    title: 'Photo',
    dataIndex: 'address',
    key: '2',
  },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 200,
    render: () => <a>action</a>,
  },
];
const data = [
  {
    key: '1',
    name: '001',
    age: 'Vegetable Fried Rice',
    address: '700',
  },
  {
    key: '2',
    name: '002',
    age: 'Chicken Fried Rice',
    address: '950',
  },
  {
    key: '3',
    name: '003',
    age: 'Egg Fried Rice',
    address: '800',
  },
  {
    key: '4',
    name: '004',
    age: 'Mix Fried Rice',
    address: '1400',
  },
  {
    key: '5',
    name: '005',
    age: 'Chicken Kottu',
    address: '950',
  },
  {
    key: '6',
    name: '006',
    age: 'Chicken Noodles',
    address: '950',
  }
];

const OrderDetails = () => {
  return (
    <Row>
    <Col span={18} push={6}>
    <Table
    columns={columns}
    dataSource={data}
    scroll={{
      x: 1300,
    }}
  />
    </Col>
    <Col span={6} pull={18}>
  
    </Col>
  </Row>

  )
}

export default OrderDetails
