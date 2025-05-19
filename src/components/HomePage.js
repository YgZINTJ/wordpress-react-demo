import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // if using React Router
// Go up from /components to /src, then down into /styles
import "../styles/HomePage.css";

// Go up from /components to /src, then down into /assets
import logo from "../assets/diet.png";

const HomePage = () => {
  const [foodItems, setFoodItems] = useState([]);
  const navigate = useNavigate(); // for navigating to food pages
  useEffect(() => {
    fetch("http://isys3004project2.local/wp-json/wp/v2/food")
      .then((res) => res.json())
      .then((data) => {
        const mapped = data.map(item => ({
          id: item.id,
          name: item.title.rendered,
          image: item.featured_media_url || "/placeholder.jpg", // assuming you expose featured_media_url
        }));
        setFoodItems(mapped);
      })
      .catch((err) => console.error("Error fetching food items:", err));
  }, []);

  const handleClick = (id) => {
    navigate(`/food/${id}`); // assuming dynamic route
  };

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="page-title">Delicious Recipes</h1>
        <nav>
          <a href="/product" className="nav-link">Product Page</a>
        </nav>
      </header>

      <main className="food-gallery">
        {foodItems.map((item) => (
          <div key={item.id} className="food-item" onClick={() => handleClick(item.id)}>
            <img src={item.image} alt={item.name} className="food-image" />
            <p className="food-name">{item.name}</p>
          </div>
        ))}
      </main>
    </div>
  );
};

export default HomePage;
