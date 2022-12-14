import User from "../../model/User.mjs";

const getUserByEmail = async(email) => {
    try {
        const user =  await User.findOne({email: email}).exec();
        return user;    
    } catch (error) {
        console.log(error.message);
        throw error;
    }
};

export default getUserByEmail;