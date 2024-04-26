import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Input, Space, message } from 'antd';
import axios from 'axios';
import '../App.css'


const CompileMeals = () => {
  const [meals, setMeals] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const response = await axios.get('http://localhost:3001/meals');
      setMeals(response.data);
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  };

  const handleCreate = async (values) => {
    try {
      await axios.post('http://localhost:3001/meals', values);
      message.success('Meal created successfully!');
      setVisible(false);
      form.resetFields();
      fetchMeals();
    } catch (error) {
      console.error('Error creating meal:', error);
      message.error('Failed to create meal.');
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Token', dataIndex: 'token', key: 'token' },
    { title: 'Total Price', dataIndex: 'totalPrice', key: 'totalPrice' },
  ];

  return (
    <div>
      <Button className='button' type="primary" onClick={() => setVisible(true)}>
        Create Meal
      </Button>
      <Table dataSource={meals} columns={columns} rowKey="id" />

      <Modal
        title="Create Meal"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            Create
          </Button>,
        ]}
      >
        <Form form={form} onFinish={handleCreate}>
          <Form.Item
            label="Token"
            name="token"
            rules={[{ required: true, message: 'Please enter the token!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Total Price"
            name="totalPrice"
            rules={[{ required: true, message: 'Please enter the total price!' }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CompileMeals;
