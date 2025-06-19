import React, { useEffect, useState } from "react";
import VillainCard from "./components/VillainCard";
import "./App.css";

function App() {
  const [villains, setVillains] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/villains")
      .then((res) => res.json())
      .then((data) => {
        // If backend doesn't return image, assign default image here
        const updated = data.map((v) => ({
          ...v,
          image: `https://robohash.org/${v.name}?set=set2`,
        }));
        setVillains(updated);
      })
      .catch((err) => console.error("Failed to fetch villains", err));
  }, []);

  return (
    <div className="container">
      <h1>Villains</h1>
      <div className="villain-list">
        {villains.map((v) => (
          <VillainCard key={v.id} villain={v} />
        ))}
      </div>
    </div>
  );
}

export default App;
