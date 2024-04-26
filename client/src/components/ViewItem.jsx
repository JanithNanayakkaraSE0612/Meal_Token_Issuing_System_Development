import React from "react";
import { Card, Row, Col } from "antd";

const ViewItem = ({ item }) => {
  return (
    <div style={{ padding: "24px" }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={16} md={12} lg={8} xl={6}>
          <Card
            title={item.name}
            cover={<img alt={item.name} src={item.image} />}
          >
            <p>Price: ${item.price}</p>
            <p>Description: {item.description}</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ViewItem;
