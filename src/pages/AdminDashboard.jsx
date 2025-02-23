import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [guests, setGuests] = useState([]);
  const [rsvpStats, setRSVPStats] = useState({
    attending: 0,
    notAttending: 0,
  });

  const [familyStats, setFamilyStats] = useState({
    axelTotal: 0,
    axelAttending: 0,
    axelNotAttending: 0,
    daphneTotal: 0,
    daphneAttending: 0,
    daphneNotAttending: 0,
  });

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
        calculateStats(response.data);
        calculateFamilyStats(response.data);
      } catch (err) {
        console.error("Error fetching guests:", err);
        navigate("/admin");
      }
    };
    fetchGuests();
  }, [navigate]);

  // ✅ Calculate RSVP Stats
  const calculateStats = (guests) => {
    const attending = guests.reduce(
      (sum, g) => (g.rsvp === "Attending" ? sum + g.num_guests : sum),
      0,
    );
    const notAttending = guests.reduce(
      (sum, g) => (g.rsvp === "Not Attending" ? sum + g.num_guests : sum),
      0,
    );

    setRSVPStats({ attending, notAttending });
  };

  // ✅ Calculate Axel & Daphne's Stats
  const calculateFamilyStats = (guests) => {
    const axelTotal = guests
      .filter((g) => g.family_side === "Axel")
      .reduce((sum, g) => sum + g.num_guests, 0);
    const axelAttending = guests
      .filter((g) => g.family_side === "Axel" && g.rsvp === "Attending")
      .reduce((sum, g) => sum + g.num_guests, 0);
    const axelNotAttending = guests
      .filter((g) => g.family_side === "Axel" && g.rsvp === "Not Attending")
      .reduce((sum, g) => sum + g.num_guests, 0);

    const daphneTotal = guests
      .filter((g) => g.family_side === "Daphne")
      .reduce((sum, g) => sum + g.num_guests, 0);
    const daphneAttending = guests
      .filter((g) => g.family_side === "Daphne" && g.rsvp === "Attending")
      .reduce((sum, g) => sum + g.num_guests, 0);
    const daphneNotAttending = guests
      .filter((g) => g.family_side === "Daphne" && g.rsvp === "Not Attending")
      .reduce((sum, g) => sum + g.num_guests, 0);

    setFamilyStats({
      axelTotal,
      axelAttending,
      axelNotAttending,
      daphneTotal,
      daphneAttending,
      daphneNotAttending,
    });
  };

  return (
    <div className="admin-dashboard-theme">
      <div className="admin-container">
        {/* 🔘 Buttons Container for Logout & Invite */}
        <div className="admin-buttons-container">
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>

          <button
            className="invite-button"
            onClick={() => {
              console.log("Invite button clicked! Navigating...");
              navigate("/admin/invite");
            }}
          >
            Invite
          </button>
        </div>

        <div className="admin-dashboard-header">
          <h2>RSVP Admin Dashboard</h2>
        </div>

        {/* 🏆 Total Guests Title */}
        <h2 className="total-guests-title">Total Guests</h2>

        {/* 📊 RSVP Statistics */}
        <div className="stats-container">
          <div className="stat-box">
            <div className="stat-number">{rsvpStats.attending}</div>
            <div className="stat-title">Attending</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">{rsvpStats.notAttending}</div>
            <div className="stat-title">Not Attending</div>
          </div>
        </div>

        {/* 📊 Axel & Daphne Family Stats */}
        <div className="family-stats-container">
          <div className="family-stats-box">
            <h3>Axel's Guests</h3>
            <p>
              Total Invited: <span>{familyStats.axelTotal}</span>
            </p>
            <p>
              Attending: <span>{familyStats.axelAttending}</span>
            </p>
            <p>
              Not Attending: <span>{familyStats.axelNotAttending}</span>
            </p>
          </div>
          <div className="family-stats-box">
            <h3>Daphne's Guests</h3>
            <p>
              Total Invited: <span>{familyStats.daphneTotal}</span>
            </p>
            <p>
              Attending: <span>{familyStats.daphneAttending}</span>
            </p>
            <p>
              Not Attending: <span>{familyStats.daphneNotAttending}</span>
            </p>
          </div>
        </div>

        {/* 📋 Guests Table */}
        <div className="table-container">
          <table className="guest-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>RSVP</th>
                <th>Family Side</th>
                <th>Total Guests</th> {/* ✅ New Column */}
              </tr>
            </thead>
            <tbody>
              {guests.map((guest) => (
                <tr key={guest.id}>
                  <td>{guest.name}</td>
                  <td>{guest.email}</td>
                  <td>
                    {guest.rsvp && guest.rsvp !== ""
                      ? guest.rsvp
                      : "No Response"}
                  </td>
                  <td>
                    {guest.family_side === "Axel"
                      ? "Axel"
                      : guest.family_side === "Daphne"
                        ? "Daphne"
                        : "Unknown"}
                  </td>
                  <td>{guest.num_guests}</td> {/* ✅ Display `num_guests` */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
