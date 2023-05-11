import mongoose from "mongoose";
const { Schema } = mongoose;

const Genre = new Schema ( {
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

const Genres = mongoose.model("genres", Genre);


export default Genres;