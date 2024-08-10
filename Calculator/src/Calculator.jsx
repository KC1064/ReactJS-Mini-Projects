import React, { useState } from "react";
import './calc.css'

const Calculator = () => {
  const [input, setInput] = useState("0");

  const CalculateResult = (input) => {
    let res;
    try {
      const operators = ["+", "-", "x", "/", "%"];
      let operator = null;

      for (let i = 0; i < input.length; i++) {
        if (operators.includes(input[i])) {
          operator = input[i];
          break;
        }
      }

      if(!operator){
        setInput(parseFloat(input).toString());
        return;
      }
      const [operand1, operand2] = input.split(operator).map(parseFloat);

      switch (operator) {
        case "+":
          res = operand1 + operand2;
          break;
        case "-":
          res = operand1 - operand2;
          break;
        case "x":
          res = operand1 * operand2;
          break;
        case "/":
          if (operand2 === 0) {
            res = "Error: Division by zero is not allowed";
          } else {
            res = operand1 / operand2;
          }
          break;
        case "%":
          if (operand2 === 0) {
            res = "Error: Division by zero is not allowed";
          } else {
            res = operand1 % operand2;
          }
          break;
        default:
          throw new Error("Invalid Input");
      }

      setInput(res.toString());
    } catch {
      setInput("Error");
    }
  };

  const handleClick = (val) => {
    if (val === "AC") {
      setInput("");
    } else if (val === "Del") {
      setInput(input.slice(0, -1));
    } else if (val === "=") {
      CalculateResult(input);
    } else {
      setInput((prev_Val) => prev_Val + val);
    }
  };

  return (
    <div className="main">
      <div className="calc">
        <h1>{input}</h1>
        <div className="btns"> 
          <button onClick={() => handleClick("Del")}>Del</button>
          <button onClick={() => handleClick("AC")}>AC</button>
          <button onClick={() => handleClick("%")}>%</button>
          <button onClick={() => handleClick("/")}>/</button>
        </div>
        <div  className="btns">
          <button onClick={() => handleClick("7")}>7</button>
          <button onClick={() => handleClick("8")}>8</button>
          <button onClick={() => handleClick("9")}>9</button>
          <button onClick={() => handleClick("x")}>x</button>
        </div>
        <div  className="btns">
          <button onClick={() => handleClick("4")}>4</button>
          <button onClick={() => handleClick("5")}>5</button>
          <button onClick={() => handleClick("6")}>6</button>
          <button onClick={() => handleClick("+")}>+</button>
        </div>
        <div  className="btns">
          <button onClick={() => handleClick("1")}>1</button>
          <button onClick={() => handleClick("2")}>2</button>
          <button onClick={() => handleClick("3")}>3</button>
          <button onClick={() => handleClick("-")}>-</button>
        </div>
        <div  className="btns">
          <button onClick={() => handleClick("0")}>0</button>
          <button onClick={() => handleClick("00")}>00</button>
          <button onClick={() => handleClick(".")}>.</button>
          <button onClick={() => handleClick("=")}>=</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
