import React from "react";
import CardContainer from "./CardsContainer";
import { useState, useEffect } from "react";

const Body = () => {
  const [future, setFuture] = useState(0);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    if (future) {
      // setDistance(0);
      const handleCountdown = setInterval(() => {
        const now = new Date().getTime();
        setDistance(future - now);
        //stop countdown when count gets to 0
        if(future - now < 0) {
          setFuture(0)
          setDistance(0)
        }
      }, 1000);
      
      return () => clearTimeout(handleCountdown);
    }
  }, [future]);

  const handleDateInput = (e) => {
    e.preventDefault();
    // get timeInputs (hours, minutes,seconds) in milliseconds
    const hoursInMill = e.target.hours.value * 1000 * 60 * 60;
    const minutesInMill = e.target.minutes.value * 1000 * 60;
    const secondsInMill = e.target.seconds.value * 1000;
    //add times together
    const sumOfTime = hoursInMill + minutesInMill + secondsInMill;
    //get how far into the future we should start counting from
    const futureTime = new Date().getTime() + sumOfTime;
    setFuture(futureTime);
  };

  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));

  return (
    <div className="container">
      <form className="get-time" onSubmit={(e) => handleDateInput(e)}>
        <input type="number" name="hours" id="hours" placeholder="Hours" />
        <input
          type="number"
          name="minutes"
          id="minutes"
          placeholder="Minutes"
        />
        <input
          type="number"
          name="seconds"
          id="seconds"
          placeholder="Seconds"
        />
        <input type="submit" value="Start" />
      </form>
      if(future)
      {
        <CardContainer
          days={days}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
        />
      }
    </div>
  );
};

export default Body;
