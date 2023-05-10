import mongoose from "mongoose";
const { Schema } = mongoose;

const genreModel = new Schema ( {
    email: { 
        type: String,
        required: true,
    },
    genre : {
        type: String,
        required: true,
        unique: true

    },
    game_count : {
        type: String,
        required: true
    },
    },
    { versionKey: false }
);

const Genres = mongoose.model("favoritegames", genreModel);


export default Genres;