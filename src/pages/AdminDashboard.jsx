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
    maybe: 0,
  });

  const [familyStats, setFamilyStats] = useState({
    axelTotal: 0,
    axelAttending: 0,
    axelNotAttending: 0,
    axelMaybe: 0,
    daphneTotal: 0,
    daphneAttending: 0,
    daphneNotAttending: 0,
    daphneMaybe: 0,
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
    const attending = guests.filter((g) => g.rsvp === "Attending").length;
    const notAttending = guests.filter(
      (g) => g.rsvp === "Not Attending",
    ).length;
    const maybe = guests.filter((g) => g.rsvp === "Maybe").length;
    setRSVPStats({ attending, notAttending, maybe });
  };

  // ✅ Calculate Axel & Daphne's Stats
  const calculateFamilyStats = (guests) => {
    const axelTotal = guests.filter((g) => g.family_side === "Axel").length;
    const axelAttending = guests.filter(
      (g) => g.family_side === "Axel" && g.rsvp === "Attending",
    ).length;
    const axelNotAttending = guests.filter(
      (g) => g.family_side === "Axel" && g.rsvp === "Not Attending",
    ).length;
    const axelMaybe = guests.filter(
      (g) => g.family_side === "Axel" && g.rsvp === "Maybe",
    ).length;

    const daphneTotal = guests.filter((g) => g.family_side === "Daphne").length;
    const daphneAttending = guests.filter(
      (g) => g.family_side === "Daphne" && g.rsvp === "Attending",
    ).length;
    const daphneNotAttending = guests.filter(
      (g) => g.family_side === "Daphne" && g.rsvp === "Not Attending",
    ).length;
    const daphneMaybe = guests.filter(
      (g) => g.family_side === "Daphne" && g.rsvp === "Maybe",
    ).length;

    setFamilyStats({
      axelTotal,
      axelAttending,
      axelNotAttending,
      axelMaybe,
      daphneTotal,
      daphneAttending,
      daphneNotAttending,
      daphneMaybe,
    });
  };

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

      // ✅ Recalculate Stats
      calculateStats(
        guests.map((guest) =>
          guest.id === guestId ? { ...guest, rsvp: newRSVP } : guest,
        ),
      );
      calculateFamilyStats(
        guests.map((guest) =>
          guest.id === guestId ? { ...guest, rsvp: newRSVP } : guest,
        ),
      );
    } catch (err) {
      console.error("Failed to update RSVP:", err);
    }
  };

  return (
    <div className="admin-dashboard-theme">
      <div className="admin-container">
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
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
          <div className="stat-box">
            <div className="stat-number">{rsvpStats.maybe}</div>
            <div className="stat-title">Maybe</div>
          </div>
        </div>

        {/* 📊 Axel & Daphne Family Stats - NEW STYLISH CARDS */}
        <div className="family-stats-container">
          {/* Axel's Side */}
          <div className="family-stats-box">
            <h3>Axel Guests</h3>
            <p>
              Total Invited: <span>{familyStats.axelTotal}</span>
            </p>
            <p>
              Attending: <span>{familyStats.axelAttending}</span>
            </p>
            <p>
              Not Attending: <span>{familyStats.axelNotAttending}</span>
            </p>
            <p>
              Maybe: <span>{familyStats.axelMaybe}</span>
            </p>
          </div>

          {/* Daphne's Side */}
          <div className="family-stats-box">
            <h3>Daphne Guests</h3>
            <p>
              Total Invited: <span>{familyStats.daphneTotal}</span>
            </p>
            <p>
              Attending: <span>{familyStats.daphneAttending}</span>
            </p>
            <p>
              Not Attending: <span>{familyStats.daphneNotAttending}</span>
            </p>
            <p>
              Maybe: <span>{familyStats.daphneMaybe}</span>
            </p>
          </div>
        </div>

        <div className="table-container">
          <table className="guest-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>RSVP</th>
                <th>Family Side</th> {/* ✅ NEW COLUMN */}
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
                      onChange={(e) =>
                        handleRSVPChange(guest.id, e.target.value)
                      }
                    >
                      <option value="No Response">No Response</option>
                      <option value="Attending">Attending</option>
                      <option value="Not Attending">Not Attending</option>
                      <option value="Maybe">Maybe</option>
                    </select>
                  </td>
                  <td>
                    {guest.family_side === "Axel"
                      ? "Axel"
                      : guest.family_side === "Daphne"
                        ? "Daphne"
                        : "Unknown"}
                  </td>
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
