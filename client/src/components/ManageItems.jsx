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
  apiKey: "AIzaSyDFq8wtK0Cisnq5K8VNJIgJSkGsnV_PpSw",
  authDomain: "image-upload-1c651.firebaseapp.com",
  projectId: "image-upload-1c651",
  storageBucket: "image-upload-1c651.appspot.com",
  messagingSenderId: "201296211009",
  appId: "1:201296211009:web:b798d3297c7748e7b92ac0",
  measurementId: "G-YNY9SBYJVH",
};

initializeApp(firebaseConfig);

const ManageItems = () => {
  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

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
      setItems(response.data); // Assuming response.data is an array
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };
  const handleCreate = async (values) => {
    try {
      const response = await axios.post(
        "https://eato.onrender.com/item",
        values
      );
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

  const handleEdit = (record) => {
    console.log("Edit item:", record);
  };

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
      <Button className="button" onClick={() => setVisible(true)}>
        Create Item
      </Button>
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
            rules={[
              { required: true, message: "Please enter the price!" },
              { pattern: /^[0-9]+$/, message: "Price must be a number!" }, // Regular expression pattern
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Upload"
            name="upload"
            valuePropName="fileList"
            getValueFromEvent={normFile} // Integrated normFile function here
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
