import React from "react";
import "./VillainCard.css";
import bb from "../img/bb.jpg";

const VillainCard = ({ villain }) => {
  const imageSrc =
    villain.name === "Black Beard"
      ? bb
      : `https://robohash.org/${villain.name}?set=set2`; // fallback

  return (
    <div className="villain-card">
      <img
        src={imageSrc}
        alt={villain.name}
        className="villain-image"
      />
      <h2>{villain.name}</h2>
      <p>World: {villain.world}</p>
    </div>
  );
};

export default VillainCard;
