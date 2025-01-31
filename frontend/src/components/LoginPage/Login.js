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
            </div>
        </div>
    );
}

export default Login;