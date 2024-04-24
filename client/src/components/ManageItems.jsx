import React, { useState, useEffect } from "react";
import { Button, Table, Modal, Form, Input, Space, message } from "antd";
import axios from "axios";

const ManageItems = () => {
  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:3001/items");
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleCreate = async (values) => {
    try {
      await axios.post("http://localhost:3001/items", values);
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
  // const handleUpdateItem = async (id) => {
  //   try {
  //     const response = await axios.put(`${updateUrl}/${id}`, updateData); // Include ID if needed
  //     console.log("Item updated successfully:", response.data);
  //     // Optionally, refetch data to update the table
  //     fetchData();
  //   } catch (error) {
  //     console.error("Error updating item:", error);
  //   }
  // };
  const handleEdit = (record) => {
    // Implement edit functionality
    console.log("Edit item:", record);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/items/${id}`);
      message.success("Item deleted successfully!");
      fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
      message.error("Failed to delete item.");
    }
  };

  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>
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
            rules={[{ required: true, message: "Please enter the price!" }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageItems;
