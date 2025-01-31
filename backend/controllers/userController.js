const User = require("../models/User");
const XLSX = require("xlsx");

// Fetch all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        const { email } = req.params;

        // Find and delete the user by email
        const deletedUser = await User.findOneAndDelete({ email });

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to delete user" });
    }
};

// Update user
const updateUser = async (req, res) => {
    try {
        const { email } = req.params;
        const updatedData = req.body;

        const result = await User.updateOne(
            { email: email },
            { $set: updatedData }
        );
        
        res.json({ message: "User updated successfully", user: updatedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to update user" });
    }
};



// Upload users from Excel
const uploadUsers = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert worksheet to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        console.log("jsonData:", jsonData);

        if (jsonData.length === 0) {
            return res.status(400).json({ message: "No data found in the Excel file" });
        }

        // Transform jsonData to match the User schema
        const transformedData = jsonData.map((user) => {
            // Validate required fields
            if (
                !user["First Name"] ||
                !user["Lats Name"] ||
                !user.Role ||
                !user.DOB ||
                !user.Gender ||
                !user.Email ||
                !user.Mobile ||
                !user.City ||
                !user.State
            ) {
                throw new Error("Missing required fields in the Excel file");
            }

            // Parse the DOB field
            const dobParts = user.DOB.split("/"); // Split the date string by "/"
            if (dobParts.length !== 3) {
                throw new Error(`Invalid date format for DOB: ${user.DOB}`);
            }

            // Create a valid Date object (format: YYYY-MM-DD)
            const dob = new Date(`${dobParts[2]}-${dobParts[1]}-${dobParts[0]}`);

            // Check if the date is valid
            if (isNaN(dob.getTime())) {
                throw new Error(`Invalid date for DOB: ${user.DOB}`);
            }

            return {
                first_name: user["First Name"],
                last_name: user["Lats Name"], // Fix typo in the Excel file if possible
                role: user.Role,
                dob: dob, // Use the parsed Date object
                gender: user.Gender,
                email: user.Email,
                mobile: user.Mobile.toString(), // Ensure mobile is a string
                city: user.City,
                state: user.State,
            };
        });

        console.log("Transformed Data:", transformedData);

        // Save users to the database
        await User.insertMany(transformedData);

        res.status(201).json({ message: "Users imported successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message || "Failed to import users" });
    }
};

// Export users to Excel
const exportUsers = async (req, res) => {
    try {
        // Fetch users from the database
        const users = await User.find();

        // Custom transformation function to exclude _id and format dob
        const transformUser = (user) => {
            const { _id, __v, ...userData } = user.toObject({ virtuals: false, versionKey: false });
            return {
                ...userData,
                dob: user.dob.toISOString().split("T")[0], // Format date as YYYY-MM-DD
            };
        };

        // Transform users using the custom function
        const transformedUsers = users.map(transformUser);

        console.log("Transformed Users:", transformedUsers);

        // Create a worksheet from the transformed data
        const worksheet = XLSX.utils.json_to_sheet(transformedUsers);

        // Create a workbook and add the worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

        // Generate a buffer from the workbook
        const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

        // Set headers for the response
        res.setHeader("Content-Disposition", "attachment; filename=users.xlsx");
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

        // Send the buffer as the response
        res.send(buffer);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to export users" });
    }
};

module.exports = { getUsers, uploadUsers, exportUsers, deleteUser, updateUser };