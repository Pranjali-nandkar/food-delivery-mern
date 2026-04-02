import React, { useState } from "react";

const BalanceForm = ({ onAddBalance }) => {
  const [balance, setBalance] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddBalance(balance);
  };
  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
      <input
        type="number"
        value={balance}
        onChange={(e) => setBalance(Number(e.target.value))}
        className="w-full p-2 border mb-2"
        placeholder="Enter amount"
      />
      <button type="submit" className="bg-green-600 text-white p-2 w-full">Add Balance</button>
    </form>
  );
};
export default BalanceForm;