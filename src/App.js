import React from "react";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Food from "./components/Food";
import HeadlineCards from "./components/HeadlineCards";
import Category from "./components/Category";

function App() {
  return (
      <div>
        <Navbar />
        <Hero />
        <HeadlineCards />
        <Category />
        <Food />
      </div>
  );
}

export default App;
