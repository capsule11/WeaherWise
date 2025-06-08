import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/home";
import Footer from "./components/footer";
import Forecast from "./pages/forecast";
import SavedCities from "./pages/savedCities";
import About from "./pages/about";

const App = () => {
  return (
    <Router>
      <div className=" min-h-screen bg-gradient-to-r from-slate-900 via-gray-800 to-zinc-700">
      <Header />
      <div className="pt-20 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forecast" element={<Forecast />} />
          <Route path="/saved-cities" element={<SavedCities />} />
          <Route path="/about" element={<About />} />
        </Routes>
        </div>
      <Footer />
      </div>
    </Router>
  );
};

export default App;
