import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Countdown from "react-countdown";
import { getGuestDetails } from "../api";
import "../styles/Home.css";
import backgroundImage from "../assets/invitation_background.jpg"; // Import the background image

const weddingDate = new Date("2025-07-27T19:00:00");

const Home = () => {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFadeOut(false);

    if (token.trim() === "") {
      setError("⚠️ Please enter your invitation token.");
      clearErrorAfterDelay();
      return;
    }

    try {
      const guest = await getGuestDetails(token);
      if (guest) {
        navigate(`/invite/${token}`);
      } else {
        setError("❌ Invalid or unauthorized token.");
        clearErrorAfterDelay();
      }
    } catch {
      setError("❌ Invalid or unauthorized token. Please check and try again.");
      clearErrorAfterDelay();
    }
  };

  const clearErrorAfterDelay = () => {
    setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setError("");
        setFadeOut(false);
      }, 500);
    }, 2500);
  };

  return (
    <div className="home-container">
      <div
        className="home-box"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {/* 💰 Meme Coin-Style Wedding Header */}
        <h1 className="wedding-title">
          <span className="axel-name">Axel</span>{" "}
          <span className="text-and">and</span>{" "}
          <span className="daphne-name">Daphne</span>
        </h1>

        <h2 className="wedding-subtitle">
          Contract Deployed.
          <br /> No Rug, Just Love!
        </h2>

        {/* ⏳ Countdown Timer */}
        <p className="countdown-text">💍 Genesis Block Minting Ends In...</p>
        <div className="countdown-timer">
          <Countdown date={weddingDate} />
        </div>

        {/* 🎟 RSVP Token Entry */}
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
            className={`token-input ${error ? "input-error" : ""}`}
          />
          <button type="submit" className="submit-button">
            VERIFY INVITATION
          </button>

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
