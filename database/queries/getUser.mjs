import User from "../../schemas/User.mjs";

const getUserByEmail = (email) => {
    return User.findOne(email = email);
};

export default getUserByEmail;