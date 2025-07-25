import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Crew from "./pages/Crew/Crew";
import Home from "./pages/Home/Home";
import Technology from "./pages/Technology/Technology";
import Destination from "./pages/Destination/Destination";
import Header from "./components/Header/Header";
function App() {
  return (
    <HashRouter>
      <div className="App"></div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destination" element={<Destination />} />
        <Route path="/crew" element={<Crew />} />
        <Route path="/technology" element={<Technology />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
