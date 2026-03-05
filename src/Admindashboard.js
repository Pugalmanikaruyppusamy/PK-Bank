import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      alert("❌ Admin access only");
      navigate("/admin-login");
      return;
    }

    const storedAccounts =
      JSON.parse(localStorage.getItem("bankAccounts")) || [];
    setAccounts(storedAccounts);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  const handleDeleteAccount = (accountNumber) => {
    if (window.confirm("Delete this account?")) {
      const updated = accounts.filter(
        (acc) => acc.accountNumber !== accountNumber
      );
      localStorage.setItem("bankAccounts", JSON.stringify(updated));
      setAccounts(updated);
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">🏦 PK Bank Admin Dashboard</h2>

      <button className="logout-btn" onClick={handleLogout}>
        Logout Admin
      </button>

      <div className="grid-container">
        {accounts.length === 0 ? (
          <p>No accounts found</p>
        ) : (
          accounts.map((acc, index) => {
            const transactions = acc.transactions || [];

            return (
              <div key={index} className="account-card">
                <h3>{acc.name}</h3>
                <p><b>Email:</b> {acc.email}</p>
                <p><b>Account No:</b> {acc.accountNumber}</p>
                <p><b>Aadhaar:</b> {acc.aadhaar}</p>
                <p><b>Balance:</b> ₹{acc.balance}</p>

                <hr />

                <p><b>Total Transactions:</b> {transactions.length}</p>

                {transactions.length > 0 ? (
                  <div className="transaction-box">
                    <table>
                      <thead>
                        <tr>
                          <th>Type</th>
                          <th>Amount</th>
                          <th>Date & Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map((tx, i) => (
                          <tr key={i}>
                            <td
                              style={{
                                color:
                                  tx.type === "Deposit"
                                    ? "lightgreen"
                                    : "salmon",
                              }}
                            >
                              {tx.type}
                            </td>
                            <td>₹{tx.amount}</td>
                            <td>{tx.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p>No transactions yet</p>
                )}

                <button
                  className="delete-btn"
                  onClick={() =>
                    handleDeleteAccount(acc.accountNumber)
                  }
                >
                  Delete Account
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;