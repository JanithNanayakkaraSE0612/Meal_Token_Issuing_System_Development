import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ManageItems from "../components/ManageItems";
import CompileMeals from "../components/CompileMeals";
import Dashboard from "../pages/Dashboard";
import MealList from "../components/MealList";
import ManageEmployee from "../components/ManageEmployee";

const AppRoute = () => {
  return (
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/manageItems" element={<ManageItems />}></Route>
        <Route path="/compileMeals" element={<CompileMeals />}></Route>
        <Route path="/mealList" element={<MealList />}></Route>
        <Route path="/manageEmployee" element={<ManageEmployee/>}></Route>
      </Routes>
  );
};

export default AppRoute;
