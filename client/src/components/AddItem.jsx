import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Upload, message } from 'antd';
import axios from 'axios';
import '../App.css'
const { TextArea } = Input;
// screenshotBtn.onclick = function(){
//   // generate the screenshot
//   chrome.tabs.captureVisibleTab(null, { format: 'png', quality: 80 }, function(dataUrl){

//     let body = {
//       "image" : dataUrl
//     };

//     // upload to Firebase Storage
//     let url = endpoint + '/uploadImage';
//     fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(body)
//     })
//     .then((response) => response.json())
//     .then(data => {
//       console.log(data);
//     });
//   });
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
      const response = await axios.post('https://example.com/api/addItem', values);
      console.log('Response:', response.data);
      message.success('Item added successfully!');
      navigate('/contentLayout'); // Navigate to the desired route after successful submission
    } catch (error) {
      console.error('Error adding item:', error);
      message.error('Failed to add item. Please try again.');
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
      label="Input 1"
      name="input1"
      rules={[{ required: true, message: 'Please enter input 1' }]}
    >
      <Input placeholder="Enter Input 1" />
    </Form.Item>
    <Form.Item
      label="Input 2"
      name="input2"
      rules={[{ required: true, message: 'Please enter input 2' }]}
    >
      <Input placeholder="Enter Input 2" />
    </Form.Item>
    <Form.Item
      label="Input 3"
      name="input3"
      rules={[{ required: true, message: 'Please enter input 3' }]}
    >
      <Input placeholder="Enter Input 3" />
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
    <Form.Item label="Button">
      <Button type="primary" htmlType="submit">
        Add Item
      </Button>
    </Form.Item>
  </Form>
  );
};

export default AddItem;
