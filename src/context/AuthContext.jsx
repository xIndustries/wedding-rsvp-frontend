import { createContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

// ✅ Create Context
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ Added loading state
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Get current route

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        await axios.get("http://localhost:8080/api/admin/validate-token", {
          headers: { Authorization: token },
        });
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Token validation failed:", error);
        localStorage.removeItem("adminToken");
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  useEffect(() => {
    // ✅ Only redirect if the user is on the login page
    if (isAuthenticated && location.pathname === "/admin") {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, navigate, location]);

  const login = (token) => {
    localStorage.setItem("adminToken", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
    navigate("/admin");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Add PropTypes validation
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// ✅ Ensure proper export format
export { AuthContext, AuthProvider };
