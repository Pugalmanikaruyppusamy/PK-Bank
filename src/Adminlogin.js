import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  // Check if admin is already logged in
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (isAdmin) {
      navigate("/admin-dashboard");
    }
  }, [navigate]);

  const handleAdminLogin = () => {
    const username = document.getElementById("admin-username").value.trim();
    const password = document.getElementById("admin-password").value.trim();

    const ADMIN = { username: "Pugazh", password: "PK8947" };

    if (username === ADMIN.username && password === ADMIN.password) {
      localStorage.setItem("isAdmin", "true");
      alert("✅ Admin logged in successfully!");
      navigate("/admin-dashboard");
    } else {
      alert("❌ Invalid admin credentials");
    }
  };

  return (
    <div className="container">
      <h2>Bank Owner Login</h2>
      <input id="admin-username" placeholder="Username" />
      <input id="admin-password" type="password" placeholder="Password" />
      <button onClick={handleAdminLogin}>Login as Admin</button>
    </div>
  );
}

export default AdminLogin;
