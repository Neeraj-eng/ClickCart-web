import { useState } from "react"
import API from "../axios"
import { toast } from 'react-hot-toast'
import { NavLink, useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [user, setuser] = useState({ email: "", password: "" })

  const inputChange = (e) => {
    const { name, value } = e.target;
    setuser({ ...user, [name]: value });
  }

  const loginhandle = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post(
        "/login",
        user,
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        }
      );

      toast.success("login successful")
      navigate("/")
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="container">
      <div className="center-container">
        <form className="row g-3 pt-5" onSubmit={loginhandle}>
          <h2>Login to your account</h2>
          <p>Enter your details below</p>

          <div className="col-12">
            <input
              type="email"
              name="email"
              value={user.email}
              placeholder="@gmail.com"
              required
              className="form-control"
              onChange={inputChange}
            />
          </div>

          <div className="col-12">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="form-control"
              onChange={inputChange}
              value={user.password}
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </div>

          {/* Optional Google Login Button */}
          {/* 
          <div className="col-12">
            <button type="button" className="btn btn-outline-secondary w-100">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="google"
                className="me-2"
              />
              Login with Google
            </button>
          </div>
          */}

          <p className="mt-3">
            Don't have an account?{" "}
            <NavLink to="/signup">
              <span>Sign up / Register</span>
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}