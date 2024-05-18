import { ShoppingCartOutlined } from "@ant-design/icons";
import {
  Badge,
  Button,
  Checkbox,
  Drawer,
  Form,
  Input,
  Table,
  Typography,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { getCart } from "../API";

function AppCart() {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [checkoutDrawerOpen, setCheckoutDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    getCart().then((res) => {
      setCartItems(res.products);
    });
  }, []);

  const onConfirmOrder = (values) => {
    console.log({ values });
    setCartDrawerOpen(false);
    setCheckoutDrawerOpen(false);
    message.success("Your order has been placed successfully.");
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://eato.onrender.com/cart/${id}`);
      message.success("Item deleted successfully!");
      fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
      message.error("Failed to delete item.");
    }
  };
  return (
    <div>
      <Badge
        onClick={() => {
          setCartDrawerOpen(true);
        }}
        count={cartItems.length}
        className="shoppingCartIcon"
      >
        <ShoppingCartOutlined style={{ fontSize: 24, color: "darkred" }} />
      </Badge>
      <Drawer
        open={cartDrawerOpen}
        onClose={() => {
          setCartDrawerOpen(false);
        }}
        title="Your Cart"
        contentWrapperStyle={{ width: 500 }}
      >
        <Table
          pagination={false}
          columns={[
            {
              title: "Name",
              dataIndex: "name",
            },
            {
              title: "Price",
              dataIndex: "price",
              render: (value) => {
                return <span>${value.toFixed(2)}</span>;
              },
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
          ]}
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
          onClick={() => {
            setCheckoutDrawerOpen(true);
          }}
          type="primary"
          style={{ marginTop: 16 }}
        >
          Checkout Your Cart
        </Button>
      </Drawer>
      <Drawer
        open={checkoutDrawerOpen}
        onClose={() => {
          setCheckoutDrawerOpen(false);
        }}
        title="Confirm Order"
      >
        <Form onFinish={onConfirmOrder}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter your full name",
              },
            ]}
            label="Full Name"
            name="full_name"
          >
            <Input placeholder="Enter your full name.." />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email",
              },
            ]}
            label="Email"
            name="email"
          >
            <Input placeholder="Enter your email.." />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter your address",
              },
            ]}
            label="Address"
            name="address"
          >
            <Input placeholder="Enter your full address.." />
          </Form.Item>
          <Form.Item>
            <Checkbox defaultChecked disabled>
              Cash on Delivery
            </Checkbox>
          </Form.Item>
          <Typography.Paragraph type="secondary">
            More methods coming soon
          </Typography.Paragraph>
          <Button type="primary" htmlType="submit">
            Confirm Order
          </Button>
        </Form>
      </Drawer>
    </div>
  );
}

export default AppCart;
