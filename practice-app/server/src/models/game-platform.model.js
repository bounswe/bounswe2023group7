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

export const Platform = mongoose.model('Platform', platformSchema);

export async function getUsersPlatforms(username) {
    return await Platform.find( {username: username });
  }

export const addMyPlatform = async (
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


