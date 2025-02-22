import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Confirmation.css";

const Confirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [rsvpStatus, setRsvpStatus] = useState("");
  const [rsvpImage, setRsvpImage] = useState("");

  useEffect(() => {
    if (location.state) {
      setRsvpStatus(location.state.rsvpStatus);
      setRsvpImage(location.state.rsvpImage);
    }
  }, [location.state]);

  return (
    <div className="confirmation-container">
      <div className="confirmation-box">
        {/* Dynamic Image Based on RSVP Response */}
        <div className="invite-image-container">
          <img src={rsvpImage} alt="RSVP Response" className="invite-image" />
        </div>

        <h2 className="confirmation-title">Thank You for Your RSVP</h2>

        {/* Dynamic Message Based on RSVP Response */}
        <p className="confirmation-message">
          {rsvpStatus === "Attending" ? (
            <>
              Your response has been successfully recorded. <br />
              We can't wait to celebrate with you! 🎉
            </>
          ) : (
            <>
              Your response has been successfully recorded. <br />
              We'll miss you at the celebration. ❤️
            </>
          )}
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
