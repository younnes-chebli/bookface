import User from "../schemas/User.mjs"

const getUserByEmail = async(email) => {
    const user =  await User.findOne({email: email});
    return user;
};

export default getUserByEmail;