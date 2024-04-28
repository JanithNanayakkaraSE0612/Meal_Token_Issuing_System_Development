import React, { useState, useEffect } from "react";
import { Card, Col, Row, Spin, Alert } from "antd"; // Added Spin and Alert from antd for loading and error handling
import axios from "axios";

const BrowseMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    setLoading(true); // Set loading state to true before API call
    try {
      const response = await axios.get("http://localhost:3001/meals");
      setMeals(response.data);
    } catch (error) {
      setError("Error fetching meals. Please try again."); // Set error state if API call fails
      console.error("Error fetching meals:", error);
    } finally {
      setLoading(false); // Set loading state back to false after API call completes (success or failure)
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "24px", textAlign: "center" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "24px", textAlign: "center" }}>
        <Alert message={error} type="error" />
      </div>
    );
  }

  return (
    <div style={{ padding: "24px" }}>
      <Row gutter={[16, 16]}>
        {meals.map((meal) => (
          <Col key={meal.id} xs={24} sm={12} md={8} lg={6}>
            <Card hoverable cover={<img alt={meal.name} src={meal.image} />}>
              <Card.Meta
                title={meal.name}
                description={`Price: $${meal.price}`}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BrowseMeals;
