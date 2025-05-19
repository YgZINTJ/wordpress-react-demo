import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/FoodPage.css";

const FoodPage = () => {
  const { id } = useParams(); // Get ID from route
  const navigate = useNavigate();
  const [foodData, setFoodData] = useState(null);

  useEffect(() => {
  fetch(`https://isys3004project2.local/wp-json/wp/v2/food/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const contentHTML = data.content.rendered;
      const item = {
        name: data.title.rendered,
        image: data.featured_media_url,
        steps: sanitizeSteps(contentHTML),
        story: extractStory(contentHTML),
        externalLinks: extractLinks(contentHTML),
      };
      setFoodData(item);
    })
    .catch((err) => console.error("Failed to fetch food item", err));
}, [id]);
  // Helper: Sanitize HTML content
  const sanitizeSteps = (html) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const story = doc.querySelector(".story");
  if (story && story.parentNode) {
    story.parentNode.removeChild(story);
  }
  doc.querySelectorAll("img, a").forEach(el => el.remove());
  return doc.body.innerHTML || "<p>No steps found.</p>";
};

  // Helper: Extract story from HTML content
  const extractStory = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const storyDiv = doc.querySelector(".story");
    return storyDiv ? storyDiv.outerHTML : "<p>No story available.</p>";
};
  // Helper: Extract external links from HTML content
  const extractLinks = (html) => {
    const links = [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    doc.querySelectorAll("a").forEach((a) => {
      links.push({ href: a.href, text: a.innerText });
    });
    return links;
  };

  if (!foodData) return <p>Loading...</p>;
    return (
    <div className="foodpage-container">
      <header className="foodpage-header">
        <div className="nav-links">
          <span className="nav-link" onClick={() => navigate("/")}>Home</span>
          <span className="nav-link" onClick={() => navigate("/product")}>More Recipes</span>
        </div>
      </header>

      <div className="foodpage-content">
        <div className="foodpage-left">
          <img src={foodData.image} alt={foodData.name} />
          <div className="food-story">
            <h4 className="story-heading">Origin Story</h4>
            <div dangerouslySetInnerHTML={{ __html: foodData.story }} />
          </div>
        </div>

        <div className="foodpage-middle">
          <h2 className="recipe-title">{foodData.name}</h2>
          <div className="recipe-steps">
            <h3 className="steps-heading">How to Make It</h3>
            <div
              className="steps-content"
              dangerouslySetInnerHTML={{ __html: foodData.steps }}
            />
          </div>
        </div>

        <div className="foodpage-right">
          <h3>Buy Ingredients</h3>
          <ul>
            {foodData.externalLinks.map((link, index) => (
              <li key={index}>
                <a href={link.href} target="_blank" rel="noreferrer">
                  {link.text || "External Link"}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FoodPage;
