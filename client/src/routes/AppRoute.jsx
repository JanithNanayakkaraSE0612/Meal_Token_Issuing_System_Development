import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ManageItems from "../components/ManageItems";
import CompileMeals from "../components/CompileMeals";
import RedeemPage from "../components/RedeemPage";
import ItemDetailsPage from "../components/ItemDetailsPage";
import Dashboard from "../pages/Dashboard";
import BrowseMeals from "../components/BrowseMeals";
import ViewItem from "../components/ViewItem";

const AppRoute = () => {
  return (
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/manageItems" element={<ManageItems />}></Route>
        <Route path="/compileMeals" element={<CompileMeals />}></Route>
        <Route path="/token" element={<RedeemPage />}></Route>
        <Route path="/itemDetails" element={<ItemDetailsPage />}></Route>
        <Route path="/browseMeal" element={<BrowseMeals />}></Route>
        <Route path="/viewItem" element={<ViewItem />}></Route>
      </Routes>
  );
};

export default AppRoute;
