import React from 'react';
import './Login.css';

function Login() {
    return (
        <div className='login-container'>
            <div className='login-form'>
                <h1>User Login</h1>
                <label htmlFor="email">Email:</label>
                <input type="email" id='email' placeholder='Enter your email' />
                <label htmlFor="password">Password:</label>
                <input type="password" id='password' placeholder='Enter your password' />
                <button>Login</button>
                <h2>Already have an account? <a href="/register">Login in now</a> </h2>
            </div>
        </div>
    );
}

export default Login;