import React from 'react';
import ViewItem from '../components/ViewItem';

const ItemDetailsPage = () => {
  const item = {
    id: 1,
    name: 'Example Item',
    image: 'https://example.com/item-image.jpg',
    price: 20,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    // Add more item details as needed
  };

  return <ViewItem item={item} />;
};

export default ItemDetailsPage;
