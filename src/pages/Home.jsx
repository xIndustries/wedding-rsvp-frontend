import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Countdown from "react-countdown";
import { getGuestDetails } from "../api"; // Ensure this function exists
import "../styles/Home.css";

const weddingDate = new Date("2025-07-27T19:00:00");

const Home = () => {
  const [token, setToken] = useState("");
  const [error, setError] = useState(""); // 🔥 Track error messages
  const [fadeOut, setFadeOut] = useState(false); // 🔥 Track fade-out animation
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before validation
    setFadeOut(false); // Reset animation state

    if (token.trim() === "") {
      setError("⚠️ Please enter your invitation token.");
      clearErrorAfterDelay();
      return;
    }

    try {
      const guest = await getGuestDetails(token); // 🔍 Check if the token is valid
      if (guest) {
        navigate(`/invite/${token}`); // ✅ Redirect to invitation page
      } else {
        setError("❌ Invalid or unauthorized token.");
        clearErrorAfterDelay();
      }
    } catch {
      setError("❌ Invalid or unauthorized token. Please check and try again.");
      clearErrorAfterDelay();
    }
  };

  // 🔥 Clears error after 3 seconds with fade-out animation
  const clearErrorAfterDelay = () => {
    setTimeout(() => {
      setFadeOut(true); // Start fade-out animation
      setTimeout(() => {
        setError(""); // Remove error completely
        setFadeOut(false); // Reset fade-out state
      }, 500); // Matches CSS animation duration
    }, 2500);
  };

  return (
    <div className="home-container">
      <div className="home-box">
        {/* 💰 Meme Coin-Style Wedding Header */}
        <h1 className="wedding-title">Axel & Daphne</h1>
        <h2 className="wedding-subtitle">
          Contract Deployed. No Rug, Just Love!
        </h2>

        {/* ⏳ Countdown Timer */}
        <p className="countdown-text">💍 Genesis Block Minting Ends In...</p>
        <div className="countdown-timer">
          <Countdown date={weddingDate} />
        </div>

        {/* 🎟 RSVP Token Entry */}
        {/* <p className="rsvp-text">
          ONLY WHITELISTED ADDRESSES CAN CLAIM THEIR ALLOCATION!
        </p> */}
        <p className="rsvp-text">
          Enter your invitation token below to verify eligibility:
        </p>

        <form className="token-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your invitation token..."
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
            className={`token-input ${error ? "input-error" : ""}`} // Highlight input on error
          />
          <button type="submit" className="submit-button">
            VERIFY INVITATION
          </button>

          {/* 🔥 Error Message with Fade-Out Animation */}
          {error && (
            <p className={`error-message ${fadeOut ? "fade-out" : ""}`}>
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Home;
