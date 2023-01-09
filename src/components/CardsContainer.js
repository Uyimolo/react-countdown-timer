import React from "react";
import Card from "./Card";

const CardsContainer = ({days,hours,minutes,seconds}) => {
  return (
    <div className="cards-container">
      <Card time={days} desc="DAYS" />
      <Card time={hours} desc="HOURS" />
      <Card time={minutes} desc="MINUTES" />
      <Card time={seconds} desc="SECONDS" />
    </div>
  );
};

export default CardsContainer;
