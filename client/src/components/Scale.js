import React, { useState } from "react";
import "./Scale.css";
function Scale({ strictnessValue, setStrictnessValue }) {
  const handleChange = async (event) => {
    setStrictnessValue(event.target.value);
  };

  return (
    <div className="scale-container">
      <label className="label-strictnessLevel">Domain Level</label>
      <input
        type="range"
        min="0"
        max="5"
        value={strictnessValue}
        onChange={handleChange}
      />
      <p className="scale-p">{strictnessValue}</p>
    </div>
  );
}

export default Scale;
