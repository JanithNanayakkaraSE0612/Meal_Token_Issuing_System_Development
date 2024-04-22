import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Form,
  Input,
  Upload,
} from 'antd';
const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const AddItem = () => {
    const navigate = useNavigate()
    const [componentDisabled, setComponentDisabled] = useState(false);
    return (
      <>
        {/* <Checkbox
          checked={componentDisabled}
          onChange={(e) => setComponentDisabled(e.target.checked)}
        >
          Form disabled
        </Checkbox> */}
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          disabled={componentDisabled}
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item label="Input">
            <Input />
          </Form.Item> 
          <Form.Item label="Input">
            <Input />
          </Form.Item> 
          <Form.Item label="Input">
            <Input />
          </Form.Item>   
          <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
            <Upload action="/upload.do" listType="picture-card">
              <button
                style={{
                  border: 0,
                  background: 'none',
                }}
                type="button"
              >
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </button>
            </Upload>
          </Form.Item>
          <Form.Item label="Button">
            <Button onClick={()=> navigate('contentLayout')}>Button</Button>
          </Form.Item>
        </Form>
      </>
  )
}

export default AddItem




