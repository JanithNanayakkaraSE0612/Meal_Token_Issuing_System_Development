import React from "react";

import { Card, Space } from "antd";
import { Button, Dropdown, Flex } from "antd";


const { Meta } = Card;
const MealList = () => {
  return (
    <Space direction="vertical" size={2}>
      <div style={{ width: 100 }}>
        <div style={{ position: "absolute" }}>
          <Card
            style={{
              width: 250,
              marginLeft: 100,
              top: 150,
            }}
            cover={<img alt="example" src="" />}
            actions={[
              <Button
                type="added"
                style={{ backgroundColor: "#F56A00", color: "white" }}
              >
                Added
              </Button>,
            ]}
          >
            <Meta title="Vegetable Fried Rice" />
          </Card>
        </div>
      </div>
    </Space>
  );
};
export default MealList;
