import React, { useContext, useState } from "react";
import { BankContext } from "./BankContext";
import { useNavigate } from "react-router-dom";

function Withdraw() {
  const { account, setAccount } = useContext(BankContext);
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [withdrawnAmount, setWithdrawnAmount] = useState(0);

  const validateWithdraw = () => {
    if (!amount || !accountNumber || !password) {
      return "All fields are required!";
    }

    if (!/^[0-9]{6,12}$/.test(accountNumber)) {
      return "Invalid account number!";
    }

    if (password.length < 8) {
      return "Password must be at least 8 characters!";
    }

    const withdrawAmount = Number(amount);

    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      return "Enter a valid withdraw amount!";
    }

    if (withdrawAmount > account.balance) {
      return "Insufficient balance!";
    }

    if (withdrawAmount > 50000) {
      return "Maximum withdrawal limit is ₹50,000";
    }

    return "";
  };

  const handleWithdraw = () => {
    if (!account) {
      setError("Session expired. Please login again.");
      return;
    }

    const validationError = validateWithdraw();
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

    const withdrawAmount = Number(amount);

    // 🔥 UPDATED ACCOUNT OBJECT
    const updatedAccount = {
      ...account,
      balance: account.balance - withdrawAmount,
      transactions: [
        ...(account.transactions || []),
        {
          type: "Withdraw",
          amount: withdrawAmount,
          date: new Date().toLocaleString(),
        },
      ],
    };

    // 🔥 UPDATE ALL ACCOUNTS (PERMANENT STORAGE)
    const accounts = JSON.parse(localStorage.getItem("bankAccounts")) || [];
    const updatedAccounts = accounts.map((acc) =>
      acc.accountNumber === account.accountNumber ? updatedAccount : acc
    );

    localStorage.setItem("bankAccounts", JSON.stringify(updatedAccounts));
    localStorage.setItem("currentAccount", JSON.stringify(updatedAccount));
    setAccount(updatedAccount);

    setWithdrawnAmount(withdrawAmount);
    setShowPopup(true);
    setError("");

    setAmount("");
    setAccountNumber("");
    setPassword("");
  };

  return (
    <div className="container">
      <h2>Withdraw Money</h2>

      {error && <p style={{ color: "black" }}>{error}</p>}

      <input
        type="number"
        placeholder="Withdraw Amount"
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

      <button onClick={handleWithdraw}>Confirm Withdraw</button>

      <br /><br />

      <button onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </button>

      {showPopup && (
        <div style={overlayStyle}>
          <div style={popupStyle}>
            <h3>✅ Withdrawal Successful..😎</h3>
            <p style={{ color: "black" }}>
              ₹<strong>{withdrawnAmount}</strong> withdrawn successfully.
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

export default Withdraw;
