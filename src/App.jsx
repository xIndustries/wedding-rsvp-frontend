import AppRouter from "./router";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app-container">
      <Header />
      <AppRouter />
      <Footer />
    </div>
  );
}

export default App;
