import React, { useState } from "react";

const Tracker = () => {
  const [input, setInput] = useState("");
  const [amount, setAmount] = useState("");
  const [Expense, setExpense] = useState([]);

  const handleClick = () => {
    if (input !== "" && amount !== "") {
      console.log(input, amount);
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

      <ul>
        {Expense.map((expense) => (
          <li key={expense.id}>
            {expense.name} {expense.amount}
            <button onClick={() => removeitem(expense.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tracker;
