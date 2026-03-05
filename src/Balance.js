import React, { useContext, useEffect } from "react";
import { BankContext } from "./BankContext";
import { useNavigate } from "react-router-dom";

function Balance() {
  const { account } = useContext(BankContext);
  const navigate = useNavigate();

  // Redirect to login if no account is logged in
  useEffect(() => {
    if (!account) {
      navigate("/login");
    }
  }, [account, navigate]);

  if (!account) return null; // Prevent rendering before redirect

  return (
    <div className="container">
      <h2>Account Balance</h2>

      <div
        style={{
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          marginTop: "20px",
        }}
      >
        <p>
          <strong>Name:</strong> {account.name}
        </p>
        <p>
          <strong>Account Number:</strong> {account.accountNumber}
        </p>
        <p style={{ fontSize: "22px", color: "gray" }}>
          <strong>Balance:</strong> ₹{account.balance}
        </p>
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
      </div>
    </div>
  );
}

export default Balance;
