import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getGuestDetails, submitRSVP } from "../api";
import "../styles/RSVP.css"; // Ensure this CSS file exists for styling

const RSVP = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [guest, setGuest] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuest = async () => {
      const data = await getGuestDetails(token);
      if (!data) {
        setError("Guest not found or invalid token.");
      } else {
        setGuest(data);
      }
      setLoading(false);
    };
    fetchGuest();
  }, [token]);

  const handleRSVP = async (status) => {
    const response = await submitRSVP(token, status);
    if (response) {
      navigate("/confirmation");
    } else {
      setError("Failed to submit RSVP. Please try again.");
    }
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="rsvp-container">
      <div className="rsvp-box">
        <h2>You are Invited! 🎉</h2>
        <p className="rsvp-welcome">
          Welcome, <strong>{guest.name}</strong>!
        </p>
        <p className="guest-count">
          <strong>Total Number of Guests:</strong> {guest.num_guests}
        </p>

        <p className="rsvp-text">
          Axel & Daphne cannot wait to celebrate with you! Kindly confirm your
          attendance below.
        </p>

        <div className="button-group">
          <button
            className="rsvp-btn attending"
            onClick={() => handleRSVP("Attending")}
          >
            ✅ Attending
          </button>
          <button
            className="rsvp-btn not-attending"
            onClick={() => handleRSVP("Not Attending")}
          >
            ❌ Not Attending
          </button>
        </div>
      </div>
    </div>
  );
};

export default RSVP;
