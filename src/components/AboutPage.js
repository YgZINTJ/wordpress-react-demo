import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="content-container" style={{ padding: "60px 0", textAlign: "center" }}>
      <h1>About This Project</h1>
      <p>
        {/* You can replace this with your own explanation */}
        This website is a prototype built using React, WordPress REST API, and Firebase. 
        It showcases recipe cards, category filters, and interactive design.
      </p>
    </div>
  );
};

export default AboutPage;