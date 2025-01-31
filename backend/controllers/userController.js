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

// Upload users from Excel
const uploadUsers = async (req, res) => {
    try {
        const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Save users to the database
        await User.insertMany(jsonData);

        res.status(201).json({ message: "Users imported successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to import users" });
    }
};

// Export users to Excel
const exportUsers = async (req, res) => {
    try {
        const users = await User.find();

        const worksheet = XLSX.utils.json_to_sheet(users);
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

module.exports = { getUsers, uploadUsers, exportUsers };