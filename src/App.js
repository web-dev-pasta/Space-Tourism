import React, { useState, useEffect } from "react";
import axios from "axios";
import { HashRouter, Routes, Route } from "react-router-dom";
import Crew from "./pages/Crew/Crew";
import Home from "./pages/Home/Home";
import Technology from "./pages/Technology/Technology";
import Destination from "./pages/Destination/Destination";
import Header from "./components/Header/Header";

function App() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.PUBLIC_URL}/data/data.json`).then(({ data }) => {
      setItems(data);

      const allImageUrls = [
        ...data.destinations.map((d) => d.images.png),
        ...data.crew.map((c) => c.images.png),
        ...data.technology.map((t) => t.images.portrait),
      ];

      allImageUrls.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    });
  }, []);
  return (
    <HashRouter>
      <div className="App"></div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destination" element={<Destination items={items} />} />
        <Route path="/crew" element={<Crew items={items} />} />
        <Route path="/technology" element={<Technology items={items} />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
