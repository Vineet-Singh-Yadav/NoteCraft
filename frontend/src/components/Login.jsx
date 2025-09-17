import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
    const authRoutes = import.meta.env.VITE_API_AUTH_URL;
    const [credentials, setCredentials] = useState({email: "", password: ""});
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${authRoutes}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password}),
        });
        const json = await response.json();
        console.log(json);

        if(json.success){
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Logged in Successfully", "success");
            navigate("/");
        }
        else{
            props.showAlert("Invalid Credentials", "danger");
        }
    }

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className="login-container">
            <h2>Welcome back! Access your notes securely</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        name='email' 
                        id="email" 
                        value={credentials.email} 
                        aria-describedby="emailHelp" 
                        onChange={handleChange} 
                        required
                    />
                    <div id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        value={credentials.password} 
                        name='password' 
                        id="password" 
                        onChange={handleChange} 
                        required
                    />
                </div>
                
                <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
        </div>
    )
}
