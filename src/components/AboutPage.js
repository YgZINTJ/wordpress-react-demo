import SignupBar from "./SignupBar";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/AboutPage.css"; // Adjust the path if needed
const AboutPage = () => {
  return (
  <>
    <SignupBar/> 

    <Header/>

    {/* === Main === */}
    <div className="about-container">
      <div className="about-card">
        <h1>About This Project</h1>
        <p>
          This website was created as part of a ISYS3004 assessment 2 project. It's built using React, WordPress CMS, and REST API.  
          The goal is to provide a sloid proof of understanding how to use these technologies to create a functional webpage.
        </p>
      </div>

      <div className="about-card2">
        <p>
          However, the website is not partially finished as time is running out. 
          Some pages such as the Recipe product page are not fully functional, as technoics using to create them are already shown in other pages.
        </p>
      </div>

    <Footer/>
    </div>
  </>
  );
};

export default AboutPage;