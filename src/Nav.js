import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { BankContext } from "./BankContext";
import "./App.css";

function Nav() {
  const { account, setAccount } = useContext(BankContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAccount(null);
    localStorage.removeItem("currentAccount");
    alert("✅ Logged out successfully!");
    navigate("/login"); // go back to login
  };

  return (
    <div className="nav">
      <ul className="Head">
         <li onClick={() => navigate(-1)} >
           <a> ⬅ Back</a>
    
        </li>
        <li><Link to="/">Home</Link></li>

        {/* AFTER LOGIN */}
        {account && (
          <>

       
            <li><Link to="/alldata">All Data</Link></li>

           <li><Link to="/logout">Logout</Link></li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Nav;
