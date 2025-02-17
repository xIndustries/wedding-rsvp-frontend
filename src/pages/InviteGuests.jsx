import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/InviteGuests.css"; // ✅ Ensure CSS file exists

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
        family_side: familySide, // ✅ Ensure correct key name for backend
      });

      if (response.status === 200) {
        setMessage("🎉 Invitation sent successfully!");
        setName(""); // Reset input fields
        setEmail("");
        setFamilySide("Axel");
      }
    } catch (error) {
      console.error(
        "❌ Error sending invite:",
        error.response?.data || error.message,
      );
      setMessage(
        `❌ Failed to send invitation: ${error.response?.data?.error || "Please try again."}`,
      );
    }
  };

  return (
    <div className="invite-container">
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
      {message && <p className="invite-message">{message}</p>}

      <button
        className="back-button"
        onClick={() => navigate("/admin/dashboard")}
      >
        ← Back to Dashboard
      </button>
    </div>
  );
};

export default InviteGuests;
