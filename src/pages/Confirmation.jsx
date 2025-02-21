import { useNavigate } from "react-router-dom";
import "../styles/Confirmation.css"; // Ensure this CSS file exists

const Confirmation = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="confirmation-container">
      <div className="confirmation-box">
        <h2 className="confirmation-title">🎉 Thank You for RSVPing! 🎉</h2>
        <p className="confirmation-message">
          Your response has been successfully recorded. <br />
          We can't wait to celebrate with you! 💍✨
        </p>

        {/* 🔘 "Back to Home" Button */}
        <button className="home-button" onClick={() => navigate("/")}>
          ⬅ Return to Home
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
