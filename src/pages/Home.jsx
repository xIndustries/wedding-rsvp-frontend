import Countdown from "react-countdown";

const weddingDate = new Date("2025-07-27T19:00:00");

const Home = () => {
  return (
    <div className="container home-container">
      <h1>Welcome to Our Wedding RSVP</h1>
      <h2>Countdown to the Big Day:</h2>
      <h1>
        <span className="countdown-timer">
          <Countdown date={weddingDate} />
        </span>
      </h1>
      <p>Please check your invitation link to RSVP.</p>
    </div>
  );
};

export default Home;
