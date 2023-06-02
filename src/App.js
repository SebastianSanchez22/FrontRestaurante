import React from "react";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Food from "./components/Food";
import HeadlineCards from "./components/HeadlineCards";
import Category from "./components/Category";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Orders from "./components/Orders";

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
          <Route path="/ordenes" element={<Orders />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
