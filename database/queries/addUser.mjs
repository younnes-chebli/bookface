import User from "../../model/User.mjs";

const addUser = async(email, username, password) => {
    const user = new User({email: email, username: username, password: password, profile: {}});
    try {
        await user.save();
        return user;
    } catch(err) {
        console.log(err.message);
        throw err;
    }    
};

export default addUser;