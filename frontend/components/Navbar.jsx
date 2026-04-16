import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import { useLogout } from "../features/auth/authApi";


export default function Navbar() {

  const navigate = useNavigate();
  // const loggedIn = isLoggedIn();   // ✅ Always checks real auth state
  const logoutUser = useLogout();

  const handleLogout = () => {
    logoutUser();  // ✅ Call the logout function from authApi
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">My Fitness App</h2>
       <button className="btn logout" onClick={handleLogout}>
           <span className="logout">Logout</span> 
          </button>
    </nav>
  );
}
