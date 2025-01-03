import React, { useState } from "react";

const TimeSpinner = ({ selectedTime, times, setSelectedTime, setFormData, formData }) => {

  const handleTime = (time) => {
    setSelectedTime(time);
    setFormData({
      ...formData,
      deadline_time: time, 
    });
  }

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
              backgroundColor: selectedTime === time ? "#f0f0f0" : "white",
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
