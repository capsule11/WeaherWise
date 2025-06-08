import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/home";
import Footer from "./components/footer";
import Forecast from "./pages/forecast";
import SavedCities from "./pages/home/savedCities";

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
          {/* <Route path="/map" element={<Map />} /> */}
          {/* <Route path="/about" element={<About />} /> */}
          {/* <Route path="*" element={<NotFound />} /> Optional fallback */}
        </Routes>
        </div>
      <Footer />
      </div>
    </Router>
  );
};

export default App;
