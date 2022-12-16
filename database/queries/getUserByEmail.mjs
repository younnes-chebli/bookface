import User from "../../model/User.mjs";

const getUserByEmail = async(email) => {
    try {
        const user =  await User.findOne({email: email});
        return user;    
    } catch (error) {
        throw error;
    }
};

export default getUserByEmail;