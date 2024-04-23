import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'antd';
import axios from 'axios';

const BrowseMeals = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const response = await axios.get('http://localhost:3001/meals');
      setMeals(response.data);
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <Row gutter={[16, 16]}>
        {meals.map((meal) => (
          <Col key={meal.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={<img alt={meal.name} src={meal.image} />}
            >
              <Card.Meta title={meal.name} description={`Price: $${meal.price}`} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BrowseMeals;
