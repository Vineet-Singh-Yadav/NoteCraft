import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {

  const authRoutes = import.meta.env.VITE_API_AUTH_URL;
      const [credentials, setCredentials] = useState({name:"", email: "", password: "", cpassword: ""});
      let navigate = useNavigate();
  
      const handleSubmit = async (e) => {
          e.preventDefault();
          // API call 
          const response = await fetch(`${authRoutes}/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
            },
        body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password}),
      });
      const json = await response.json();
      console.log(json);
      if(json.success){
          // Save the auth token and redirect
          localStorage.setItem('token', json.authtoken);
          console.log(localStorage.getItem('token'));
          props.showAlert("Account Created Successfully", "success");
          navigate("/");
      }
      else{
          props.showAlert("Invalid Details", "danger");
      }
  }
  

   const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
  return (
    <div className='container mt-3'>
      <h2>Join NoteCraft – save your ideas safely in the cloud</h2>
      <form onSubmit={handleSubmit} >
        <div className="mb-3">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" onChange={handleChange} name='name' id="name" />
          </div>

          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" onChange={handleChange} name='email' id="email" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" name='password' onChange={handleChange} className="form-control" id="password" minLength={6} required />
        </div>

        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" name='cpassword' onChange={handleChange} className="form-control" id="cpassword" minLength={6} required />
        </div>

        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  )
}
