import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getGuestDetails, submitRSVP } from "../api";

const RSVP = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [guest, setGuest] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGuest = async () => {
      const data = await getGuestDetails(token);
      if (!data) {
        setError("Guest not found or invalid token.");
      } else {
        setGuest(data);
      }
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

  if (error) return <p className="error">{error}</p>;
  if (!guest) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>Hello {guest.name}, Please RSVP</h2>
      <button onClick={() => handleRSVP("Attending")}>Attending</button>
      <button onClick={() => handleRSVP("Not Attending")}>Not Attending</button>
      {/* <button onClick={() => handleRSVP("Maybe")}>Maybe</button> */}
    </div>
  );
};

export default RSVP;
