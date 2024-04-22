import React from 'react'
import Home from './pages/Home'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ItemList from './components/ItemList'
import MealList from './components/MealList'
import ContentLayout from './components/ContentLayout'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/item' element={<ItemList/>}></Route>
        <Route path='/meal' element={<MealList/>}></Route>
        <Route path='/contentLayout' element={<ContentLayout/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App