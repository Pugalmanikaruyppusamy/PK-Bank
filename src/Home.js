import rolex from "./Images/Logo.png";
import "./App.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="mainpage">
      <h1>Save Your Money, Secure Your Future</h1>
      <img src={rolex} alt="Bank Logo" className="logo" />
      <p className="tagline">
        "Your Future, Our Commitment" <br />
       
      </p>

      <div className="home_btn">
        <button className="click" onClick={() => navigate("/create")}>
          Create Account
        </button>

       <button className="click"
        onClick={() => navigate("/login")}>
          Login
        </button>

          {/* Admin Login Button */}
        <button 
          className="click admin-btn"
          onClick={() => navigate("/admin-login")}
        >
          Admin Login
        </button>
      </div>

    
    </div>
  );
}

export default Home;
