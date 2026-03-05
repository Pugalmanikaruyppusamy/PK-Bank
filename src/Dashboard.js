import React, { useContext } from "react";
import { BankContext } from "./BankContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { account } = useContext(BankContext);
  const navigate = useNavigate();

  if (!account) {
    navigate("/login");
    return null;
  }

  return (
    <div className="container">
      <h2>Welcome, {account.name} 👋</h2>
      <p>Choose an action</p>

      <div className="dashboard_btn">
        <button onClick={() => navigate("/deposit")}>Deposit</button>
        <button onClick={() => navigate("/withdraw")}>Withdraw</button>
        <button onClick={() => navigate("/balance")}>Balance</button>
      </div>
      <div className="atm-wrapper">
  <div className="atm-card">

    {/* FRONT */}
    <div className="atm-front">
      <div className="atm-bank">PK BANK</div>

      <div className="atm-chip"></div>

      <div className="atm-number">
        **** **** **** {account.accountNumber.slice(-4)}
      </div>

      <div className="atm-footer">
        <div>{account.name}</div>
        <div className="atm-balance">₹{account.balance}</div>
      </div>
    </div>

   {/* BACK */}
<div className="atm-back">

  <div className="magnetic-strip"></div>

  <div className="signature-strip">
    <div className="cvv">CVV ***</div>
  </div>

  <div className="atm-back-info">
    <p><b>Card No:</b> 0811 07 0911 04</p>
    <p><b>IFSC:</b> PKBK0001234</p>
    <p><b>Valid Thru:</b> 12/30</p>
  </div>

  

</div>


  </div>
</div>

    </div>

    
  );
}

export default Dashboard;
