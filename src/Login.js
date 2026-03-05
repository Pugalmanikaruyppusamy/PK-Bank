import React, { useContext, useState } from "react";
import { BankContext } from "./BankContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { setAccount } = useContext(BankContext);

  const [accountNumber, setAccountNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    // 🔴 Empty field validation FIRST
    if (!accountNumber.trim() && !password.trim()) {
      setError("❌ Please enter account number and password");
      return;
    }

    if (!accountNumber.trim()) {
      setError("❌ Please enter account number");
      return;
    }

    if (!password.trim()) {
      setError("❌ Please enter password");
      return;
    }

    const accounts = JSON.parse(localStorage.getItem("bankAccounts")) || [];

    if (accounts.length === 0) {
      setError("❌ No account found. Create an account first");
      return;
    }

    const account = accounts.find(
      acc => acc.accountNumber === accountNumber.trim()
    );

    // ❌ Account number incorrect
    if (!account) {
      setError("❌ Account number is incorrect");
      return;
    }

    // ❌ Password incorrect
    if (account.password !== password.trim()) {
      setError("❌ Password is incorrect");
      return;
    }

    // ✅ SUCCESS
    setError("");
    setAccount(account);
    localStorage.setItem("currentAccount", JSON.stringify(account));

    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="container">
      <h2>Login</h2>

      
      {error && (
        <p style={{ color: "black", fontWeight: "bold" }}>
          {error}
        </p>
      )}

      <input
        placeholder="Account Number"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      {/* ✅ SUCCESS POPUP */}
      {showPopup && (
        <div style={overlayStyle}>
          <div style={popupStyle}>
            <h3>✅ Login Successful</h3>
            <p style={{color:'black'}}>Welcome to PK Bank 💜</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;

/* Popup Styles */
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
};

const popupStyle = {
  background: "grey",
  padding: "30px",
  borderRadius: "12px",
  textAlign: "center",
  color: "blueviolet",
};
