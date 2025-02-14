import { useLocation } from "react-router-dom";
import AppRouter from "./router";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const location = useLocation(); // Get current route

  // Define routes where the header and footer should be hidden
  const hideHeaderFooterRoutes = ["/admin", "/admin/dashboard"];

  return (
    <div className="app-container">
      {/* Only render Header if not in admin routes */}
      {!hideHeaderFooterRoutes.includes(location.pathname) && <Header />}

      <div className="main-content">
        <AppRouter />
      </div>

      {/* Only render Footer if not in admin routes */}
      {!hideHeaderFooterRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;
