import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RSVP from "./pages/RSVP";
import Confirmation from "./pages/Confirmation";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/invite/:token" element={<RSVP />} />
      <Route path="/confirmation" element={<Confirmation />} />
    </Routes>
  );
};

export default AppRouter;
