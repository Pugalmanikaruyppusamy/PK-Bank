import React, { useContext, useState } from "react";
import { BankContext } from "./BankContext";
import { useNavigate } from "react-router-dom";

function Create() {
  const { setAccount } = useContext(BankContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    accountNumber: "",
    aadhaar: "",
  });

  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const validateForm = () => {
    const { name, email, password, accountNumber, aadhaar } = formData;

    if (!name || !email || !password || !accountNumber || !aadhaar) {
      return "All fields are required!";
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return "Invalid email format!";
    }

    if (password.length < 8) {
      return "Password must be at least 8 characters!";
    }

    if (!/^[0-9]{6,12}$/.test(accountNumber)) {
      return "Account number must be 6–12 digits!";
    }

    if (!/^[2-9][0-9]{11}$/.test(aadhaar)) {
      return "Invalid Aadhaar number!";
    }

    const accounts = JSON.parse(localStorage.getItem("bankAccounts")) || [];
    if (accounts.find(acc => acc.accountNumber === accountNumber)) {
      return "Account number already exists!";
    }

    return "";
  };

  const createAccount = () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    const newAccount = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      accountNumber: formData.accountNumber,
      aadhaar: formData.aadhaar,
      balance: 0,
      transactions: [],
      createdAt: new Date().toISOString(),
    };

    const accounts = JSON.parse(localStorage.getItem("bankAccounts")) || [];
    accounts.push(newAccount);
    localStorage.setItem("bankAccounts", JSON.stringify(accounts));

    setAccount(newAccount);
    localStorage.setItem("currentAccount", JSON.stringify(newAccount));

    // ✅ Show popup instead of alert
    setShowPopup(true);
  };

  return (
    <div className="container">
      <h2>Create Account</h2>

      {error && <p style={{ color: "black" }}>{error}</p>}

      <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
      <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
      <input name="aadhaar" placeholder="Aadhaar Number" maxLength="12" value={formData.aadhaar} onChange={handleChange} />
      <input name="accountNumber" placeholder="Account Number" value={formData.accountNumber} onChange={handleChange} />
       <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
      

      <button onClick={createAccount}>Create Account</button>

      {/* 🎉 SUCCESS POPUP */}
      {showPopup && (
        <div style={overlayStyle}>
          <div style={popupStyle}>
            <h2>🎉 Account Created!</h2>
            <p style={{ color: "black" }}>Do you want to login now?</p>

            <div style={{ marginTop: "20px" }}>
              <button
                style={yesBtn}
                onClick={() => navigate("/login")}
              >
                YES
              </button>

              <button
                style={noBtn}
                onClick={() => setShowPopup(false)}
              >
                NO
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* 💥 Popup Styles */
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
};

const popupStyle = {
  background: "linear-gradient(135deg, #8e2de2, #4a00e0)",
  padding: "30px",
  borderRadius: "15px",
  textAlign: "center",
  color: "white",
  width: "320px",
  animation: "boom 0.4s ease-out",
};

const yesBtn = {
  background: "green",
  color: "white",
  padding: "10px 20px",
  marginRight: "10px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const noBtn = {
  background: "red",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

export default Create;
