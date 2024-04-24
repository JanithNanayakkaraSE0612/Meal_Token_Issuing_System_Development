import React from 'react';
import ViewItem from '../components/ViewItem';

const ItemDetailsPage = () => {
  const item = {
    id: 1,
    name: 'Speacial Pizza Mania',
    image: 'https://th.bing.com/th/id/R.cff8a50aff6c22ce009cea45ffd181e4?rik=8pN7tkeiHwNphQ&pid=ImgRaw&r=0',
    price: 12.5,
    description: 'Pizza delight Special pan pizza with cheese,paporony,chicken,fresh tomato ketchup.',
    // Add more item details as needed
  };

  return <ViewItem item={item} />;
};

export default ItemDetailsPage;
