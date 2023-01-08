import React from "react";
import CardContainer from "./CardsContainer";
import { useState, useEffect } from "react";

const Body = () => {
  const [future, setFuture] = useState(0);
  const [distance, setDistance] = useState(0);
  const [status, setStatus] = useState("waiting");
  const [submitValue, setSubmitValue] = useState("Start")

  useEffect(() => {
    setStatus("counting");
    const handleCountdown = setInterval(() => {
      const now = new Date().getTime();
      setDistance(future - now);
      //stop countdown when count gets to 0
      if (future - now < 0) {
        setFuture(0);
        setDistance(0);
        setStatus("waiting");
        setSubmitValue("Start")
      }
    }, 0);

    return () => clearTimeout(handleCountdown);
  }, [future]);

  const handleDateInput = (e) => {
    e.preventDefault();
    // get timeInputs (hours, minutes,seconds) in milliseconds
    const hoursInMill = e.target.hours.value * 1000 * 60 * 60;
    const minutesInMill = e.target.minutes.value * 1000 * 60;
    const secondsInMill = e.target.seconds.value * 1000;
    
    const sumOfTime = hoursInMill + minutesInMill + secondsInMill;
    //get how far into the future we should start counting from
    const futureTime = new Date().getTime() + sumOfTime;
    setFuture(futureTime);
    handleClearInput(e);
  };

  const handleClearInput = (e) => {
    e.target.hours.value = "";
    e.target.minutes.value = "";
    e.target.seconds.value = "";
  };

  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));

const handleSubmitClick = (e) => {
console.log(e.target.minutes)
  submitValue === "Start" ? setSubmitValue("Stop") : setSubmitValue("Start")
}

  return (
    <div className="container">
      <form className="get-time" onSubmit={(e) => handleDateInput(e)}>
        <input
          type="number"
          name="hours"
          id="hours"
          placeholder="Hours"
          max={2400}
          min={0}
        />
        <input
          type="number"
          name="minutes"
          id="minutes"
          placeholder="Minutes"
          min={0}
          max={144000}
        />
        <input
          type="number"
          name="seconds"
          id="seconds"
          placeholder="Seconds"
          min={0}
          max={8640000}
        />
        <input type="submit" value={submitValue} onClick={(e) => handleSubmitClick(e)}/>
      </form>

      {status === "waiting" ? (
        <div className="status">
          <p>Please select a desired time for count down and click Start</p>
        </div>
      ) : (
        <CardContainer
          days={days}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
        />
      )}
    </div>
  );
};
export default Body;
