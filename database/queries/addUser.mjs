import User from "../schemas/User.mjs";

const addUser = async(email, username, password) => {
    const user = new User({email: email, username: username, password: password});
    try {
        await user.save();
        return user;
    } catch(err) {
        throw err;
    }    
};

export default addUser;