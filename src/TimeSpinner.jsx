import React, { useState } from "react";

const TimeSpinner = ({ dateAndTime, setDateAndTime }) => {

  const handleTime = (time) => {
    setDateAndTime({
      ...dateAndTime,
      deadline_time: time, 
    });
  }

  const generateTimes = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
        const formattedHour = String(hour).padStart(2, "0");
        const formattedMinute = String(minute).padStart(2, "0");
        times.push(`${formattedHour}:${formattedMinute}`);
        }
    }
    return times;
  };

  const times = generateTimes();

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", color: "black", }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxHeight: "150px",
          overflowY: "scroll",
          border: "1px solid #ccc",
          borderRadius: "5px",
          width: "100px",
          textAlign: "center",
        }}
      >
        {times.map((time) => (
          <div
            key={time}
            onClick={() => handleTime(time)}
            style={{
              padding: "10px",
              cursor: "pointer",
              backgroundColor: dateAndTime.deadline_time === time ? "#f0f0f0" : "white",
            }}
          >
            {time}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeSpinner;
