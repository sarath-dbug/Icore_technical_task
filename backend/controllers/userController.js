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
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        if (jsonData.length === 0) {
            return res.status(400).json({ message: "No data found in the Excel file" });
        }

        const transformedData = jsonData.map((user) => {
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

            const dobParts = user.DOB.split("/");
            if (dobParts.length !== 3) {
                throw new Error(`Invalid date format for DOB: ${user.DOB}`);
            }

            const dob = new Date(`${dobParts[2]}-${dobParts[1]}-${dobParts[0]}`);

            if (isNaN(dob.getTime())) {
                throw new Error(`Invalid date for DOB: ${user.DOB}`);
            }

            return {
                first_name: user["First Name"],
                last_name: user["Lats Name"],
                role: user.Role,
                dob: dob,
                gender: user.Gender,
                email: user.Email,
                mobile: user.Mobile.toString(),
                city: user.City,
                state: user.State,
            };
        });

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
        const users = await User.find();

        const transformUser = (user) => {
            const { _id, __v, ...userData } = user.toObject({ virtuals: false, versionKey: false });
            return {
                ...userData,
                dob: user.dob.toISOString().split("T")[0],
            };
        };

        const transformedUsers = users.map(transformUser);

        const headers = [
            { header: "First Name", key: "first_name", width: 15 },
            { header: "Last Name", key: "last_name", width: 15 },
            { header: "Role", key: "role", width: 15 },
            { header: "DOB", key: "dob", width: 15 },
            { header: "Gender", key: "gender", width: 10 },
            { header: "Email", key: "email", width: 25 },
            { header: "Mobile", key: "mobile", width: 15 },
            { header: "City", key: "city", width: 15 },
            { header: "State", key: "state", width: 15 },
        ];

        const worksheet = XLSX.utils.json_to_sheet(transformedUsers, { header: headers.map(h => h.key) });

        XLSX.utils.sheet_add_aoa(worksheet, [headers.map(h => h.header)], { origin: "A1" });

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
        const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

        res.setHeader("Content-Disposition", "attachment; filename=users.xlsx");
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.send(buffer);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to export users" });
    }
};

module.exports = { getUsers, uploadUsers, exportUsers, deleteUser, updateUser };