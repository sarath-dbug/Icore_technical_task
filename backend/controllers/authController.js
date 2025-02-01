const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AuthUser = require("../models/AuthUser");
const { validateEmail, validatePassword } = require("../utils/authValidation");



// Register a new user
const register = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate and transform the data
        validateEmail(email);
        validatePassword(password);

        const existingUser = await AuthUser.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new AuthUser({ email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(400).json({ message: err.message || "Server error" });
    }
};


// Login a user
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await AuthUser.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });

        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { register, login };