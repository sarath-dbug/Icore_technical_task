# **User Management System**

This is a full-stack **User Management System** built with:
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

The application allows users to:
- Register and log in using JWT-based authentication.
- Import user data from an Excel file.
- Export user data to an Excel file.
- Perform CRUD operations on users.

---

## **Table of Contents**
1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Setup and Installation](#setup-and-installation)
4. [Authentication](#authentication)
5. [Import and Export Functionality](#import-and-export-functionality)
6. [API Endpoints](#api-endpoints)
7. [Folder Structure](#folder-structure)
8. [Contributing](#contributing)
9. [License](#license)

---

## **Features**
- **User Authentication**:
  - Register a new user with email and password.
  - Log in with email and password to receive a JWT token.
  - Protected routes for authenticated users only.

- **User Management**:
  - Import user data from an Excel file.
  - Export user data to an Excel file.
  - View and delete users.

- **Validation**:
  - Validate email and password during registration.
  - Validate Excel file data during import.

---

## **Technologies Used**
- **Frontend**:
  - React.js
  - Axios (for API requests)
  - React Router (for routing)
  - XLSX (for Excel file processing)

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (with Mongoose for database interaction)
  - JWT (for authentication)
  - Multer (for file uploads)
  - XLSX (for Excel file processing)

- **Database**:
  - MongoDB (MongoDB Atlas)

---

## **Setup and Installation**

### **Prerequisites**
- Node.js and npm installed on your machine.
- MongoDB installed locally or a MongoDB Atlas connection string.

### **Steps**
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/sarath-dbug/Icore_technical_task.git
   cd Icore_technical_task
   ```

2. **Set Up the Backend**:
   - Navigate to the `backend` folder:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the `backend` folder and add the following environment variables:
     ```env
     MONGO_URI=mongodb://localhost:27017/user-management
     JWT_SECRET=your-secret-key
     PORT=5000
     ```
   - Start the backend server:
     ```bash
     npm start
     ```

3. **Set Up the Frontend**:
   - Navigate to the `frontend` folder:
     ```bash
     cd ../frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the frontend development server:
     ```bash
     npm start
     ```

4. **Access the Application**:
   - Open your browser and go to `http://localhost:3000`.

---

## **Authentication**
- **Register**:
  - Endpoint: `POST /api/auth/register`
  - Request Body:
    ```json
    {
      "email": "test@example.com",
      "password": "Password123!"
    }
    ```
  - Response:
    ```json
    {
      "message": "User registered successfully"
    }
    ```

- **Login**:
  - Endpoint: `POST /api/auth/login`
  - Request Body:
    ```json
    {
      "email": "test@example.com",
      "password": "Password123!"
    }
    ```
  - Response:
    ```json
    {
      "token": "your-jwt-token"
    }
    ```

---

## **Import and Export Functionality**
- **Import Users**:
  - Upload an Excel file (`.xlsx` or `.xls`) with the following fields:
    - First Name
    - Last Name
    - Role
    - DOB (in `DD/MM/YYYY` format)
    - Gender
    - Email
    - Mobile
    - City
    - State
  - Endpoint: `POST /api/uploadusers`
  - Response:
    ```json
    {
      "message": "Users imported successfully"
    }
    ```

- **Export Users**:
  - Download an Excel file containing all users.
  - Endpoint: `GET /api/export-users`
  - Response: An Excel file (`users.xlsx`).

---

## **API Endpoints**
| Method | Endpoint               | Description                          |
|--------|------------------------|--------------------------------------|
| POST   | `/api/auth/register`   | Register a new user                  |
| POST   | `/api/auth/login`      | Log in and receive a JWT token       |
| POST   | `/api/uploadusers`     | Import users from an Excel file      |
| GET    | `/api/export-users`    | Export users to an Excel file        |
| GET    | `/api/users`           | Fetch all users                      |
| PUT    | `/api/users/:email`    | Update a user by email               |
| DELETE | `/api/users/:email`    | Delete a user by email               |

---

## **Folder Structure**
```
user-management-system/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   ├── server.js
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── README.md
├── .gitignore
└── README.md
```

---

## **Contributing**
Contributions are welcome! If you'd like to contribute, please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push to the branch.
4. Submit a pull request.

---

## **License**
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## **Acknowledgments**
- Thanks to the developers of React, Node.js, Express.js, and MongoDB for creating such powerful tools.
- Special thanks to the open-source community for providing helpful libraries and resources.

---
