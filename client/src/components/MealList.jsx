import React from "react";
import { Card, Space, Row, Col, Button } from "antd";

const { Meta } = Card;

const MealList = () => {
    const meals = [
        {
            title: "Vegetable Fried Rice",
            img: "https://www.whiskaffair.com/wp-content/uploads/2018/11/Vegetable-Fried-Rice-2-3.jpg", // Add your image source here
            id: 1,
        },
        // Add more meal items here
    ];

    return (
        <Space direction="vertical" size={2} style={{ width: "100%", padding: "20px" }}>
            <Row gutter={[16, 16]}>
                {meals.map((meal) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={meal.id}>
                        <Card
                            style={{
                                width: "100%",
                            }}
                            cover={<img alt={meal.title} src={meal.img} />}
                            actions={[
                                <Button
                                    type="primary"
                                    style={{ backgroundColor: "#F56A00", color: "white" }}
                                >
                                    Added
                                </Button>,
                            ]}
                        >
                            <Meta title={meal.title} />
                        </Card>
                    </Col>
                ))}
            </Row>
        </Space>
    );
};

export default MealList;
