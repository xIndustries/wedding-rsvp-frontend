import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [guests, setGuests] = useState([]);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await axios.get(
          "http://localhost:8080/api/admin/guests",
          {
            headers: { Authorization: token },
          },
        );
        setGuests(response.data);
      } catch (err) {
        console.error("Error fetching guests:", err);
        navigate("/admin");
      }
    };
    fetchGuests();
  }, [navigate]);

  // ✅ Function to update RSVP status
  const handleRSVPChange = async (guestId, newRSVP) => {
    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(
        "http://localhost:8080/api/admin/update-rsvp",
        { guest_id: guestId, rsvp: newRSVP },
        { headers: { Authorization: token } },
      );

      // ✅ Update the local state immediately
      setGuests((prevGuests) =>
        prevGuests.map((guest) =>
          guest.id === guestId ? { ...guest, rsvp: newRSVP } : guest,
        ),
      );
    } catch (err) {
      console.error("Failed to update RSVP:", err);
    }
  };

  return (
    <div className="admin-container">
      <h2>RSVP Admin Dashboard</h2>
      <button className="logout-btn" onClick={logout}>
        Logout
      </button>

      <div className="table-container">
        <table className="guest-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>RSVP</th>
            </tr>
          </thead>
          <tbody>
            {guests.map((guest) => (
              <tr key={guest.id}>
                <td>{guest.name}</td>
                <td>{guest.email}</td>
                <td>
                  <select
                    value={guest.rsvp || "No Response"}
                    onChange={(e) => handleRSVPChange(guest.id, e.target.value)}
                  >
                    <option value="No Response">No Response</option>
                    <option value="Attending">Attending</option>
                    <option value="Not Attending">Not Attending</option>
                    <option value="Maybe">Maybe</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
