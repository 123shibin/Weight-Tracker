import { useState } from "react";
import "../styles/Register.css";
import { useMutation } from "@tanstack/react-query";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

const registerMutation = useMutation({
    mutationFn: (data) => api.post("/api/auth/register", data),

    onSuccess: () => {
      alert("Registered successfully ✅");
      navigate("/login"); // ✅ redirect only after success
    },

    onError: () => {
      setError("❌ Registration failed. Email may already exist.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("❌ Passwords do not match!");
      return;
    }

    // ✅ call API
    registerMutation.mutate({ fullname, email, password });
  };

  return (
    <div className="signup-page">
      <div className="signup-box">
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="text"
              required
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder=" "
            />
            <label>Full Name</label>
          </div>
          <div className="input-box">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
            />
            <label>Email</label>
          </div>

          <div className="input-box">
            <input
              type={showPassword ? "text" : "password"}
              required
              minLength="8"
              maxLength="20"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
            />
            <label>Password</label>
            {password && (
              <i
                className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"} toggle-password`}
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            )}
          </div>

          <div className="input-box">
            <input
              type={showConfirmPassword ? "text" : "password"}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder=" "
            />
            <label>Confirm Password</label>
            {confirmPassword && (
              <i
                className={`fa-solid ${
                  showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                } toggle-password`}
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              ></i>
            )}
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" className="btn">
            Sign Up
          </button>
        </form>

        <div className="back-login">
          <Link to="/login">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
