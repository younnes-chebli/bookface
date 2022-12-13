import User from "../schemas/User.mjs";

const addUser = async(email, password) => {
    const user = new User({email: email, password: password});
    try {
        await user.save();
        return user;
    } catch(err) {
        throw err;
    }    
};

export default addUser;