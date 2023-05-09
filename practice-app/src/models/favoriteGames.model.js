import mongoose from "mongoose";
const { Schema } = mongoose;

const favoriteGamesModel = new Schema ( {
    email: { //user has several location data, so it is not unique
        type: String,
        required: true,
        unique: false
    },
    game_name : {
        type: String,
        required: true
    },
    game_rating : {
        type: String,
        required: true
    },
    sale_price : {
        type: String,
        required: true
    },
    retail_price : {
        type: String,
        required: true
    },
    img_url : {
        type: String,
        required: true
    }
    },
    { versionKey: false }
);

const FavoriteGames = mongoose.model("favoritegames", favoriteGamesModel);


export default FavoriteGames;