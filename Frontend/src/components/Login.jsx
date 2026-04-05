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
        }
      );

      toast.success("login successful")
      navigate("/")
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div
      className="container"
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <div
        className="center-container"
        style={{
          width: "100%",
          maxWidth: "360px",
          padding: "20px",
          borderRadius: "10px",
          background: "#111827",
          boxShadow: "0 6px 18px rgba(0,0,0,0.4)",
          color: "white",
        }}
      >
        <form
          className="row g-2 pt-3"
          onSubmit={loginhandle}
        >
          <h2
            style={{
              fontSize: "22px",
              // fontWeight: "600",
            }}
          >
            Login to your account
          </h2>

          <p
            style={{
              fontSize: "13px",
              marginBottom: "15px",
            }}
          >
            Enter your details below
          </p>

          <div className="col-12">
            <input
              type="email"
              name="email"
              value={user.email}
              placeholder="@gmail.com"
              required
              onChange={inputChange}
              style={{
                width: "100%",
                height: "40px",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #374151",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>

          <div className="col-12">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={inputChange}
              value={user.password}
              style={{
                width: "100%",
                height: "40px",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #374151",
                fontSize: "14px",
                outline: "none",
                marginTop: "12px"

              }}
            />
          </div>

          <div className="col-12">
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                width: "100%",
                cursor: "pointer",
                transition: "0.2s",
                marginTop: "12px"
              }}
            >
              Login
            </button>
          </div>

          <p
            style={{
              fontSize: "13px",
              marginTop: "10px",
            }}
          >
            Don't have an account?{" "}
            <NavLink
              to="/signup"
              style={{
                color: "#3b82f6",
                textDecoration: "none",
                display: "inline",
              }}
            >
              Signup / Register
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
}