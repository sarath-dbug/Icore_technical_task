import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setError("");
        }, 3000);

        return () => clearTimeout(timer);
    }, [error]);


    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:5000/api/auth/register", {
                email,
                password,
            });
            navigate("/login");
        } catch (err) {
            if (err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("Signup failed. Please try again.");
            }
        }
    };

    return (
        <div className="sign-container">
            <div className="sign-form">
                <h1>SignUp</h1>
                {error && <p className="error">{error}</p>}
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleSignup}>SignUp</button>
                <h2>Already have an account? <a href="/login">Login now</a></h2>
            </div>
        </div>
    );
}

export default Signup;