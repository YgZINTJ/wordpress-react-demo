import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/FoodPage.css";
import Header from './Header';
import Footer from './Footer';
import SignupBar from "./SignupBar";

const FoodPage = () => {
  const { id } = useParams();
  const [foodData, setFoodData] = useState(null);
  const [checklistHtml, setChecklistHtml] = useState(""); // new state

  useEffect(() => {
    fetch("https://aliceblue-viper-829683.hostingersite.com/wp-json/wp/v2/food/${id}")
      .then((res) => res.json())
      .then((data) => {
        const contentHTML = data.content.rendered;

        // 🔻 Split based on checklist marker
        const [instructionsHtml, checklistHtml] = contentHTML.split("<!-- INGREDIENT CHECKLIST START -->") || [];
        const item = {
          name: data.title.rendered,
          image: data.featured_media_url,
          steps: sanitizeSteps(instructionsHtml),
          story: extractStory(instructionsHtml),
        };

        setFoodData(item);
        setChecklistHtml(checklistHtml || ""); // fallback if no split
      })
      .catch((err) => console.error("Failed to fetch food item", err));
  }, [id]);

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

  const extractStory = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const storyDiv = doc.querySelector(".story");
    return storyDiv ? storyDiv.outerHTML : "<p>No story available.</p>";
  };

  if (!foodData) return <p>Loading...</p>;

  return (
    <>
      <SignupBar />

      <Header />

      <div className="foodpage-container">
        <div className="foodpage-content">
          {/* LEFT */}
          <div className="foodpage-left">
            <img src={foodData.image} alt={foodData.name} loading="lazy"/>
            <div className="food-story">
              <h4 className="story-heading">Origin Story</h4>
              <div dangerouslySetInnerHTML={{ __html: foodData.story }} />
            </div>
          </div>

          {/* MIDDLE */}
          <div className="foodpage-middle">
            <section className="hero-banner">
              <h1 className="hero-title">{foodData.name}</h1>
            </section>
            <div className="recipe-steps">
              <div
                className="steps-content"
                dangerouslySetInnerHTML={{ __html: foodData.steps }}
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="foodpage-right">
            <h3>Ingredient Checklist</h3>
            <div className="ingredient-checklist" dangerouslySetInnerHTML={{ __html: checklistHtml }} />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default FoodPage;
