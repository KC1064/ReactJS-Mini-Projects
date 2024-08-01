import React, { useMemo, useState } from "react";
import "./App.css";
const App = () => {
  const [height, setHeight] = useState(140);
  const [weight, setWeight] = useState(40);

  function weightChange(event) {
    setWeight(event.target.value);
  }

  function heightChange(event) {
    setHeight(event.target.value);
  }

  const output = useMemo(() => {
    const calcHeight = height / 100;

    return (weight / (calcHeight * calcHeight)).toFixed(1);
  }, [weight, height]);

  return (
    <div className="bmi-calc">
      <div className="wrapper">
        <h1>BMI CALCULATOR</h1>
        <div className="weight">
          <p className="slider-input">Weight: {weight}kg</p>
          <input type="range" min="30" max="200" onChange={weightChange} />
        </div>
        <div className="height">
          <p className="slider-input">Height: {height}cm</p>
          <input type="range" min="140" max="220" onChange={heightChange} />
        </div>
        <div className="output">
          <p>Your BMI:</p>
          <p>{output}</p>
        </div>
      </div>
    </div>
  );
};

export default App;
