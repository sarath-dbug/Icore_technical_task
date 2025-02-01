
const uploadUsersValidation = (user) => {
    // Check for missing required fields
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

    // Validate date format 
    const dobParts = user.DOB.split("/");
    if (dobParts.length !== 3) {
        throw new Error(`Invalid date format for DOB: ${user.DOB}`);
    }

    // Validate date
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
};

module.exports = { uploadUsersValidation };