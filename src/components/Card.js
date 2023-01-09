import React from "react";

const Cards = ({time,desc}) => {
  return (
    <div className="card">
      <h2 className="time">{time}</h2>
      <p className="desc">{desc}</p>
    </div>
  );
};

export default Cards;
