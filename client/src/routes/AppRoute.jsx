import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import ManageItems from '../components/ManageItems'
import CompileMeals from '../components/CompileMeals'


const AppRoute = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/manageItems" element={<ManageItems/>}></Route>
    <Route path="/compileMeals" element={<CompileMeals />}></Route>
    <Route path="/" element={<Orders />}></Route>
    {/*<Route path="/customers" element={<Customers />}></Route>*/}
  </Routes>
  </BrowserRouter>
  )
}

export default AppRoute
