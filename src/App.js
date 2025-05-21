import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage"; // adjust the path if needed
import FoodPage from "./components/FoodPage";
import ProductPage from "./components/Product"; // adjust the path if needed
import AboutPage from "./components/AboutPage"; // adjust the path if needed
import ComingSoonPage from "./components/ComingSoon"; // adjust the path if needed
//import ComingSoonPage from "./components/ComingSoonPage"; // adjust the path if needed

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/food/:id" element={<FoodPage />}/>
        <Route path="/more-recipes" element={<ProductPage />} />
        <Route path="/comingsoon" element={<ComingSoonPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
