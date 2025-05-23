import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // if using React Router
// Go up from /components to /src, then down into /styles
import "../styles/HomePage.css";
import Header from './Header';
import Footer from './Footer';
import SignupBar from "./SignupBar";
const HomePage = () => {
  const [foodItems, setFoodItems] = useState([]);
  const navigate = useNavigate(); 
  useEffect(() => {
    fetch("https://aliceblue-viper-829683.hostingersite.com/wp-json/wp/v2/food")
      .then((res) => res.json())
      .then((data) => {
        const mapped = data.map(item => ({
          id: item.id,
          name: item.title.rendered,
          image: item.featured_media_url || "/placeholder.jpg", 
        }));
        setFoodItems(mapped);
      })
      .catch((err) => console.error("Error fetching food items:", err));
  }, []);
  // Sample category data
  const [categoryBlocks, setCategoryBlocks] = useState([]); 
  useEffect(() => {
    fetch("https://aliceblue-viper-829683.hostingersite.com/wp-json/wp/v2/featured_category")
      .then((res) => res.json())
      .then((data) => {
        const mapped = data.map((item) => ({
          id: item.id,
          name: item.title.rendered,
          image: item.featured_media_url,
        }));
        setCategoryBlocks(mapped);
      })
      .catch((err) => console.error("Error fetching featured categories:", err));
  }, []);

  const handleClick = (id) => {
    navigate(`/food/${id}`); // assuming dynamic route
  };

  return (
    <div className="homepage-wrapper">

      <SignupBar/>

      <Header/>

      {/* Hero Bar */}
      <section className="hero-banner">
        <div className="content-container">
          <h2 className="hero-title">Authentic Asian Cuisine</h2>
        </div>
      </section>

      {/* Recipe Grid */}
      <main className="content-container">
        <div className="food-gallery">
          {foodItems.map((item) => (
            <div
              key={item.id}
              className="food-item"
              role="button"
              tabIndex="0"
              onClick={() => handleClick(item.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleClick(item.id);
                }
              }}
              aria-label={`View recipe: ${item.name}`}
            >
              <div className="food-image-container">
                <img src={item.image} alt={item.name} loading="lazy" />
                <div className="overlay-text">View Recipe</div>
              </div>
              <p className="food-name">{item.name}</p>
            </div>
          ))}
        </div>
      </main>

      {/*Category section*/}
      <section className="category-gallery content-container">
        <div className="category-grid">
          {categoryBlocks.map((item, index) => (
            <div
              key={index}
              className="category-item"
              role="button"
              tabIndex="0"
              onClick={() => navigate("/comingsoon")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  navigate("/comingsoon");
                }
              }}
              aria-label={`Explore ${item.name} recipes`}
            >
              <div className="circle-overlay-wrapper">
                <div className="image-overlay-container">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="category-image"
                    loading="lazy"
                  />
                  <div className="overlay-text">{item.name}</div>
                </div>
              </div>

              {/* ✅ This is the new text under the image */}
              <p className="category-name">{item.name}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer/>

    </div>
  );
};

export default HomePage;
