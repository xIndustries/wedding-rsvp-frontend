import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/InviteGuests.css"; // ✅ Ensure this CSS exists

const InviteGuests = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [familySide, setFamilySide] = useState("Axel"); // Default selection
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  // ✅ Handle Invite Form Submission
  const handleInviteSubmit = async (e) => {
    e.preventDefault();
    setMessage(null); // Reset message before new request

    try {
      const response = await axios.post("http://localhost:8080/api/invite", {
        name,
        email,
        family_side: familySide, // ✅ Fix key to match backend
      });

      if (response.status === 200) {
        setMessage({
          text: "🎉 Invitation sent successfully!",
          type: "success",
        });

        // Reset input fields
        setName("");
        setEmail("");
        setFamilySide("Axel");

        // Optional: Auto navigate back after success
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 2000);
      }
    } catch (error) {
      console.error("Error sending invite:", error);
      setMessage({
        text: "❌ Failed to send invitation. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <div className="invite-container">
      <div className="invite-box">
        <h2>Send an Invitation</h2>
        <form onSubmit={handleInviteSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Guest Name"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Guest Email"
            required
          />
          <select
            value={familySide}
            onChange={(e) => setFamilySide(e.target.value)}
          >
            <option value="Axel">Axel Family</option>
            <option value="Daphne">Daphne Family</option>
          </select>
          <button type="submit">Send Invitation</button>
        </form>

        {/* ✅ Updated Message Rendering */}
        {message && (
          <p className={`invite-message ${message.type}`}>{message.text}</p>
        )}

        <button
          className="back-button"
          onClick={() => navigate("/admin/dashboard")}
        >
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default InviteGuests;
