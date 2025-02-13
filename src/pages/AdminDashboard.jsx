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
                <td
                  className={
                    guest.rsvp === "Attending"
                      ? "attending"
                      : guest.rsvp === "Not Attending"
                        ? "not-attending"
                        : "maybe"
                  }
                >
                  {guest.rsvp || "No Response"}
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
