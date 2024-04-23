import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import ManageItems from '../components/ManageItems'
import ItemList from '../components/ItemList'

const AppRoute = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<ManageItems/>}></Route>
    {/* <Route path="/inventory" element={<Inventory />}></Route>
    <Route path="/orders" element={<Orders />}></Route>
    <Route path="/customers" element={<Customers />}></Route> */}
  </Routes>
  </BrowserRouter>
  )
}

export default AppRoute
