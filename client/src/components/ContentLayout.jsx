import React from 'react'
import ItemList from './ItemList'
import '../App.css'
import MealList from './MealList'
import OrderDetails from './OrderDetails'
import AddItem from './AddItem'

const ContentLayout = () => {
  return (
    <div className='ContentLayout'>
       {/* <AddItem/> */}
        <ItemList/>
        {/* <MealList/> */}
        {/* <OrderDetails/> */}
    </div>
  )
}

export default ContentLayout
