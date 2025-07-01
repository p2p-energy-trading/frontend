import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";

// Homepage component renders the landing section with an image and some text
const Homepage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  return (
    // Hero section with image and content
    <div className="hero min-h-screen w-11/12 h-10/12">
      <div className="hero-content flex-col lg:flex-row ">
        {/* Display an image on the left */}
        <img
          src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
          className="max-w-sm rounded-lg shadow-2xl"
          alt="EnerLink P2P Energy Trading"
        />
        <div>
          {/* Main heading */}
          <h1 className="text-5xl font-bold">EnerLink P2P Energy Trading</h1>
          {/* Description text */}
          <p className="py-6">
            Revolutionize energy trading with our peer-to-peer platform. Connect
            directly with energy producers and consumers, trade ETK tokens, and
            participate in a sustainable energy ecosystem powered by blockchain
            technology.
          </p>
          {/* Call to action button */}
          <button className="btn btn-primary" onClick={handleGetStarted}>
            {isAuthenticated ? "Go to Dashboard" : "Get Started"}
          </button>
          {!isAuthenticated && (
            <button
              className="btn btn-outline ml-4"
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
