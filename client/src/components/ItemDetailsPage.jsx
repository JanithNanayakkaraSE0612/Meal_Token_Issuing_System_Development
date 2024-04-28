import React from 'react';
import ViewItem from '../components/ViewItem';

const ItemDetailsPage = () => {
  const item = {
    id: 1,
    name: 'Speacial Pizza Mania',
    image: 'https://www.deliciouslycleaneats.com.au/wp-content/uploads/2018/08/Meal-Plan-Spread1.jpg',
    price: 12.5,
    description: 'Pizza delight Special pan pizza with cheese,paporony,chicken,fresh tomato ketchup.',
    
  };
  

  return <ViewItem item={item} />;
};

export default ItemDetailsPage;
