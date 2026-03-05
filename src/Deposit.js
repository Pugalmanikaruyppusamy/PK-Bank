import React, { useContext, useState } from "react";
import { BankContext } from "./BankContext";
import { useNavigate } from "react-router-dom";

function Deposit() {
  const { account, setAccount } = useContext(BankContext);
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [depositedAmount, setDepositedAmount] = useState(0);

  const validateDeposit = () => {
    if (!amount || !accountNumber || !password) {
      return "All fields are required!";
    }

    if (!/^[0-9]{6,12}$/.test(accountNumber)) {
      return "Invalid account number!";
    }

    if (password.length < 8) {
      return "Password must be at least 8 characters!";
    }

    const depositAmount = Number(amount);

    if (isNaN(depositAmount) || depositAmount <= 0) {
      return "Enter a valid deposit amount!";
    }

    if (depositAmount > 100000) {
      return "Maximum deposit limit is ₹1,00,000";
    }

    return "";
  };

  const handleDeposit = () => {
    if (!account) {
      setError("Session expired. Please login again.");
      return;
    }

    const validationError = validateDeposit();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (
      accountNumber.trim() !== account.accountNumber ||
      password !== account.password
    ) {
      setError("Invalid account number or password!");
      return;
    }

    const depositAmount = Number(amount);

 
    const updatedAccount = {
      ...account,
      balance: account.balance + depositAmount,
      transactions: [
        ...(account.transactions || []),
        {
          type: "Deposit",
          amount: depositAmount,
          date: new Date().toLocaleString(),
        },
      ],
    };

  
    const accounts = JSON.parse(localStorage.getItem("bankAccounts")) || [];
    const updatedAccounts = accounts.map((acc) =>
      acc.accountNumber === account.accountNumber ? updatedAccount : acc
    );

    localStorage.setItem("bankAccounts", JSON.stringify(updatedAccounts));
    localStorage.setItem("currentAccount", JSON.stringify(updatedAccount));
    setAccount(updatedAccount);

    setDepositedAmount(depositAmount);
    setShowPopup(true);
    setError("");

    setAmount("");
    setAccountNumber("");
    setPassword("");
  };

  return (
    <div className="container">
      <h2>Deposit Money</h2>

      {error && <p style={{ color: "black" }}>{error}</p>}

      <input
        type="number"
        placeholder="Deposit Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        placeholder="Account Number"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value.trim())}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleDeposit}>Confirm Deposit</button>

      <br /><br />

      <button onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </button>

      {showPopup && (
        <div style={overlayStyle}>
          <div style={popupStyle}>
            <h3>✅ Deposit Successful..😎</h3>
            <p style={{ color: "black" }}>
              ₹<strong>{depositedAmount}</strong> has been deposited successfully.
            </p>

            <button
              onClick={() => setShowPopup(false)}
              style={{ color: "white", backgroundColor: "blueviolet" }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const overlayStyle = {
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

const popupStyle = {
  background: "grey",
  padding: "25px",
  borderRadius: "10px",
  textAlign: "center",
  width: "300px",
};

export default Deposit;
