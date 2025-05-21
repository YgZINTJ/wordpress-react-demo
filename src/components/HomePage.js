import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // if using React Router
// Go up from /components to /src, then down into /styles
import "../styles/HomePage.css";
import logo from "../assets/diet.png"; 

const HomePage = () => {
  const [foodItems, setFoodItems] = useState([]);
  const navigate = useNavigate(); 
  useEffect(() => {
    fetch("http://isys3004project2.local/wp-json/wp/v2/food")
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
  // State for menu
  const [showMenu, setShowMenu] = useState(false); 
  // Sample category data
  const [categoryBlocks, setCategoryBlocks] = useState([]); 
  useEffect(() => {
    fetch("https://isys3004project2.local/wp-json/wp/v2/featured_category")
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

      {/* Top Sign-Up Bar (full width, stays outside container) */}
      <div className="top-signup-bar">
        <span>Our Recipes, Your Inbox.</span>
        <a href="#footer-signup" className="signup-link">Sign up</a>
      </div>

      {/* Header Navigation */}
      <header className="homepage-header">
        <div className="content-container header-inner">
          <div className="logo-nav-group">
            <img src={logo} alt="Logo" className="logo" />
          </div>

          <button className="nav-toggle" onClick={() => setShowMenu((prev) => !prev)}>
            ☰
          </button>

          <nav className={`main-nav ${showMenu ? "show" : ""}`}>
            <a href="/" className="nav-link">Home</a>
            <a href="/about" className="nav-link">About</a>
            <a href="/more-recipes" className="nav-link">More Recipes</a>
          </nav>
        </div>
      </header>

      {/* Hero Bar */}
      <section className="hero-banner">
        <div className="content-container">
          <h2 className="hero-title">Simple Asian Cuisine</h2>
        </div>
      </section>

      {/* Recipe Grid */}
      <main className="content-container">
        <div className="food-gallery">
          {foodItems.map((item) => (
            <div className="food-item" onClick={() => handleClick(item.id)}>
              <div className="food-image-container">
                <img src={item.image} alt={item.name} />
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
          {categoryBlocks.map((item) => (
            <div className="category-item" onClick={() => navigate("/comingsoon")}>
              <div className="circle-overlay-wrapper">
                <div className="image-overlay-container">
                  <img src={item.image} alt={item.name} className="category-image" />
                  <div className="overlay-text">{item.name}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer with Signup */}
      <footer id="footer-signup" className="site-footer">
        <div className="content-container footer-signup">
          <h3>Sign up for Email Updates</h3>
          <form className="signup-form">
            <input type="text" placeholder="First Name" />
            <input type="email" placeholder="Email" />
            <button type="submit">Go</button>
          </form>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
