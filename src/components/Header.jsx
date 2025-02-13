import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <h1>Wedding RSVP</h1>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </header>
  );
};

export default Header;
