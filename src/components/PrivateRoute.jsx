import { useContext } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  console.log("🔍 PrivateRoute: Checking Authentication", isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/admin" />;
};

// ✅ Add PropTypes validation
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
