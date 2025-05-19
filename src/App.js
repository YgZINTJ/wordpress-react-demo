import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage"; // adjust the path if needed
import FoodPage from "./components/FoodPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/food/:id" element={<FoodPage />}/>
        {/* More routes like /food/:id will go here later */}
      </Routes>
    </Router>
  );
}

export default App;
