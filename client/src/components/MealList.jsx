import React, { useState, useEffect } from "react";
import { Card, Space, Row, Col, Button } from "antd";
import axios from "axios";

const { Meta } = Card;

const MealList = () => {
  const [items, setItems] = useState([]);

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
              cover={<img alt={meal.title} src={meal.picture} />}
              actions={[
                <Button
                  type="primary"
                  style={{ backgroundColor: "#F56A00", color: "white" }}
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
