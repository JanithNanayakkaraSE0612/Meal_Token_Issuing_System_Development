import React , { useState, useEffect } from 'react'
import '../App.css'
import { Space, Table, Tag } from 'antd';
import {  Layout } from 'antd'; 
const {  Content } = Layout;
import { Flex } from 'antd';

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
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https:// /delete/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleCreateItem = async (values) => {
    try {
      await axios.post('https:// /posts', values);
      fetchData();
      setModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  const handleUpdateItem = async (id) => {
    try {
      const response = await axios.put(`${updateUrl}/${id}`, updateData); // Include ID if needed
      console.log("Item updated successfully:", response.data);
      // Optionally, refetch data to update the table
      fetchData();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };
  
  const handleAddItem = () => {
    setModalVisible(true);
  };
  return (
    <Flex wrap='wrap'  className='FlexStyle'>
    <Content className='ItemList' style={contentStyle}>
        <Flex className='buttonList' gap="small" wrap="wrap">
           <button className="button" onClick={handleAddItem}>
            Add Item
       </button>
   </Flex>
         <Table columns={columns} dataSource={data} />
    </Content>
    </Flex>
  )
}
export default ItemList
