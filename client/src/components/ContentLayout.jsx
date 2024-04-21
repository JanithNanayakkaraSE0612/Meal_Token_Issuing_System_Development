import React from 'react'
import ItemList from './ItemList'
import '../App.css'
import MealList from './MealList'

const ContentLayout = () => {
  return (
    <div className='ContentLayout'>
       
        {/* <ItemList/> */}
        <MealList/>
    </div>
  )
}

export default ContentLayout
