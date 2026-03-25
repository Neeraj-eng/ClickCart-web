import React from 'react'
import { NavLink } from 'react-router-dom'


function Signup() {
    return (
         <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg" >
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
            placeholder="Name"
            required
            className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email or Phone Number"
            required
            className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          />

        <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
            onClick={()=>{toast.success('registration successfully')}}
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
            if you have an account?{" "}
          <NavLink to={'/login'}>
            <span className="text-blue-600 cursor-pointer hover:underline">
              Login
            </span>
          </NavLink>
          </p>
        </div>
      </form>
    </div> 
    )
}

export default Signup
