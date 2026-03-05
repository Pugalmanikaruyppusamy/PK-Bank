import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BankProvider, BankContext } from "./BankContext";
import { useContext } from "react";


import Nav from "./Nav";
import Home from "./Home";
import Create from "./create";
import Login from "./Login";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import Balance from "./Balance";
import AllData from "./Alldata";
import Dashboard from "./Dashboard";
import Logout from "./Logout";
import AdminLogin from "./Adminlogin";
import AdminDashboard from "./Admindashboard";


function AppRoutes() {
  const { account } = useContext(BankContext);
  const isLoggedIn = account && account.accountNumber;

  return (
    <>
      {/* ✅ Show navbar ONLY after user login */}
      {isLoggedIn && <Nav />}

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/admin-login" element={<AdminLogin />} /> */}

        {/* Protected user routes */}
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Login />} />
        <Route path="/deposit" element={isLoggedIn ? <Deposit /> : <Login />} />
        <Route path="/withdraw" element={isLoggedIn ? <Withdraw /> : <Login />} />
        <Route path="/balance" element={isLoggedIn ? <Balance /> : <Login />} />
        <Route path="/alldata" element={isLoggedIn ? <AllData /> : <Login />} />
        <Route path="/logout" element={isLoggedIn ? <Logout /> : <Login />} />
        <Route
  path="/admin-login"
  element={<AdminLogin />}
/>

<Route
  path="/admin-dashboard"
  element={
    localStorage.getItem("isAdmin") === "true"
      ? <AdminDashboard />
      : <AdminLogin />
  }
/>
       
      </Routes>
    </>
  );
}

export default function App() {
  return (

    <BankProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </BankProvider>
  );
}
