import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RSVP from "./pages/RSVP";
import Confirmation from "./pages/Confirmation";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import InviteGuests from "./pages/InviteGuests"; // ✅ Import InviteGuests page
import PrivateRoute from "./components/PrivateRoute";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/invite/:token" element={<RSVP />} />
      <Route path="/confirmation" element={<Confirmation />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/invite"
        element={
          <PrivateRoute>
            <InviteGuests />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
