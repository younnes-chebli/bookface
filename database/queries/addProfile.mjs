import Profile from "../schemas/Profile.mjs";

const addProfile = async(ownerId, bio) => {
    const profile = new Profile({owner: ownerId, bio: bio});
    try {
        await profile.save();
        return profile;
    } catch(err) {
        throw err;
    }    
};

export default addProfile;