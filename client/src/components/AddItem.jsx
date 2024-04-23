import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Upload, message } from 'antd';
import axios from 'axios';
import '../App.css';

const AddItem = () => {
  const navigate = useNavigate();
  const [componentDisabled, setComponentDisabled] = useState(false);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleFormSubmit = async (values) => {
    try {
      setComponentDisabled(true); // Disable the form while submitting
      const response = await axios.post('https://example.com/api/addItem', {
        id: values.id,
        name: values.name,
        price: values.price,
        upload: values.upload, // Assuming you want to include the file upload data
      });
      console.log('Response:', response.data);
      message.success('Item added successfully!');
      navigate('/contentLayout'); // Navigate to the desired route after successful submission
    } catch (error) {
      console.error('Error adding item:', error);
      message.error('Failed to add item. Please try again.');
      console.log('Error details:', error.response); 
    } finally {
      setComponentDisabled(false); // Re-enable the form after submission
    }
  };

  return (
    <Form
      className="custom-form"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      disabled={componentDisabled}
      onFinish={handleFormSubmit}
    >
      <Form.Item
        label="ID"
        name="id"
        rules={[{ required: true, message: 'Please enter input ID' }]}
      >
        <Input placeholder="001" />
      </Form.Item>
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please enter input Name' }]}
      >
        <Input placeholder="Enter Name" />
      </Form.Item>
      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: 'Please enter input Price' }]}
      >
        <Input placeholder="Enter Price" />
      </Form.Item>
      <Form.Item
        label="Upload"
        name="upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload action="/upload.do" listType="picture-card">
          <button type="button" className="ant-btn ant-btn-primary">
            <PlusOutlined /> Upload
          </button>
        </Upload>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
        <Button type="primary" htmlType="submit">
          Add Item
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddItem;
