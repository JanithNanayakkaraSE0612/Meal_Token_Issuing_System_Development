import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios"; // Import Axios
import "../App.css";

const RedeemTokens = () => {
  const [form] = Form.useForm();
  const [redeemed, setRedeemed] = useState(false);

  const onFinish = async (values) => {
    try {
      // Make the API call using Axios
      const response = await axios.post("https://your-api-endpoint.com/redeem", values);
      
      // Handle successful response
      console.log("Response:", response.data);
      setRedeemed(true);
      form.resetFields();
      message.success("Token redeemed successfully!");
    } catch (error) {
      // Handle errors
      console.error("Error:", error);
      message.error("Failed to redeem token. Please try again.");
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Token Code"
          name="tokenCode"
          rules={[{ required: true, message: "Please enter the token code!" }]}
        >
          <Input />
        </Form.Item>

        {!redeemed ? (
          <Form.Item>
            <Button className={"clickBtn"} type="primary" htmlType="submit">
              Redeem Token
            </Button>
          </Form.Item>
        ) : (
          <p style={{ textAlign: "center" }}>Token redeemed successfully!</p>
        )}
      </Form>
    </div>
  );
};

export default RedeemTokens;
