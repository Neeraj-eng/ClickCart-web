import { useState } from "react"
import API from "../axios"
import { toast } from 'react-hot-toast'
import { NavLink, useNavigate } from 'react-router-dom'
import { useContext } from "react"
import authContext from "../Context/authcontext"

export default function Login() {
  const navigate = useNavigate()
  const [user, setuser] = useState({ email: "", password: "" })
  const {setisAuth} = useContext(authContext)

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
      setisAuth(true);
      console.log(response.data)
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
              className="form-control me-2"
              style={{
                width: "100%",
                height: "40px",
                border: "1px solid #374151",
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
              className="form-control me-2"
              style={{
                width: "100%",
                height: "40px",
                border: "1px solid #374151",
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
              marginLeft: "35px"
            }}
          >
            Don't have an account?{" "}
            <NavLink
              to="/signup"
              style={{
                color: "#3b82f6",
                textDecoration: "underline",
                display: "inline",
                fontSize: "14"
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