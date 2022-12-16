import User from "../../model/User.mjs";

const getUserByUsername = async(username) => {
    try {
        const user =  await User.findOne({username: username}).exec();
        return user;    
    } catch (error) {
        console.log(error.message);
        throw error;
    }
};

export default getUserByUsername;