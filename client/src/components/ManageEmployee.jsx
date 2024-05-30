import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Modal,
  Form,
  Input,
  Select,
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

const ManageEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingEmployee, setEditingEmployee] = useState(null);

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
    const storageRef = ref(storage, `profile_pictures/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    form.setFieldsValue({
      upload: [{ url: downloadURL, ref: storageRef.fullPath }],
    });
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("https://eato.onrender.com/employee");
      const responseData = response.data.data;
      if (Array.isArray(responseData)) {
        setEmployees(responseData);
      } else {
        console.error("Data received is not an array:", responseData);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleCreate = async (values) => {
    try {
      const response = await axios.post(
        "https://eato.onrender.com/employee",
        {
          title: values.title,
          name: values.name,
          mobileNumber: values.mobileNumber,
          address: values.address,
          nic: values.nic,
          status: values.status,
          profilePicture: values.upload[0].ref,
        },
        {
          validateStatus: (status) => status >= 200 || status < 400,
        }
      );
      message.success("Employee created successfully!");
      setVisible(false);
      form.resetFields();
      fetchEmployees();
    } catch (error) {
      console.error("Error creating employee:", error);
      message.error(
        "Failed to create employee. Please check the data and try again."
      );
    }
  };

  const handleEdit = async (record) => {
    setEditingEmployee(record);
    setVisible(true);

    const storage = getStorage();
    const storageRef = ref(storage, record.profilePicture);
    const upload = record.profilePicture
      ? [{ url: await getDownloadURL(storageRef), ref: record.profilePicture }]
      : [];

    form.setFieldsValue({
      title: record.title,
      name: record.name,
      mobileNumber: record.mobileNumber,
      address: record.address,
      nic: record.nic,
      status: record.status,
      upload: upload,
    });
  };

  const handleUpdate = async (values) => {
    try {
      const response = await axios.put(
        `https://eato.onrender.com/employee/${editingEmployee.id}`,
        {
          title: values.title,
          name: values.name,
          mobileNumber: values.mobileNumber,
          address: values.address,
          nic: values.nic,
          status: values.status,
          profilePicture: values.upload[0].ref,
        }
      );
      if (response.status === 200) {
        message.success("Employee updated successfully!");
        setVisible(false);
        form.resetFields();
        fetchEmployees();
      } else {
        throw new Error("Unexpected status code: " + response.status);
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      message.error(
        "Failed to update employee. Please check the data and try again."
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
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Mobile Number", dataIndex: "mobileNumber", key: "mobileNumber" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "NIC", dataIndex: "nic", key: "nic" },
    { title: "Status", dataIndex: "status", key: "status" },
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
      await axios.delete(`https://eato.onrender.com/employee/${id}`);
      message.success("Employee deleted successfully!");
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
      message.error("Failed to delete employee.");
    }
  };

  return (
    <div>
      <Button
        className="button"
        style={{ marginBottom: 16 }}
        onClick={() => {
          setEditingEmployee(null);
          setVisible(true);
        }}
      >
        Create Employee
      </Button>
      <Table dataSource={employees} columns={columns} rowKey="id" />

      <Modal
        title={editingEmployee ? "Edit Employee" : "Create Employee"}
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
              if (editingEmployee) {
                const data = await form.validateFields();
                handleUpdate(data);
              } else {
                const data = await form.validateFields();
                handleCreate(data);
              }
            }}
          >
            {editingEmployee ? "Update" : "Create"}
          </Button>,
        ]}
      >
        <Form form={form}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please select the title!" }]}
          >
            <Select>
              <Select.Option value="Mr">Mr</Select.Option>
              <Select.Option value="Mrs">Mrs</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter the name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mobile Number"
            name="mobileNumber"
            rules={[
              { required: true, message: "Please enter the mobile number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter the address!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="NIC"
            name="nic"
            rules={[{ required: true, message: "Please enter the NIC!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select the status!" }]}
          >
            <Select>
              <Select.Option value="Active">Active</Select.Option>
              <Select.Option value="Inactive">Inactive</Select.Option>
            </Select>
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

export default ManageEmployee;