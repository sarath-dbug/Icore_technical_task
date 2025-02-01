
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error("Invalid email format");
    }
};

const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&,])[A-Za-z\d@$!%*?&,]{8,}$/;
    if (!passwordRegex.test(password)) {
        throw new Error(
            "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one symbol."
        );
    }
};

module.exports = { validateEmail, validatePassword };
