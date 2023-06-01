import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Food from "./components/Food";
import HeadlineCards from "./components/HeadlineCards";
import ShoppingCart from "./components/ShoppingCart";
import Category from "./components/Category";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <div>
              <Hero />
              <Food />
              <HeadlineCards />
              <Category />
            </div>
          } />
          <Route path="/shoppingCart" element={<ShoppingCart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
