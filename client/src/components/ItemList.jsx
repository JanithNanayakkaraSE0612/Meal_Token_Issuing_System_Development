import React from 'react'
import '../App.css'
import { Space, Table, Tag } from 'antd';
import {  Layout } from 'antd'; // Assuming Flex is a component from 'antd' library
const { Header, Footer, Sider, Content } = Layout;
import { Button, Flex } from 'antd';

const columns = [
  {
    title: 'ID',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Name',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Price',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Photo',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: '',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: '1',
    name: '001',
    age: 'Vegetable Fried Rice',
    address: '700',
    tags: ['vegitale.jpg'],
  },
  {
    key: '2',
    name: '002',
    age: 'Chicken Fried Rice',
    address: '950',
    tags: ['Chicken.jpg'],
  },
  {
    key: '3',
    name: '003',
    age: 'Egg Fried Rice',
    address: '800',
    tags: ['Egg Rice.jpg'],
  },
  {
    key: '4',
    name: '004',
    age: 'Mix Fried Rice',
    address: '1400',
    tags: ['MixRice.jpg'],
  },
  {
    key: '5',
    name: '005',
    age: 'Chicken Kottu',
    address: '950',
    tags: ['Chicken.jpg'],
  },
  {
    key: '6',
    name: '006',
    age: 'Chicken Noodles',
    address: '950',
    tags: ['Noodles.jpg'],
  }
];
const contentStyle = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '1600px',
  color: '#fff',
  backgroundColor: 'white',
};

const ItemList = () => {
  return (
    <Content className='ItemList' style={contentStyle}>
        <Flex className='buttonList' gap="small" wrap="wrap">
           <button className="button">
            Add Item
       </button>
   </Flex>
         <Table columns={columns} dataSource={data} />
    </Content>
  )
}
export default ItemList
