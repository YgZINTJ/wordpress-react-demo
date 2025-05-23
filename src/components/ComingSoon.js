

import '../styles/ComingSoon.css'; // ensure you create this
import Footer from './Footer';
import Header from './Header';


const ComingSoonPage = () => {
  return (
      <>
        {/* ✅ Top Thank You Bar */}
        <div className="top-signup-bar">
          Thank you for visiting!
        </div>

        {/* ✅ Header with logo & nav */}
        <Header/>

        {/* ✅ Hero Banner */}
        <section className="hero-banner">
          <h1 className="hero-title">Coming Soon</h1>
        </section>

        {/* ✅ Animated Content Block Placeholder */}
        <main className="comingsoon-content">
          <div className="animated-message">
            <h2>I'm cooking up something special!</h2>
            <p>Due to the insufficiency of time, this assessment has to end here.</p>
            <p>Thank You for Browsing.</p>
          </div>
        </main>

        {/* ✅ Footer Signup */}
        <Footer/>
      </>
    );
  };

export default ComingSoonPage;
