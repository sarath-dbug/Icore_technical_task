import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UserList.css";

const UserList = () => {
    const [file, setFile] = useState(null);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    // Check if the user is authenticated
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);


    // Clear the error and success message
    useEffect(() => {
        const timer = setTimeout(() => {
            setError("");
            setSuccess("");
        }, 3000);

        return () => clearTimeout(timer);
    }, [error, success]);


    // Fetch users from the backend
    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:5000/api/users", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsers(response.data);
        } catch (err) {
            setError("Failed to fetch users");
        }
    };


    // Handle file upload
    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const token = localStorage.getItem("token");
            await axios.post("http://localhost:5000/api/upload-users", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            setSuccess("File uploaded successfully!");
            fetchUsers();
        } catch (err) {
            if (err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("Failed to upload file");
            }
        }
    };


    // Handle user deletion
    const handleDelete = async (email) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:5000/api/users/deleteUser/${email}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setSuccess("User deleted successfully!");
            fetchUsers(); // Refresh the user list
        } catch (err) {
            setError("Failed to delete user");
        }
    };


    // Handle user export
    const handleExport = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:5000/api/export-users", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                responseType: "blob",
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "users.xlsx");
            document.body.appendChild(link);
            link.click();
        } catch (err) {
            setError("Failed to export users");
        }
    };


    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    useEffect(() => {
        fetchUsers();
    }, []);


    return (
        <div className="container">
            <div className="header">
                <h2>User Management</h2>
                <button onClick={handleLogout} className="logoutButton">Logout</button>
            </div>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            <div className="uploadSection">
                <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <button onClick={handleUpload}>Upload</button>
            </div>

            <button className="exportButton" onClick={handleExport}>
                Export Users
            </button>

            <table className="table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Role</th>
                        <th>DOB</th>
                        <th>Gender</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.email}>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.role}</td>
                                <td>{new Date(user.dob).toLocaleDateString()}</td>
                                <td>{user.gender}</td>
                                <td>{user.email}</td>
                                <td>{user.mobile}</td>
                                <td>{user.city}</td>
                                <td>{user.state}</td>
                                <td>
                                    <button onClick={() => handleDelete(user.email)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="10" className="noUsers">
                                No users found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;