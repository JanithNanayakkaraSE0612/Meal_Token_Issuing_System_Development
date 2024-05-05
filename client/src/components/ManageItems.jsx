import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Modal,
  Form,
  Input,
  Space,
  message,
  Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import "../App.css";

const ManageItems = () => {
  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const beforeUpload = (file) => {
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      message.error("Only JPG/PNG files are allowed!");
      return Upload.LIST_IGNORE;
    }
    handleImageUpload(file);
    return false;
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const fetchItems = async () => {
    try {
    const response = await axios.get("http://localhost:3000/item");
      console.log("Response data:", response.data); // Log the data received
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleCreate = async (values) => {
    try {
      await axios.post("http://localhost:3000/item", values);
      message.success("Item created successfully!");
      setVisible(false);
      form.resetFields();
      fetchItems();
    } catch (error) {
      console.error("Error creating item:", error);
      message.error("Failed to create item.");
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Price", dataIndex: "price", key: "price" },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="danger" onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleEdit = (record) => {
    // Implement edit functionality
    console.log("Edit item:", record);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/item/${id}`);
      message.success("Item deleted successfully!");
      fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
      message.error("Failed to delete item.");
    }
  };

  return (
    <div>
      <button className="button" onClick={() => setVisible(true)}>
        Create Items
      </button>
      <Table dataSource={items} columns={columns} rowKey="id" />

      <Modal
        title="Create Item"
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
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter the name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter the price!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Upload"
            name="upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              action="/upload.do"
              listType="picture-card"
              beforeUpload={beforeUpload}
            >
              <button type="button" className="ant-btn ant-btn-primary">
                <PlusOutlined /> Upload
              </button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageItems;
