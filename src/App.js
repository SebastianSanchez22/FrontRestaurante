import React from "react";
import HeadlineCards from "./components/HeadlineCards";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Category from "./components/Category";
import Food from "./components/Food";
import { useState } from "react";

function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);

  return (
    <div>
        <Navbar/>
        <Hero/>
        <HeadlineCards/>
        <Food allProducts={allProducts}
              setAllProducts={setAllProducts}
              total={total}
              setTotal={setTotal}
              countProducts={countProducts}
              setCountProducts={setCountProducts}/>
        <Category/>
    </div>

  );
}

export default App;
