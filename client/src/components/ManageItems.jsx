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
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "../App.css";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID",
};

initializeApp(firebaseConfig);

const ManageItems = () => {
  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingItem, setEditingItem] = useState(null);

  const beforeUpload = (file) => {
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      message.error("Only JPG/PNG files are allowed!");
      return Upload.LIST_IGNORE;
    }
    handleImageUpload(file); // Handle Firebase upload
    return false;
  };

  const handleImageUpload = async (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    form.setFieldsValue({ upload: [{ url: downloadURL }] });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("https://eato.onrender.com/item");
      const responseData = response.data.data;
      if (Array.isArray(responseData)) {
        setItems(responseData);
      } else {
        console.error("Data received is not an array:", responseData);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleCreate = async (values) => {
    try {
      const response = await axios.post("https://eato.onrender.com/item", {
        name: values.name,
        price: values.price,
        picture: values.upload[0].url,
      });
      if (response.status === 200) {
        message.success("Item created successfully!");
        setVisible(false);
        form.resetFields();
        fetchItems();
      } else {
        throw new Error("Unexpected status code: " + response.status);
      }
    } catch (error) {
      console.error("Error creating item:", error);
      message.error(
        "Failed to create item. Please check the data and try again."
      );
    }
  };

  const handleEdit = (record) => {
    setEditingItem(record);
    setVisible(true);
    form.setFieldsValue({
      name: record.name,
      price: record.price,
      upload: [{ url: record.picture }],
    });
  };

  const handleUpdate = async (values) => {
    try {
      const response = await axios.put(
        `https://eato.onrender.com/item/${editingItem.id}`,
        {
          name: values.name,
          price: values.price,
          picture: values.upload[0].url,
        }
      );
      if (response.status === 200) {
        message.success("Item updated successfully!");
        setVisible(false);
        form.resetFields();
        fetchItems();
      } else {
        throw new Error("Unexpected status code: " + response.status);
      }
    } catch (error) {
      console.error("Error updating item:", error);
      message.error(
        "Failed to update item. Please check the data and try again."
      );
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://eato.onrender.com/item/${id}`);
      message.success("Item deleted successfully!");
      fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
      message.error("Failed to delete item.");
    }
  };

  return (
    <div>
      <Button
        className="button"
        style={{ marginBottom: 16 }}
        onClick={() => {
          setEditingItem(null);
          setVisible(true);
        }}
      >
        Create Item
      </Button>
      <Table dataSource={items} columns={columns} rowKey="id" />

      <Modal
        title={editingItem ? "Edit Item" : "Create Item"}
        visible={visible}
        onCancel={() => {
          setVisible(false);
          form.resetFields();
        }}
        footer={[
          <Button key="cancel" onClick={() => setVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              if (editingItem) {
                form.submit();
              } else {
                form.submit(handleCreate);
              }
            }}
          >
            {editingItem ? "Update" : "Create"}
          </Button>,
        ]}
      >
        <Form form={form} onFinish={handleUpdate}>
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
            rules={[
              { required: true, message: "Please enter the price!" },
              { pattern: /^[0-9]+$/, message: "Price must be a number!" },
            ]}
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
              <Button>
                <PlusOutlined /> Upload
              </Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageItems;
