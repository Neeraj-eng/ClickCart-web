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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Create an account
          </h2>

          <p className="text-center text-sm text-gray-500">
            Enter your details below
          </p>

          <input
            type="text"
            name="name"
            value={user.name}
            onChange={inputChange}
            placeholder="Name"
            required
            className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            name="email"
            value={user.email}
            onChange={inputChange}
            placeholder="Email or Phone Number"
            required
            className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          />
          {emailError && (
            <p className="text-red-500 text-sm">{emailError}</p>
          )}

          <input
            type="password"
            name="password"
            value={user.password}
            onChange={inputChange}
            placeholder="Password"
            required
            className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={inputChange}
            placeholder="Confirm Password"
            required
            className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          />
          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Create Account
          </button>

          <button
            type="button"
            className="w-full border border-gray-300 py-2 rounded-md font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5"
            />
            Sign up with Google
          </button>

          <p className="text-sm text-center text-gray-500">
            Already have an account?{" "}
            <NavLink to={"/login"}>
              <span className="text-blue-600 cursor-pointer hover:underline">
                Login
              </span>
            </NavLink>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
