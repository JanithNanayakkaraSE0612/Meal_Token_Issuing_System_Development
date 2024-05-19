import React, { useState, useEffect } from "react";
import { Card, Space, Row, Col, Button, message } from "antd";
import axios from "axios";

const { Meta } = Card;

const MealList = () => {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchItems();
    fetchCartItems();
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

  const fetchCartItems = async () => {
    try {
      const response = await axios.get("https://eato.onrender.com/cart");
      setCartItems(response.data.data || []);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const addToCart = async (meal) => {
    try {
      const response = await axios.post("https://eato.onrender.com/cart", {
        meal,
      });
      if (response.status === 200) {
        setCartItems((prevItems) => [...prevItems, meal]);
        message.success("Item added to cart!");
      } else {
        message.error("Failed to add item to cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      message.error("Failed to add item to cart.");
    }
  };

  return (
      <div>
        <Space
            direction="vertical"
            size={2}
            style={{ width: "100%", padding: "20px" }}
        >
          <Row gutter={[16, 16]}>
            {items.map((meal) => (
                <Col xs={24} sm={12} md={8} lg={6} key={meal.id}>
                  <Card
                      style={{ width: "100%" }}
                      title={meal.name}
                      cover={
                        <>
                          <img
                              alt={meal.name}
                              src={meal.picture}
                              style={{
                                width: "100%",
                                height: "200px",
                                objectFit: "cover",
                              }}
                              onError={(e) => {
                                e.target.onerror = null;
                              }}
                          />
                        </>
                      }
                      actions={[
                        <Button
                            type="primary"
                            style={{ backgroundColor: "#F56A00", color: "white" }}
                            onClick={() => addToCart(meal)}
                        >
                          Add to Cart
                        </Button>,
                      ]}
                  >
                    <Meta
                        title={meal.title}
                        description={
                          <div>
                            <p style={{ margin: 0 }}>{meal.price}</p>
                          </div>
                        }
                    />
                  </Card>
                </Col>
            ))}
          </Row>
        </Space>
      </div>
  );
};

export default MealList;