import {toast} from 'react-hot-toast'
import { NavLink } from 'react-router-dom'

export default function Login(){
    return(
         <div className="container">
        <div className="center-container">
        <form className="row g-3 pt-5">
          <h2>
            Login an account
          </h2>

          <p>
            Enter your details below
          </p>
          <div className='col-md-6 gap-y-2'>
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            className="form-control"
          />

          <input
            type="email"
            name="email"
            placeholder="Email or Phone Number"
            required
            className="form-control"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="form-control"
          />

          <button
            type="submit"
            className="btn btn-primary"

            onClick={()=>{toast.success('registration successfully')}}
          >
            Login
          </button>
          </div>

          {/* <button
            type="button"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className=''
            />
            Login with Google
          </button> */}

          <p>
            if you not have an account?{" "}
          <NavLink to={'/signup'}> 
            <span className=''>
              Sign up / Register
            </span>
          </NavLink>  
          </p>
      </form>
      </div>
    </div>
    )
}