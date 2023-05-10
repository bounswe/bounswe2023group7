import mongoose from "mongoose";

const platformSchema = new mongoose.Schema({
    id: {
        type: String, 
        required: true
    },
    platformName: {
        type: String, 
        required: true
    },
    username: {
        type: String,
        required: true
    }
});

const Platform = mongoose.model('Platform', platformSchema);

const getUsersPlatforms = async (username) => {
    return await Platform.find( { username: username });
}

const addMyPlatform = async (
    id,
    platformName,
    username
) => {
    const item = {
        id: id,
        platformName: platformName,
        username: username
    }
    const platform = new Platform(item);
    platform.save()
}

export default {
    Platform,
    getUsersPlatforms,
    addMyPlatform
}
