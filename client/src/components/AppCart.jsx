import React, { useState, useEffect } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Button, Drawer, Table, message } from "antd";
import axios from "axios";

const AppCart = () => {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartData = JSON.parse(localStorage.getItem("cartData"));
    setCartItems(storedCartData || []);
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + (parseFloat(item.price) || 0),
      0
    );
  };
  const onConfirmOrder = (values) => {
    console.log({ values });
    setCartDrawerOpen(false);
    message.success("Your order has been placed successfully.");
  };

  const handleDelete = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
    localStorage.setItem("cartData", JSON.stringify(updatedCartItems));
    message.success("Item deleted successfully!");
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (value) => (
        <span>${typeof value === "number" ? value.toFixed(2) : value}</span>
      ),
    },
    {
      title: "Remove",
      key: "actions",
      render: (text, record) => (
        <Button type="danger" onClick={() => handleDelete(record.id)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Badge
        onClick={() => setCartDrawerOpen(true)}
        count={cartItems.length}
        className="shoppingCartIcon"
      >
        <ShoppingCartOutlined style={{ fontSize: 24, color: "darkred" }} />
      </Badge>
      <Drawer
        open={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        title="Your Cart"
        contentWrapperStyle={{ width: 500 }}
      >
        <Table
          pagination={false}
          columns={columns}
          dataSource={cartItems}
          summary={(data) => {
            const total = calculateTotal();
            return (
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={1}>
                  <strong>Total:</strong>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                  <strong>${total.toFixed(2)}</strong>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            );
          }}
        />
        <Button
          type="primary"
          onClick={onConfirmOrder}
          style={{ marginTop: 16 }}
        >
          Confirm Order
        </Button>
      </Drawer>
    </div>
  );
};

export default AppCart;
