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
    form.setFieldsValue({
      upload: [{ url: downloadURL, ref: storageRef.fullPath }],
    });
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
      // debugger;
      const response = await axios.post(
        "https://eato.onrender.com/item",
        {
          name: values.name,
          price: Number(values.price),
          picture: values.upload[0].ref,
        },
        {
          validateStatus: (status) => status >= 200 || status < 400,
        }
      );
      message.success("Item created successfully!");
      setVisible(false);
      form.resetFields();
      fetchItems();
    } catch (error) {
      console.error("Error creating item:", error);
      message.error(
        "Failed to create item. Please check the data and try again."
      );
    }
  };

  const handleEdit = async (record) => {
    setEditingItem(record);
    setVisible(true);

    const storage = getStorage();
    const storageRef = ref(storage, record.picture);
    const upload = record.picture
      ? [{ url: await getDownloadURL(storageRef), ref: record.picture }]
      : [];

    form.setFieldsValue({
      name: record.name,
      price: record.price,
      upload: upload,
    });
  };

  const handleUpdate = async (values) => {
    try {
      const response = await axios.put(
        `https://eato.onrender.com/item/${editingItem.id}`,
        {
          name: values.name,
          price: Number(values.price),
          picture: values.upload[0].ref,
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
            onClick={async () => {
              if (editingItem) {
                const data = await form.validateFields();
                handleUpdate(data);
              } else {
                const data = await form.validateFields();
                handleCreate(data);
              }
            }}
          >
            {editingItem ? "Update" : "Create"}
          </Button>,
        ]}
      >
        <Form form={form}>
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
