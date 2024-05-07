import React from "react";
import ViewItem from "../components/ViewItem";

const ItemDetailsPage = () => {
  const item = {
    id: 1,
    name: "Speacial Pizza Mania",
    image:
      "https://www.deliciouslycleaneats.com.au/wp-content/uploads/2018/08/Meal-Plan-Spread1.jpg",
    price: 12.5,
  };

  return <ViewItem item={item} />;
};
0
export default ItemDetailsPage;
