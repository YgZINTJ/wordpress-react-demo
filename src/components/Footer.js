import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Footer.css"; // Adjust the path if needed
const Footer = () => {
  const navigate = useNavigate(); 
  // Optional: if you want redirect on submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Example: redirect to thank-you or send to Firebase
    navigate("/comingsoon");
  };

  return (
    <>
      {/* Top Thank You Bar (customizable text) */}
      <div className="top-signup-bar">
      </div>

      {/* Footer Signup */}
      <footer id="footer-signup" className="site-footer">
        <div className="content-container footer-signup">
          <h3>Sign up for Email Updates</h3>
          <form className="signup-form" onSubmit={handleSubmit} aria-label="Newsletter signup form">
            {/* First Name */}
            <div className="form-group">
              <label htmlFor="first-name" className="sr-only">First Name</label>
              <input
                id="first-name"
                type="text"
                placeholder="First Name"
                aria-required="false"
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                aria-required="true"
              />
            </div>

            {/* Submit */}
            <button type="submit" aria-label="Submit newsletter form">Go</button>
          </form>
        </div>
      </footer>
    </>
  );
};

export default Footer;
