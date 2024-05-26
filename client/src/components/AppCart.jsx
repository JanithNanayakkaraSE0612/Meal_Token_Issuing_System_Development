import React, { useState, useEffect } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Button, Drawer, Table, message } from "antd";
import axios from "axios";

const AppCart = () => {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    try {
      const storedCartData = JSON.parse(localStorage.getItem("cartData"));
      setCartItems(storedCartData || []);
    } catch (error) {
      console.error("Failed to parse cart data from local storage:", error);
      setCartItems([]);
    }
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + (parseFloat(item.price) || 0),
      0
    );
  };

  const onConfirmOrder = async () => {
    const total = calculateTotal();

    try {
      const payload = {
        totalPrice: total,  // Ensure totalPrice is a number
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: parseFloat(item.price).toFixed(2),  // Ensure price is a string formatted to 2 decimal places
        })),
      };

      const response = await axios.post("https://eato.onrender.com/meal", payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }

      console.log("Order placed:", response.data);

      setCartDrawerOpen(false);
      message.success("Your order has been placed successfully.");
    } catch (error) {
      console.error("Failed to place order:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        message.error(`Failed to place order: ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
        console.error("Error request data:", error.request);
        message.error("No response received from server. Please check your network.");
      } else {
        console.error("Error message:", error.message);
        message.error("Failed to place order. Please try again.");
      }
    }
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
          rowKey="id"
          summary={() => {
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
