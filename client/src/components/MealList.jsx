import React, { useState, useEffect } from "react";
import { Card, Space, Row, Col, Button, message } from "antd";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDFq8wtK0Cisnq5K8VNJIgJSkGsnV_PpSw",
  authDomain: "image-upload-1c651.firebaseapp.com",
  projectId: "image-upload-1c651",
  storageBucket: "image-upload-1c651.appspot.com",
  messagingSenderId: "201296211009",
  appId: "1:201296211009:web:b798d3297c7748e7b92ac0",
  measurementId: "G-YNY9SBYJVH",
};

initializeApp(firebaseConfig);
const { Meta } = Card;

const MealList = () => {
  const [items, setItems] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const [loadingImages, setLoadingImages] = useState({});

  useEffect(() => {
    fetchItems();
  }, []);

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
    const newImageUrls = imageUrlsArray.reduce((acc, curr) => ({ ...acc, ...curr }), {});
    setImageUrls(newImageUrls);
  };

  const addToCart = async (meal) => {
    try {
      const response = await axios.post("https://eato.onrender.com/cart", { meal });
      if (response.status === 200) {
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
      <Space direction="vertical" size={2} style={{ width: "100%", padding: "20px" }}>
        <Row gutter={[16, 16]}>
          {items.map((meal) => {
            const imageUrl = imageUrls[meal.id];
            const isLoading = loadingImages[meal.id] || false; // Check loading state

            return (
              <Col xs={24} sm={12} md={8} lg={6} key={meal.id}>
                <Card
                  style={{ width: "100%" }}
                  title={meal.name}
                  cover={
                    isLoading ? (
                      // Display loading indicator while image is being fetched
                      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div className="loader">Loading...</div>
                      </div>
                    ) : imageUrl ? (
                      <img alt={meal.name} src={imageUrl} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
                    ) : (
                      // Display placeholder image if image retrieval fails
                      <img alt="Placeholder" src="path/to/placeholder.jpg" style={{ width: "100%", height: "200px", objectFit: "cover" }} />
                    )
                  }
                  actions={[
                    <Button type="primary" style={{ backgroundColor: "#F56A00", color: "white" }} onClick={() => addToCart(meal)}>
                      Add to Cart
                    </Button>,
                  ]}
                >
                  <Meta
                    title={meal.title}
                    description={
                      <div>
                        <p style={{ margin: 0 }}>{meal.price}</p>
                        {/* Display additional details if available in the API response */}
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
