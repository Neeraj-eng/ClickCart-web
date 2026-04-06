import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import AddProduct from "./components/AddProduct";
import Product from "./components/Product";
import {  Routes, Route } from "react-router-dom";
import AppContext  from "./Context/Context";
import UpdateProduct from "./components/UpdateProduct";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from "./components/Signup"
import Login from "./components/Login"
import "./App.css"
import API from "./axios";
import { useContext } from "react";


function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const { addToCart } = useContext(AppContext)
  const [isAuth,setisAuth] = useState(false)
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const fetchauth = async() => {
  const response = await API.get("/isAuth");
  setisAuth(response.data);
  }

  return (
    <>
      <Navbar onSelectCategory={handleCategorySelect} isAuth={isAuth}
      />
      <Routes>
        <Route
          path="/" element={
            <Home addToCart={addToCart} selectedCategory={selectedCategory}
            />
          }
        />
        <Route path="/add_product" element={<AddProduct />} />
        <Route path="/product" element={<Product />} />
        <Route path="product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/update/:id" element={<UpdateProduct />} />
        <Route path="/login" element={<Login setisAuth={setisAuth}/>} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
