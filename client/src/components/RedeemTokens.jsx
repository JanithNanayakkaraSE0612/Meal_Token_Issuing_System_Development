import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import '../App.css'


const RedeemTokens = () => {
  const [form] = Form.useForm();
  const [redeemed, setRedeemed] = useState(false);

  const onFinish = (values) => {
    // Simulate token redemption logic (replace with actual logic)
    console.log('Received values:', values);
    setRedeemed(true);
    form.resetFields();
    message.success('Token redeemed successfully!');
  };

  return (
    <div style={{ padding: '24px' }}>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Token Code"
          name="tokenCode"
          rules={[{ required: true, message: 'Please enter the token code!' }]}
        >
          <Input />
        </Form.Item>

        {!redeemed ? (
          <Form.Item>
            <Button className={'clickBtn'} type="primary" htmlType="submit">
              Redeem Token
            </Button>
          </Form.Item>
        ) : (
          <p style={{ textAlign: 'center' }}>Token redeemed successfully!</p>
        )}
      </Form>
    </div>
  );
};

export default RedeemTokens;
