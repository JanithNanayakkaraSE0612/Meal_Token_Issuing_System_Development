import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import ManageItems from '../components/ManageItems'
import CompileMeals from '../components/CompileMeals'
import RedeemPage from '../components/RedeemPage'
import ItemDetailsPage from '../components/ItemDetailsPage'


const AppRoute = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/manageItems" element={<ManageItems/>}></Route>
    <Route path="/compileMeals" element={<CompileMeals />}></Route>
    <Route path="/token" element={<RedeemPage/>}></Route>
    <Route path="/itemDetails" element={<ItemDetailsPage />}></Route>
  </Routes>
  </BrowserRouter>
  )
}

export default AppRoute
