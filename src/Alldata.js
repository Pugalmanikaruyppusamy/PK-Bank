import React, { useContext, useState, useEffect } from "react";
import { BankContext } from "./BankContext";

function AllData() {
  const { account, setAccount } = useContext(BankContext);
  const [showTransactions, setShowTransactions] = useState(false);
  const [showClearPopup, setShowClearPopup] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const [error, setError] = useState("");

  const ADMIN_PASSWORD = "PK8947"; // correct admin password

  // Load account from localStorage if available
  useEffect(() => {
    const savedAccount = localStorage.getItem("currentAccount");
    if (savedAccount && !account) {
      setAccount(JSON.parse(savedAccount));
    }
  }, [account, setAccount]);

  if (!account || !account.accountNumber) {
    return (
      <p style={{ textAlign: "center", color: "red", marginTop: "50px" }}>
        ❌ No account created yet
      </p>
    );
  }

  const handleClearHistory = () => {
    // Check admin password
    if (adminPasswordInput === ADMIN_PASSWORD) {
      const updatedAccount = { ...account, transactions: [] };
      setAccount(updatedAccount);
      localStorage.setItem("currentAccount", JSON.stringify(updatedAccount));

      // Also update all accounts in bankAccounts list
      const allAccounts = JSON.parse(localStorage.getItem("bankAccounts")) || [];
      const updatedAccounts = allAccounts.map(acc =>
        acc.accountNumber === account.accountNumber ? updatedAccount : acc
      );
      localStorage.setItem("bankAccounts", JSON.stringify(updatedAccounts));

      setShowClearPopup(false);
      setAdminPasswordInput("");
      setError("");
      alert("✅ Transaction history cleared successfully!");
    } else {
      setError("❌ Incorrect admin password!");
    }
  };

  return (
    <div className="container">
      <h2>Account Details</h2>
      <p><b>Name:</b> {account.name}</p>
      <p><b>Email:</b> {account.email || "N/A"}</p>
      <p><b>Account No:</b> {account.accountNumber}</p>
      <p><b>Balance:</b> ₹{account.balance}</p>

      <button
        style={{
          padding: "10px 20px",
          marginTop: "20px",
          backgroundColor: "blueviolet",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
        onClick={() => setShowTransactions(!showTransactions)}
      >
        {showTransactions ? "Hide Transaction History" : "Show Transaction History"}
      </button>

      {showTransactions && (
        <div style={{ marginTop: "20px", color: "white" }}>
          <h3>Transaction History</h3>
          {account.transactions && account.transactions.length > 0 ? (
            <table className="table">
              <thead style={{ color: "black" }}>
                <tr>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {account.transactions.map((tx, index) => (
                  <tr key={index}>
                    <td>{tx.type}</td>
                    <td>₹{tx.amount}</td>
                    <td>{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="history">No transactions yet</p>
          )}
        </div>
      )}

      {/* Admin-only clear history button */}
      <button
        style={{
          marginTop: "20px",
          backgroundColor: "red",
          color: "white",
          padding: "8px 16px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
        onClick={() => setShowClearPopup(true)}
      >
        Clear Transaction History
      </button>

      {/* Popup */}
      {showClearPopup && (
        <div style={popupOverlay}>
          <div style={popupBox}>
            <h3>Confirm Clear History</h3>
            <p>Enter admin password to confirm:</p>
            <input
              type="password"
              value={adminPasswordInput}
              onChange={(e) => setAdminPasswordInput(e.target.value)}
              placeholder="Admin Password"
              style={{ padding: "8px", width: "80%", marginBottom: "10px",color:"black",backgroundColor:"grey"}}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <button
                onClick={handleClearHistory}
                style={{ backgroundColor: "blueviolet", color: "white", padding: "8px 16px", border: "none", borderRadius: "6px", cursor: "pointer" }}
              >
                Confirm
              </button>
              <button
                onClick={() => {
                  setShowClearPopup(false);
                  setAdminPasswordInput("");
                  setError("");
                }}
                style={{ backgroundColor: "grey", color: "white", padding: "8px 16px", border: "none", borderRadius: "6px", cursor: "pointer" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Popup styles
const popupOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const popupBox = {
  background: "grey",
  padding: "25px",
  borderRadius: "10px",
  textAlign: "center",
  width: "300px",
};

export default AllData;
