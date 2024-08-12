import React, { useState } from "react";

const Tracker = () => {
  const [input, setInput] = useState("");
  const [amount, setAmount] = useState("");

  const handleClick = () => {
    if (input !== "" && amount !== "") {
      console.log(input, amount);
    }
    setAmount("");
    setInput("");
  };
  return (
    <div>
      <input
        type="text"
        value={input}
        name=""
        id=""
        placeholder="Enter your Expense"
        onChange={(e) => setInput(e.target.value)}
      />
      <input
        type="number"
        value={amount}
        name=""
        id=""
        placeholder="Enter the Amount"
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleClick}>Add Expenses</button>
    </div>
  );
};

export default Tracker;
