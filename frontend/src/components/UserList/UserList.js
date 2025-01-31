import React, { useState } from "react";
import "./UserList.css";

const UserList = () => {
    const [file, setFile] = useState(null); 
    const [users, setUsers] = useState([]); 
    const [error, setError] = useState(""); 
    const [success, setSuccess] = useState("");

    // Handle file input change
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setError("");
        } else {
            setError("Please select a valid file.");
        }
    };

    // Handle file upload
    const handleUpload = () => {
        if (!file) {
            setError("Please select a file to upload.");
            return;
        }

     
        setSuccess("File uploaded successfully!");
        setError("");
        
    };

    // Handle user deletion
    const handleDelete = (email) => {
        setUsers(users.filter((user) => user.email !== email));
        setSuccess("User deleted successfully!");
    };

    return (
        <div className="container">
            <h2>User Management</h2>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            <div className="uploadSection">
                <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileChange}
                />
                <button onClick={handleUpload}>Upload</button>
            </div>

            <button className="exportButton">Export Users</button>

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
                                <td>{user.dob}</td>
                                <td>{user.gender}</td>
                                <td>{user.email}</td>
                                <td>{user.mobile}</td>
                                <td>{user.city}</td>
                                <td>{user.state}</td>
                                <td>
                                    <button onClick={() => handleDelete(user.email)}>
                                        Delete
                                    </button>
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