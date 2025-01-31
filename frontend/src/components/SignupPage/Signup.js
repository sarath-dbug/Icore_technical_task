import React from 'react'
import "./Signup.css"

function Signup() {
    return (
        <div className='sign-container'>
            <div className='sign-form'>
                <h1>SignUp</h1>
                <label htmlFor="email">Email:</label>
                <input type="email" id='email' placeholder='Enter your email' />
                <label htmlFor="password">Password:</label>
                <input type="password" id='password' placeholder='Enter your password' />
                <button>SignUp</button>
                <h2>Dont't have an account? <a href="/login">Sign in now</a> </h2>
            </div>
        </div>
    )
}

export default Signup