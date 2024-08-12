import React, { useState } from "react";
import "./Tracker.css";

const Tracker = () => {
  const [input, setInput] = useState("");
  const [amount, setAmount] = useState("");
  const [Expense, setExpense] = useState([]);

  const handleClick = () => {
    if (input === "" && amount === "") {
      alert("Enter the required fields.");
      return;
      
    }
    const newExpense = {
      id: new Date().toISOString(),
      name: input,
      amount: amount,
    };
    setExpense([...Expense, newExpense]);
    setAmount("");
    setInput("");
  };

  const removeitem = (id) => {
    const newExpense = Expense.filter((item) => item.id !== id);
    setExpense(newExpense);
  };
  return (
    <div className="container">
      <h1>EXPENSE TRACKER</h1>
      <div className="input">
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
      <div className="expense-list">
        <ul>
          {Expense.map((expense) => (
            <li key={expense.id}> <span>{expense.name}</span>
               <span>${expense.amount}</span>
              <button className= 'delete' onClick={() => removeitem(expense.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Tracker;
