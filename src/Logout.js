import React, { useContext } from "react";
import { BankContext } from "./BankContext";
import { useNavigate } from "react-router-dom";

function Logout() {
  const { setAccount } = useContext(BankContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // ✅ Clear session
    setAccount(null);
    localStorage.removeItem("currentAccount");

    alert("✅ Logged out successfully!");
    navigate("/"); // go back to login page
  };

  return (
    <div className="container logout-page">
      <h2>Logout</h2>
      <p>Are you sure you want to logout?</p>

      <div className="logout-buttons">
        <button className="btn logout-yes" onClick={handleLogout}>
          Yes, Logout
        </button>

        <button
          className="btn logout-cancel"
          onClick={() => navigate("/dashboard")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Logout;
