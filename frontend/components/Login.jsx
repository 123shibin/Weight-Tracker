import { useState } from "react";
import "../styles/Login.css"; // your CSS file
import bgImage from "../assets/backgg.jpg";
import api from "../api";
import { loginSuccess } from "../features/auth/authSlice";
import { useMutation } from "@tanstack/react-query";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


function Login() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

   const loginMutation = useMutation({
    mutationFn: (data) => api.post("/api/auth/login", data),
    onSuccess: (res) => {
      const token = res.data.accessToken;
      localStorage.setItem("token", token);
      dispatch(loginSuccess(token));
      alert("Login successful ✅");
      navigate("/dashboard");
    },
    onError: (err) => {
  console.log(err.response?.data);
  alert(err.response?.data || "Login failed ❌");
},

  });
  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <div
      className="login-page"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
        <div className="login-box">
      <h2>Welcome</h2>

      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div className="input-box">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Email</label>
        </div>

        {/* Password */}
        <div className="input-box">
          <input
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Password</label>

          {/* 👁 Eye Icon */}
          {password.length > 0 && (
            <i
              className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"} toggle-password show`}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          )}
        </div>

        <button type="submit">LOGIN</button>

        <div className="links">
          <Link to="#">Forgot Password?</Link>
          <Link to="/register">Sign Up</Link>
        </div>

        <div className="separator">
          <span>OR LOGIN WITH</span>
        </div>

        <div className="social-icons">
          <a href="#"><i className="fab fa-google"></i></a>
          <a href="#"><i className="fab fa-facebook-f"></i></a>
        </div>
      </form>
    </div>
    </div>
    
  );
}

export default Login;
