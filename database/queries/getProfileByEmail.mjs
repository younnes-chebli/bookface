import Profile from "../schemas/Profile.mjs"

const getProfileByOwner = async(ownerId) => {
    try {
        const profile =  await Profile.findOne({owner: ownerId});
        return profile;    
    } catch (error) {
        throw error;
    }
};

export default getProfileByOwner;