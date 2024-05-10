import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "antd";
import axios from "axios";

const ViewItem = ({ items }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!items || items.length === 0) {
    return <p>No item data available.</p>;
  }

  return (
    <div style={{ padding: "24px" }}>
      <Row gutter={[16, 16]}>
        {items.map((item) => (
          <Col key={item.id} xs={24} sm={16} md={12} lg={8} xl={6}>
            <Card
              title={item.name}
              cover={<img alt={item.name} src={item.image} />}
            >
              <p>Price: ${item.price}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ViewItem;
