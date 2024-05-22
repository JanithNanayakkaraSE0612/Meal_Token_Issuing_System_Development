import React, { useState, useEffect } from "react";
import { Card, Space, Row, Col, Button, message } from "antd";
import axios from "axios";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const { Meta } = Card;

const MealList = ({ onAddToCart }) => {
  const [items, setItems] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const [loadingImages, setLoadingImages] = useState({});

  useEffect(() => {
    fetchItems();
  }, []);

  const addToCart = (meal) => {
    const existingCartData = JSON.parse(localStorage.getItem("cartData")) || [];
    const updatedCartData = [...existingCartData, meal];
    localStorage.setItem("cartData", JSON.stringify(updatedCartData));
    message.success("Item added to cart!");
    onAddToCart(updatedCartData); // Notify parent component about the cart update
  };

  const fetchItems = async () => {
    try {
      const response = await axios.get("https://eato.onrender.com/item");
      const responseData = response.data.data;

      if (Array.isArray(responseData)) {
        setItems(responseData);
        fetchImages(responseData);
      } else {
        console.error("Data received is not an array:", responseData);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const fetchImages = async (items) => {
    const storage = getStorage();
    const imageUrlsPromises = items.map(async (item) => {
      const storageRef = ref(storage, item.picture);
      try {
        const url = await getDownloadURL(storageRef);
        return { [item.id]: url };
      } catch (error) {
        console.error("Error getting download URL:", error);
        return { [item.id]: null };
      }
    });

    const imageUrlsArray = await Promise.all(imageUrlsPromises);
    const newImageUrls = imageUrlsArray.reduce(
      (acc, curr) => ({ ...acc, ...curr }),
      {}
    );
    setImageUrls(newImageUrls);
  };

  return (
    <div>
      <Space
        direction="vertical"
        size={2}
        style={{ width: "100%", padding: "20px" }}
      >
        <Row gutter={[16, 16]}>
          {items.map((meal) => {
            const imageUrl = imageUrls[meal.id];
            const isLoading = loadingImages[meal.id] || false;

            return (
              <Col xs={24} sm={12} md={8} lg={6} key={meal.id}>
                <Card
                  style={{ width: "100%" }}
                  title={meal.name}
                  cover={
                    isLoading ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div className="loader">Loading...</div>
                      </div>
                    ) : imageUrl ? (
                      <img
                        alt={meal.name}
                        src={imageUrl}
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <img
                        alt="Placeholder"
                        src="path/to/placeholder.jpg"
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                        }}
                      />
                    )
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
                        {meal.description && <p>{meal.description}</p>}
                      </div>
                    }
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
      </Space>
    </div>
  );
};

export default MealList;
