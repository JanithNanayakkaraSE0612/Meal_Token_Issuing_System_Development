import React, { useState, useEffect } from "react";
import { Card, Space, Row, Col, Button } from "antd";
import axios from "axios";
import { addToCart } from "../API";

const { Meta } = Card;

const MealList = ({ addToCart }) => {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

//   const addToCart = async (meal) => {
//     try {
//       // Optionally send data to the server using Axios
//       await axios.post("https://eato.onrender.com/cart", { meal });

//       // Update the local state with the new cart item
//       setCartItems([...cartItems, meal]);
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//     }
//   };
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("https://eato.onrender.com/item");
      const responseData = response.data.data;

      console.log("Fetched items:", responseData); // Log response data

      if (Array.isArray(responseData)) {
        setItems(responseData);
      } else {
        console.error("Data received is not an array:", responseData);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  return (
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
                      e.target.src = "default-image-url.jpg"; // Fallback image
                    }}
                  />
                  {console.log("Image URL:", meal.picture)}{" "}
                  {/* Log Image URL */}
                </>
              }
              actions={[
                <Button
                  type="primary"
                  style={{ backgroundColor: "#F56A00", color: "white" }}
                  onClick={() => addToCart(meal)}
                >
                  Added
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
  );
};

export default MealList;
