import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import API from "../axios"
import toast from 'react-hot-toast'

function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState(""); 
  const [emailError, setEmailError] = useState(""); 

  const inputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    if (name === "confirmPassword") setPasswordError("");
    if (name === "email") setEmailError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      setPasswordError("Passwords do not match!");
      return;
    }

    try {
      const response = await API.post(
        "/signup",
        {
          name: user.name,
          email: user.email,
          password: user.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Registration successful!");
      navigate("/"); 
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);

      if (err.response?.data?.message?.includes("email")) {
        setEmailError(err.response.data.message);
      } else {
        toast.error("Signup failed. Please try again.");
      }
    }
  };

  return (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "10px",
    }}
  >
    <form
      onSubmit={handleSubmit}
      style={{
        width: "100%",
        maxWidth: "360px",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.4)",
        color: "white",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Create an account
        </h2>

        <p
          style={{
            textAlign: "center",
            fontSize: "13px",
          }}
        >
          Enter your details below
        </p>

        <input
          type="text"
          name="name"
          value={user.name}
          onChange={inputChange}
          placeholder="Name"
          required
          style={{
            width: "100%",
            padding: "8px",
            height: "40px",
            borderRadius: "6px",
            border: "1px solid #374151",
            color: "white",
            fontSize: "14px",
            outline: "none",
          }}
        />

        <input
          type="email"
          name="email"
          value={user.email}
          onChange={inputChange}
          placeholder="Email or Phone Number"
          required
          style={{
            width: "100%",
            padding: "8px",
            height: "40px",
            borderRadius: "6px",
            border: "1px solid #374151",
            color: "white",
            fontSize: "14px",
            outline: "none",
          }}
        />
        {emailError && (
          <p style={{ color: "#f87171", fontSize: "12px" }}>
            {emailError}
          </p>
        )}

        <input
          type="password"
          name="password"
          className="form-control me-2"
          value={user.password}
          onChange={inputChange}
          placeholder="Password"
          required
        />

        <input
          type="password"
          className="form-control me-2"
          name="confirmPassword"
          value={user.confirmPassword}
          onChange={inputChange}
          placeholder="Confirm Password"
          required
        />
        {passwordError && (
          <p style={{ color: "#f87171", fontSize: "12px" }}>
            {passwordError}
          </p>
        )}

        <button
          type="submit"
          className="btn btn-primary"
          style={{
            width: "100%",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Create Account
        </button>

        <button
          type="button"
          className="btn btn-primary"
          style={{
            width: "100%",
            height: "40px",
            border: "1px solid #374151",
            borderRadius: "6px",
            background: "transparent",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            cursor: "pointer",
          }}
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            style={{ width: "18px", height: "18px" }}
          />
          Sign up with Google
        </button>

        <p
          style={{
            fontSize: "12px",
            textAlign: "center",
          }}
        >
          Already have an account?{" "}
          <NavLink to={"/login"} style={{
                color: "#3b82f6",
                textDecoration: "none",
                display: "inline",
              }}>
              Login
          </NavLink>
        </p>
      </div>
    </form>
  </div>
);

}

export default Signup;
