import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  appId: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    reqired: true
  },
  header_image: {
    type: String
  },
  email: {
    type: String,
    reqired: true
  }
});
favoriteSchema.index({ appId:1, email:1}, {unique: true});

export const Favorite = mongoose.model('Favorite', favoriteSchema);

export async function getFavoritesByEmail(email) {
  return await Favorite.find( {email: email });
}

export async function addToFavorites(model) {
  return await Favorite.create(model);
}

export async function removeFromFavorites(appId, email) {
  return await Favorite.deleteOne({ appId: appId, email: email });
}